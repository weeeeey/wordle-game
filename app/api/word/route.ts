import { NextResponse } from 'next/server';

import { checkWord, encryptWord, getRandomWord } from '@/actions';

/**
 *
 * @param req
 * 클라이언트 사이드에서 랜덤 단어를 받아온다면 유저에게 이것이 노출 될 수 있다고 판단하여 Next.js의 서버 사이드 액션을 활용하였습니다.
 * 받아온 랜덤 단어가 사전에 등록되지 않는 경우가 있어 반복문을 통해 올바른 단어를 가져옵니다.
 */

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const isRandom = searchParams.get('isRandom');
        let word = '';
        let isValidWord = false;

        if (isRandom === 'false') word = 'world';
        else {
            while (!isValidWord) {
                word = await getRandomWord();
                try {
                    await checkWord(word);
                    isValidWord = true;
                } catch (error) {
                    console.log(
                        '랜덤 단어가 사전에 정의된 단어가 아닙니다. 다시 얻어오는 중..'
                    );
                }
            }
        }

        const hashedWord = encryptWord(word);

        return NextResponse.json({
            hashedWord,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse('internal error', { status: 500 });
    }
}
