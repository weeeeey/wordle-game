import { useModalStore } from '@/store/modal-store';
import { DrawerDialogContiner } from './modal-container';
import { useWordNavigation } from '@/hooks';
import { Button } from '../ui/button';
import { getFormatTime } from '@/actions';
import { usePlayerInfoStore } from '@/store/playerinfo-store';

export default function PracticeModal() {
    const { isOpen, modalType, onClose } = useModalStore();
    const { playerInfo } = usePlayerInfoStore();
    const isModalOpen = isOpen && modalType === 'practice';

    const { playNewGame } = useWordNavigation();

    const handleClick = async () => {
        try {
            await playNewGame();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    if (!isModalOpen && !playerInfo.playTime) return;

    return (
        <DrawerDialogContiner isModalOpen={isModalOpen} onClose={onClose}>
            <section className="my-10 space-y-10">
                <header className="text-center">
                    <h3 className="font-bold text-2xl">Success!</h3>
                    <p className="text-gray-500">
                        총
                        <span className="font-semibold text-black mx-2">
                            {getFormatTime(playerInfo.playTime)}
                        </span>
                        걸렸습니다.
                    </p>
                </header>
                <article className="flex flex-col justify-center items-center gap-y-10 ">
                    <Button
                        onClick={handleClick}
                        className="rounded-full py-6 w-40"
                    >
                        Wordle 시작하기
                    </Button>
                </article>
            </section>
        </DrawerDialogContiner>
    );
}
