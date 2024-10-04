'use client';
import { useModalStore } from '@/store/modal-store';
import { CircleHelp, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
/**
 *
 * 게임 페이지의 헤더로써 게임 방법을 알려주는 how modal 또는 tip이 적힌 페이지로 이동 가능한 아이콘을 보여줍니다.
 * 또한 유저의 직관적인 동작을 위해 tooltip을 구현하였습니다.
 */
export default function GameHeader() {
    const { onOpen } = useModalStore();
    return (
        <header className="h-16 flex justify-between items-center border-b fixed top-0 inset-x-0 bg-white px-8 ">
            <Link href="/">
                <div className="size-10 relative">
                    <Image
                        fill
                        alt="logo"
                        src="https://www.nytimes.com/games-assets/v2/assets/wordle/page-icons/wordle-icon.svg"
                    />
                </div>
            </Link>
            <ul className="flex items-center gap-x-2">
                <li className="relative group">
                    <button onClick={() => onOpen('how')}>
                        <CircleHelp className="size-6" />
                    </button>
                    <div className="hidden group-hover:block text-sm absolute top-full left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded-md">
                        How
                    </div>
                </li>

                <li className="mb-[5px] relative group">
                    <a
                        href="https://www.nytimes.com/2022/02/10/crosswords/best-wordle-tips.html"
                        target="_blank"
                    >
                        <Lightbulb className="size-6" />
                    </a>

                    <div className="absolute hidden group-hover:block top-[calc(100%+7px)] text-sm left-1/2 -translate-x-[calc(50%+10px)] bg-black text-white px-2 py-1 rounded-md whitespace-nowrap">
                        Tips and Tricks
                    </div>
                </li>
            </ul>
        </header>
    );
}
