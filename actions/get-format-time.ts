import { intervalToDuration, formatDuration } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 *
 * @param playTime
 * 유저가 게임 종료(성공/실패) 후 나타나는 모달에서 플레이 시간을 보여줍니다 형식은 (h시간 m분 s초) 입니다
 */
const getFormatTime = (playTime: number) => {
    const duration = intervalToDuration({
        start: 0,
        end: playTime * 1000,
    });

    const formatTime = formatDuration(duration, {
        format: ['hours', 'minutes', 'seconds'],
        locale: ko,
        delimiter: ' ',
    });

    return formatTime;
};

export default getFormatTime;
