import { setPlayerInfo } from '@/actions';
import { useEffect, useRef } from 'react';

/**
 *
 * @returns 게임 페이지의 체류 시간을 로컬 저장소에 저장하기 위한 커스텀 훅입니다.
 * 마운트 시 선언 된 시간 값과 언마운트 시 선언 된 시간값의 차이를 통해 이를 구현하였습니다.
 */

const usePlayTime = () => {
    const startDate = useRef<null | number>(null);
    useEffect(() => {
        startDate.current = Date.now();
        const s = Date.now();
        return () => {
            if (typeof startDate.current === 'number') {
                const endDate = Date.now();
                const duration = endDate - startDate.current;

                setPlayerInfo('playTime', duration);
                localStorage.setItem('end', ((endDate - s) / 1000).toString());
            }
        };
    }, []);
    return null;
};

export default usePlayTime;
