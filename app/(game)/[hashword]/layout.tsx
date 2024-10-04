import GameHeader from './_components/game-header';

export default function GameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="h-full flex flex-col">
            <GameHeader />
            <main className="flex-1 mt-16 max-w-md sm:max-w-xl w-full  mx-auto">
                {children}
            </main>
        </section>
    );
}
