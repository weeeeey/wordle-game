import { CheckedWordsType } from '@/hooks/use-wordle-state';
import { cn } from '@/lib/utils';

/**
 * 게임 페이지의 상단인 현재 입력된 값을 보여주는 컴포넌트입니다.
 * style에 담겨진 --t는 css variable로 활용되어 애니메이션이 발동 시 각 행에서 순차적인 동작을 보여줍니다.
 * 단어 체크 과정에서 checkWords는 업데이트 되며 해당 상태값을 통해 배경색이 변경됩니다.
 */
interface GameBoardProps {
    idx: number;
    currentInputIdx: number;
    checkedWords: CheckedWordsType;
    label: string;
    isError: boolean;
}

export default function GameBoard({
    checkedWords,
    currentInputIdx,
    idx,
    label,
    isError,
}: GameBoardProps) {
    return (
        <div
            style={
                {
                    '--t': `${(idx % 5) * 0.25}s`,
                } as React.CSSProperties &
                    Record<`--${string}`, string | number>
            }
            className={cn(
                'board col-span-1  border-2 font-extrabold size-14 sm:size-16 flex justify-center items-center',
                idx < currentInputIdx && 'border-black',
                isError && 'animate-shake ',
                checkedWords.correct.includes(idx) && 'correct board-animation',
                checkedWords.misplace.includes(idx) &&
                    'misplaced board-animation',
                checkedWords.absent.includes(idx) && 'absent board-animation'
            )}
        >
            {label}
        </div>
    );
}
