import { useModalStore } from '@/store/modal-store';
import { DrawerDialogContiner } from './modal-container';

/**
 *
 * 유저에게 게임 방법을 보여주는 모달로써 첫 방문한 유저 또는 게임 페이지 헤더에 위치한 아이콘을 클릭시 화면에 나타납니다
 */

export default function HowModal() {
    const { isOpen, modalType, onClose } = useModalStore();
    const isModalOpen = isOpen && modalType === 'how';

    return (
        <DrawerDialogContiner isModalOpen={isModalOpen} onClose={onClose}>
            <section className="my-10 space-y-10 min-w-[360px]">
                <header className="text-center">
                    <h3 className="font-bold text-2xl">How To Play</h3>
                    <p className="text-gray-500">
                        6번의 시도로 Wordle를 맞춰보세요.
                    </p>
                </header>
                <article className="flex items-center flex-col space-y-4 px-10">
                    <ul className="text-sm space-y-1 list-disc  w-full px-4">
                        <li>
                            5글자로 이루어진 유효한 단어를 통해 추측해보세요.
                        </li>
                        <li>
                            각각의 타일의 색깔의 변화가 얼마나 정답에
                            가까워졌는지 보여줄거예요.
                        </li>
                    </ul>
                    <div className=" w-full">
                        <div className="text-lg font-bold mb-2">예시</div>
                        <ul className="space-y-4">
                            <li className="uppercase space-x-1">
                                {Array.from('wordy').map((c, idx) => (
                                    <div
                                        key={idx}
                                        className={`border-black border-2 font-bold size-8  inline-block text-center ${
                                            idx === 0 && 'bg-correct text-white'
                                        }`}
                                    >
                                        {c}
                                    </div>
                                ))}
                                <div className="mt-1">
                                    W 는 정확한 자리에 위치한 알파벳이에요.
                                </div>
                            </li>
                            <li className="uppercase space-x-1">
                                {Array.from('light').map((c, idx) => (
                                    <div
                                        key={idx}
                                        className={`border-black border-2 font-bold size-8  inline-block text-center ${
                                            idx === 1 &&
                                            'bg-misplaced text-white'
                                        }`}
                                    >
                                        {c}
                                    </div>
                                ))}
                                <div className="mt-1">
                                    I는 잘못된 위치에 있는 알파벳이에요.
                                </div>
                            </li>
                            <li className="uppercase space-x-1">
                                {Array.from('rogue').map((c, idx) => (
                                    <div
                                        key={idx}
                                        className={`border-black border-2 font-bold size-8  inline-block text-center ${
                                            idx === 3 && 'bg-absent text-white'
                                        }`}
                                    >
                                        {c}
                                    </div>
                                ))}
                                <div className="mt-1">
                                    U 는 어떠한 곳에도 있지 않은 알파벳이에요.
                                </div>
                            </li>
                        </ul>
                    </div>
                </article>
            </section>
        </DrawerDialogContiner>
    );
}
