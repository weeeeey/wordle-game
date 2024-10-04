import { MainHeader, MainFooter } from './_components';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-mainBackground h-full ">
            <section className="flex flex-col justify-center items-center gap-y-10 h-full max-w-md mx-auto">
                <MainHeader />
                {children}
                <MainFooter />
            </section>
        </div>
    );
}
