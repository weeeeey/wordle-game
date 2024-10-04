import getPlayerInfo from './get-player-info';

/**
 * @params key,value
 * 로컬 저장소에 저장되어 있는 플레이어 정보를 매개변수로 넘어온 키와 값을 통해 업데이트 하기 위한 함수입니다.
 */

type PlayerInfoKeyType =
    | 'playTime'
    | 'totalPlayCount'
    | 'winCount'
    | 'guessWordle'
    | 'lastWinWord';

type GuessWordleType = {
    [key: number]: number;
};

export type PlayerInfoType = {
    playTime: number;
    totalPlayCount: number;
    winCount: number;
    guessWordle: GuessWordleType;
    lastWinWord: string;
};

const setPlayerInfo = (key: PlayerInfoKeyType, value?: number | string) => {
    const playerInfo = getPlayerInfo();
    if (!playerInfo) return;
    const newPlayerInfo: PlayerInfoType = { ...playerInfo };
    switch (key) {
        case 'guessWordle':
            newPlayerInfo.guessWordle = {
                ...newPlayerInfo.guessWordle,
                [value as number]:
                    newPlayerInfo.guessWordle[value as number] + 1,
            };
            break;
        case 'lastWinWord':
            newPlayerInfo.lastWinWord = value as string;
            break;
        case 'playTime':
            newPlayerInfo.playTime =
                value === 0 ? 0 : newPlayerInfo.playTime + (value as number);
            break;
        default:
            newPlayerInfo[key] = newPlayerInfo[key] + 1;
            break;
    }

    window.localStorage.setItem('playerInfo', JSON.stringify(newPlayerInfo));
};

export default setPlayerInfo;
