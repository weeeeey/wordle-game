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
export default function PracticeModal() {
    const [playerInfo, setPlayerInfo] = useState<PlayerInfoType | null>();

    const { isOpen, modalType, onClose } = useModalStore();
    const isModalOpen = isOpen && modalType === 'success';

    const { playNewGame } = useWordNavigation();

    useEffect(() => {
        if (typeof window !== 'undefined' && isModalOpen) {
            setPlayerInfo(getPlayerInfo);
        }
    }, [isModalOpen]);
    const handleClick = async () => {
        try {
            await playNewGame();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DrawerDialogContiner isModalOpen={isModalOpen} onClose={onClose}>
            <section className="my-10 space-y-10">
                <header className="text-center">
                    <h3 className="font-bold text-2xl">연습 결과</h3>
                    <div>
                        연습게임의 정답은{' '}
                        <span className="font-extrabold">WORLD</span> 였습니다.
                    </div>
                    <p className="text-gray-500">
                        총
                        <span className="font-semibold text-black mx-2">
                            {playerInfo && getFormatTime(playerInfo.playTime)}
                        </span>
                        걸렸습니다.
                    </p>
                </header>
                <article className="flex flex-col justify-center items-center gap-y-10 ">
                    <div>몇 번만에 성공했는지</div>
                    <Button
                        onClick={handleClick}
                        className="rounded-full py-6 w-40"
                    >
                        Wordle 게임 시작하기
                    </Button>
                </article>
            </section>
        </DrawerDialogContiner>
    );
}
