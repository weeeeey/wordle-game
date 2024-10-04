/**
 *
 * @param word
 * 유저가 게임 진행 중 올바르지 않은 단어를 입력시 체크할 수 있습니다.
 * 랜덤한 단어를 서버로부터 받아올 때 사전에 정의되지 않는 경우가 있습니다. 아래 함수를 통해 체크후 올바르지 않다면 랜덤 단어를 다시 받아옵니다.
 */

const checkWord = async (word: string) => {
    try {
        const res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        if (res.status === 404)
            throw new Error('사전에 등록되지 않은 단어입니다.');
        if (!res.ok)
            throw new Error('서버에 문제가 있습니다. 잠시 후 시도해주세요');
        return true;
    } catch (error) {
        throw error;
    }
};

export default checkWord;
