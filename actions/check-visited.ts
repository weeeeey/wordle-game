/**
 *
 * @returns 첫 방문한 유저에게 게임 방법 모달을 띄워주기 위해 사용됩니다
 */
const checkVisited = () => {
    const visited = window.localStorage.getItem('isVisited');
    if (!visited) {
        window.localStorage.setItem('isVisited', 'true');
        return false;
    }
    return true;
};

export default checkVisited;
