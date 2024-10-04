import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const checkWordMatch = (
    answerWord: string,
    willCheckWord: string,
    willCheckedRow: number
) => {
    const correct: number[] = [];
    const misplaced: number[] = [];
    const absent: number[] = [];

    const checkecArr = [false, false, false, false, false];
    for (let i = 0; i < 5; i++) {
        if (answerWord[i] === willCheckWord[i]) {
            checkecArr[i] = true;
            correct.push(i + willCheckedRow * 5);
        }
    }
    for (let i = 0; i < 5; i++) {
        if (checkecArr[i]) continue;
        const idx = answerWord.indexOf(willCheckWord[i]);
        if (idx === -1 || checkecArr[idx] === true) {
            absent.push(i + willCheckedRow * 5);
            continue;
        }
        misplaced.push(i + willCheckedRow * 5);
    }

    return {
        correct,
        misplaced,
        absent,
    };
};
