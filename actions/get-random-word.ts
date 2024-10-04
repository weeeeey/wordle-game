const EndPoint = 'https://random-word-api.herokuapp.com/word?length=5';

/**
 *
 * @returns 랜덤 단어를 얻기 위한 액션 함수로 /api/word/route.ts 에서 활용됩니다.
 */

const getRandomWord = async () => {
    try {
        const res = await fetch(EndPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) throw new Error('랜덤 단어 얻기 실패');
        const data = await res.json();

        return data[0];
    } catch (error) {
        return '현재 랜덤 단어를 얻는 과정에서 서버 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.';
    }
};

export default getRandomWord;
