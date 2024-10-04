import { PlayerInfoType } from './set-player-info';

/**
 *
 * @returns 로컬 저장소에 저장 된 player의 정보를 받아옵니다.
 */

const getPlayerInfo = (): PlayerInfoType | null => {
    const playerInfo = localStorage.getItem('playerInfo');
    if (!playerInfo) return null;
    return JSON.parse(playerInfo);
};

export default getPlayerInfo;
