import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import ModalProvider from '@/provider/modal-provider';
import { Toaster } from '@/components/ui/toaster';

const pretendard = localFont({
    src: './fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
    title: 'Wordle',
    description: '최대 6번, 5글자로 이루어진 영어 단어를 추측하는 게임',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={`${pretendard.variable}`}>
            <body
                className={`${pretendard.className} antialiased min-w-[340px] `}
            >
                <ModalProvider />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
