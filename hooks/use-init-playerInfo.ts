import { getPlayerInfo } from '@/actions';
import { useEffect } from 'react';

const initPlayerInfo = {
    playTime: 0,
    totalPlayCount: 0,
    winCount: 0,
    guessWordle: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    },
    lastWinWord: '',
};

const useInitPlayerInfo = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const playerInfo = getPlayerInfo();
            if (!playerInfo)
                localStorage.setItem(
                    'playerInfo',
                    JSON.stringify(initPlayerInfo)
                );
        }
    }, []);
};

export default useInitPlayerInfo;
