'use client';

import { Button } from '@/components/ui/button';
import { useInitPlayerInfo, useWordNavigation } from '@/hooks';

/**
 * 유저는 시작하기,워들 생성하기,이어하기 버튼이 화면에 포츌됩니다.
 * 시작하기: 정답이 WORLD인 게임이 생성됩니다.
 * 워들 생성하기: 랜덤 단어가 정답인 게임이 생성됩니다.
 * 이어하기: 로컬 저장소의 정보를 통해 이전 게임이 존재하는지 판단하는 isExist 값에 따라 화면에 나타나며 이전 해쉬 된 값을 params로 게임이 진행됩니다.
 *
 * 또한 playerInfo가 없다면 해당 페이지에서 초깃값을 로컬 저장소에 저장해줍니다
 */

export default function MainPage() {
    const { isExist, handleClick, handleContinue } = useWordNavigation();
    useInitPlayerInfo();

    return (
        <main className="flex flex-col md:flex-row items-center gap-1">
            <Button
                onClick={() => handleClick({ getRandomWord: false })}
                className="rounded-full py-6 w-40"
            >
                연습게임
            </Button>
            <Button
                variant="outline"
                onClick={() => handleClick({ getRandomWord: true })}
                className="rounded-full py-6 w-40 bg-transparent border-black border text-black "
            >
                워들 생성하기
            </Button>
            {isExist && (
                <Button
                    onClick={handleContinue}
                    className="rounded-full py-6 w-40"
                >
                    이어서 하기
                </Button>
            )}
        </main>
    );
}
