import { useModalStore } from '@/store/modal-store';
import { DrawerDialogContiner } from './modal-container';
import { useWordNavigation } from '@/hooks';
import { Button } from '../ui/button';
import { getFormatTime, getPlayerInfo } from '@/actions';
import { useEffect, useState } from 'react';
import { PlayerInfoType } from '@/actions/set-player-info';

/**
 *
 * 게임 종료 시 유저가 성공했다면 보여지는 모달 컴포넌트로 새로운 게임을 생성하는 버튼과
 * 유저가 지금까지 플레이한 정보가 화면에 보여집니다.
 */
export default function SuccessModal() {
    const [playerInfo, setPlayerInfo] = useState<PlayerInfoType | null>();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPlayerInfo(() => getPlayerInfo());
        }
    }, []);

    const { isOpen, modalType, onClose } = useModalStore();
    const isModalOpen = isOpen && modalType === 'success';

    const { handleClick: wordNavigation } = useWordNavigation();
    const handleClick = async () => {
        try {
            await wordNavigation(true);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DrawerDialogContiner isModalOpen={isModalOpen} onClose={onClose}>
            <section className="my-10 space-y-10">
                <header className="text-center">
                    <h3 className="font-bold text-2xl">Success!</h3>
                    <p className="text-gray-500">
                        성공까지
                        <span className="font-semibold text-black mx-2">
                            {playerInfo && getFormatTime(playerInfo.playTime)}
                        </span>
                        걸렸습니다.
                    </p>
                </header>
                <article className="flex flex-col justify-center items-center gap-y-10 ">
                    {playerInfo && (
                        <ul>
                            <li className="space-x-2">
                                <span className="text-gray-500">
                                    현재까지 Wordle을 승리한 횟수:
                                </span>
                                <span className="font-semibold">
                                    {playerInfo.winCount}회
                                </span>
                            </li>
                            <li className="space-x-2">
                                <span className="text-gray-500">
                                    현재까지의 Wordle 승률:
                                </span>
                                <span className="font-semibold">
                                    {(
                                        (playerInfo.winCount /
                                            playerInfo.totalPlayCount) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </span>
                            </li>
                            {Object.entries(playerInfo.guessWordle).map(
                                ([key, value]) => (
                                    <li key={key} className="space-x-2 ">
                                        <span className="text-gray-500">
                                            {key}번 만에 성공한 횟수:
                                        </span>
                                        <span className="font-semibold">
                                            {value}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    )}

                    <Button
                        onClick={handleClick}
                        className="rounded-full py-6 w-40"
                    >
                        새로 시작하기
                    </Button>
                </article>
            </section>
        </DrawerDialogContiner>
    );
}
