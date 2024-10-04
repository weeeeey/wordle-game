import { setPlayerInfo } from '@/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 *
 * @returns {
 *  isExist: 이전에 진행했던 게임이 있다면 hashWord를 담는 state입니다. 로컬의 게임 상태가 pending일 경우에만 정보가 담겨집니다.
 *  handleCountinue: 이전 게임을 다시 진행하기 위해 /${isExist} 로 이동되어 이전 게임 상태를 유지합니다.
 *  handleClick: 새로운 게임을 위해 새로운 정답을 서버로부터 받아옵니다. 이때, 로컬에 저장된 플레이어 정보 중 전체 게임 횟수가 1이 증가되며 플레이 시간은 0으로 초기화 됩니다.
 * }
 */

const useWordNavigation = () => {
    const router = useRouter();
    const [isExist, setIsExist] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const state = window.localStorage.getItem('wordle');
            if (state && JSON.parse(state).status === 'pending')
                setIsExist(JSON.parse(state).hashword);
        }
    }, []);

    const handleContinue = () => {
        router.push(`/${isExist}`);
    };

    const handleClick = async ({
        getRandomWord,
    }: {
        getRandomWord: boolean;
    }) => {
        try {
            const res = await fetch(`/api/word?isRandom=${getRandomWord}`);

            const data = await res.json();
            setPlayerInfo('totalPlayCount');
            setPlayerInfo('playTime', 0);

            router.push(`/${data.hashedWord}`);
        } catch (error) {
            console.log(error);
        }
    };
    return {
        handleClick,
        handleContinue,
        isExist,
    };
};

export default useWordNavigation;