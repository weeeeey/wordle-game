import { ENKEYBOARDS, KeyboardWithStatusType } from '@/constants/keyboard-map';
import { useState, useCallback } from 'react';

/**
 *
 * @returns 게임 페이지 하단의 키보드 뷰를 관리하기 위한 state입니다.
 * 새로운 단어를 체크할 시 updateKeyboardState가 실행되어 keyboardState가 업데이트 됩니다.
 * 이때 키보드의 상태는 correct, misplace,absent,pending 순으로 우선순위가 높아 update시 해당 우선순위를 기준으로 업데이트 유무가 정해집니다.
 */

const useKeysboardState = () => {
    const [keysboardState, setKeysboardState] = useState<
        KeyboardWithStatusType[]
    >(ENKEYBOARDS.map((en): KeyboardWithStatusType => [en, 'pending']));

    const updateKeysboardState = useCallback(
        (
            inputValues: string[],
            correct: number[],
            misplaced: number[],
            absent: number[]
        ) => {
            setKeysboardState((prevState) =>
                prevState.map(([key, currentStatus]) => {
                    if (correct.some((idx) => inputValues[idx] === key)) {
                        return [key, 'correct'];
                    }
                    if (misplaced.some((idx) => inputValues[idx] === key)) {
                        return currentStatus !== 'correct'
                            ? [key, 'misplace']
                            : [key, currentStatus];
                    }
                    if (absent.some((idx) => inputValues[idx] === key)) {
                        return !['correct', 'misplace'].includes(currentStatus)
                            ? [key, 'absent']
                            : [key, currentStatus];
                    }
                    return [key, currentStatus];
                })
            );
        },
        []
    );

    return { keysboardState, updateKeysboardState };
};

export default useKeysboardState;
