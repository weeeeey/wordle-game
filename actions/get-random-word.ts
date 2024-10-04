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
        throw error;
    }
};

export default getRandomWord;
