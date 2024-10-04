import { setPlayerInfo } from '@/actions';
import { useEffect } from 'react';

/**
 *
 * @returns 게임 페이지의 체류 시간을 로컬 저장소에 저장하기 위한 커스텀 훅입니다.
 * 마운트 시 선언 된 시간 값과 언마운트 시 선언 된 시간값의 차이를 통해 이를 구현하였습니다.
 */

const usePlayTime = () => {
    useEffect(() => {
        const startDate = Date.now();
        return () => {
            const endDate = Date.now();
            const duration = endDate - startDate;
            setPlayerInfo('playTime', duration);
        };
    }, []);
    return null;
};

export default usePlayTime;
