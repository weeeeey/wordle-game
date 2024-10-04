import Image from 'next/image';
import Link from 'next/link';

export default function MainHeader() {
    return (
        <header className="text-4xl flex flex-col items-center gap-y-3 ">
            <Link href="/">
                <div className="size-20 relative ">
                    <Image
                        fill
                        alt="logo"
                        src="https://www.nytimes.com/games-assets/v2/assets/wordle/page-icons/wordle-icon.svg"
                    />
                </div>
            </Link>
            <h1 className="font-semibold text-4xl">Wordle</h1>
            <p className="font-light text-center text-3xl">
                6번의 기회안에 5글자로 이루어진 단어를 맞춰보세요
            </p>
        </header>
    );
}
