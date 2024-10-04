import { useCallback, useEffect, useMemo, useState } from 'react';
import { useModalStore } from '@/store/modal-store';
import useToast from './use-toast';
import useKeysboardState from './use-keyboard-state';

import {
    checkVisited,
    checkWord,
    decryptWord,
    getPlayerInfo,
    setPlayerInfo,
} from '@/actions';
import { checkWordMatch } from '@/lib/utils';
import { keyboardCode } from '@/constants/keyboard-map';

export type CheckedWordsType = {
    correct: number[];
    misplace: number[];
    absent: number[];
};

type WordleGameState = {
    hashword: string;
    status: 'pending' | 'success' | 'fail';
    completedRow: number;
    currentInputIdx: number;
    errorRow: number;
    inputValues: string[];
    checkedWords: CheckedWordsType;
};

const initState: WordleGameState = {
    hashword: '',
    status: 'pending',
    completedRow: -1,
    currentInputIdx: 0,
    errorRow: -1,
    inputValues: Array.from({ length: 30 }, () => ''),
    checkedWords: { correct: [], misplace: [], absent: [] },
};

/**
 *
 * @param hashword - 해당 값을 복호화 하여 useMemo를 통해 answerWord에 담습니다. 이를 통해 불필요한 계산을 최소화합니다.
 * @returns {
 *  gameState - 게임 페이지 상단의 wordle 게임을 진행하기 위한 상태들이 담겨있습니다. 상태가 업데이트 될 시 로컬 저장소에 저장되어 이후 재접속시에도 게임 상태가 유지됩니다.
 *  handleChange - 게임 진행 시 키보드 입력 또는 하단의 키보드 컴포넌트를 클릭시 gameState.inputValue를 업데이트 해줍니다.
 *  handleDelete - 현재 진행 중인 row에 입력 된 값을 지우기 위한 함수입니다.
 *  handleEnter - 현재 행이 모두 채워지고 올바른 단어인지를 체크한 후 정답 word와 비교하여 gameState를 업데이트 합니다.
 * }
 */

const useWordleState = (hashword: string) => {
    const { toast } = useToast();
    const { onOpen } = useModalStore();
    const { keysboardState, updateKeysboardState } = useKeysboardState();

    const [gameState, setGameState] = useState<WordleGameState>(initState);

    const answerWord = useMemo(() => decryptWord(hashword), [hashword]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('wordle');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                if (parsedState.hashword === hashword) {
                    setGameState(parsedState);
                } else {
                    setGameState({ ...initState, hashword });
                }
            } else {
                setGameState({ ...initState, hashword });
            }
        }
    }, [hashword]);

    const updateGameState = useCallback(
        (newState: Partial<WordleGameState>) => {
            setGameState((prevState) => {
                const updatedState = { ...prevState, ...newState };
                localStorage.setItem('wordle', JSON.stringify(updatedState));
                return updatedState;
            });
        },
        []
    );

    const handleChange = useCallback(
        (value: string) => {
            if (gameState.status === 'success') return;
            const curRow = Math.floor(gameState.currentInputIdx / 5);
            if (curRow >= 6 || curRow - gameState.completedRow >= 2) return;

            updateGameState({
                inputValues: gameState.inputValues.map((v, i) =>
                    i === gameState.currentInputIdx ? value : v
                ),
                currentInputIdx: gameState.currentInputIdx + 1,
            });
        },
        [gameState, updateGameState]
    );

    const handleDelete = useCallback(() => {
        const targetIdx = gameState.currentInputIdx - 1;
        const targetRow = Math.floor(targetIdx / 5);
        if (targetRow === gameState.completedRow) return;

        updateGameState({
            inputValues: gameState.inputValues.map((v, i) =>
                i === targetIdx ? '' : v
            ),
            currentInputIdx: gameState.currentInputIdx - 1,
        });
    }, [gameState, updateGameState]);

    const handleEnter = useCallback(async () => {
        const willCheckedRow = Math.floor(gameState.currentInputIdx / 5) - 1;
        const isFull =
            gameState.currentInputIdx !== 0 &&
            gameState.currentInputIdx % 5 === 0;

        try {
            if (gameState.status !== 'pending')
                throw new Error('새로운 게임을 시작해주세요.');
            if (!isFull) throw new Error('남은 칸 입력 해주세요.');
            if (willCheckedRow === gameState.completedRow)
                throw new Error('단어를 입력해주세요.');

            const willCheckWord = gameState.inputValues
                .slice(willCheckedRow * 5, willCheckedRow * 5 + 5)
                .join('');

            await checkWord(willCheckWord);
            const { absent, correct, misplaced } = checkWordMatch(
                answerWord,
                willCheckWord,
                willCheckedRow
            );

            updateGameState({
                completedRow: willCheckedRow,
                checkedWords: {
                    correct: [...gameState.checkedWords.correct, ...correct],
                    misplace: [
                        ...gameState.checkedWords.misplace,
                        ...misplaced,
                    ],
                    absent: [...gameState.checkedWords.absent, ...absent],
                },
            });

            updateKeysboardState(
                gameState.inputValues,
                correct,
                misplaced,
                absent
            );

            if (correct.length === 5) {
                setTimeout(() => updateGameState({ status: 'success' }), 1750);
            } else if (willCheckedRow === 5) {
                setTimeout(() => updateGameState({ status: 'fail' }), 1750);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: '잘못된 입력!',
                    description: error.message,
                    variant: 'destructive',
                    duration: 1500,
                });
                updateGameState({
                    errorRow: isFull ? willCheckedRow : willCheckedRow + 1,
                });
                setTimeout(() => updateGameState({ errorRow: -1 }), 1000);
            }
        }
    }, [gameState, answerWord, updateGameState, updateKeysboardState, toast]);

    useEffect(() => {
        const handleKeyboardEvent = (e: KeyboardEvent) => {
            const isCombination =
                e.metaKey || e.ctrlKey || e.altKey || e.shiftKey;
            const { code } = e;
            if (!isCombination && Object.keys(keyboardCode).includes(code)) {
                handleChange(keyboardCode[code]);
            } else if (code === 'Backspace') handleDelete();
            else if (code === 'Enter') handleEnter();
        };

        window.addEventListener('keydown', handleKeyboardEvent);
        return () => window.removeEventListener('keydown', handleKeyboardEvent);
    }, [handleChange, handleDelete, handleEnter]);

    useEffect(() => {
        if (gameState.status === 'success') {
            onOpen('success');
            const playerInfo = getPlayerInfo();
            if (playerInfo && playerInfo.lastWinWord !== answerWord) {
                setPlayerInfo('winCount');
                setPlayerInfo('lastWinWord', answerWord);
                setPlayerInfo('guessWordle', gameState.completedRow + 1);
            }
        }
        if (gameState.status === 'fail') onOpen('fail', answerWord);
    }, [gameState, onOpen, answerWord]);

    useEffect(() => {
        const isVisited = checkVisited();
        if (!isVisited) onOpen('how');
    }, [onOpen]);
    return {
        gameState,
        handleChange,
        handleDelete,
        handleEnter,
        keysboardState,
    };
};

export default useWordleState;
