import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

/**
 * 게임 페이지 하단의 키보드를 보여줍니다.
 * 키보드의 상태값은 correct,misplace,absent,pending 순으로 우선순위가 높으며
 * 이후 단어 체크 후 우선순위대로 배경색이 바뀌게 됩니다.
 */
interface GameKeyboardProps {
    keyboard: string;
    label: string;
    icon?: LucideIcon;
    className?: string;
    handleClick: (value: string) => void;
    status: 'correct' | 'misplace' | 'absent' | 'pending';
}

export default function GameKeyboard({
    keyboard,
    className,
    handleClick,
    label,
    icon: Icon,
    status,
}: GameKeyboardProps) {
    return (
        <button
            onClick={() => handleClick(keyboard)}
            className={cn(
                'rounded-sm border font-extrabold px-2 py-1 sm:px-4 sm:py-2 w-full uppercase active:scale-95 hover:scale-105 transition-all flex justify-center items-center',
                className,
                status === 'pending' && 'bg-gray-200 hover:bg-gray-300',
                status === 'absent' && 'bg-absent',
                status === 'misplace' && 'bg-misplaced hover:bg-yellow-600',
                status === 'correct' && 'bg-correct hover:bg-green-700'
            )}
        >
            {Icon ? <Icon /> : label}
        </button>
    );
}
