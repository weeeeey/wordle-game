/**
 * 키보드의 맵팽을 위한 상수값과 키보드 input 이벤트 발생 시 한글 입력 또한 적용이 되기 위해 키보드의 코드값을 통해 저장되었습니다.
 */
const ENKEYBOARDS = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
];

type StatusType = 'correct' | 'misplace' | 'absent' | 'pending';
type KeyboardWithStatusType = [string, StatusType];
const keyboardsWithStatus: KeyboardWithStatusType[] = ENKEYBOARDS.map((en) => [
    en,
    'pending',
]);

export type KeyboardCodeType = {
    [key: string]: string;
};

const keyboardCode: KeyboardCodeType = {
    KeyQ: 'Q',
    KeyW: 'W',
    KeyE: 'E',
    KeyR: 'R',
    KeyT: 'T',
    KeyY: 'Y',
    KeyU: 'U',
    KeyI: 'I',
    KeyO: 'O',
    KeyP: 'P',
    KeyA: 'A',
    KeyS: 'S',
    KeyD: 'D',
    KeyF: 'F',
    KeyG: 'G',
    KeyH: 'H',
    KeyJ: 'J',
    KeyK: 'K',
    KeyL: 'L',
    KeyZ: 'Z',
    KeyX: 'X',
    KeyC: 'C',
    KeyV: 'V',
    KeyB: 'B',
    KeyN: 'N',
    KeyM: 'M',
};

export { keyboardCode, ENKEYBOARDS, keyboardsWithStatus };
export type { KeyboardWithStatusType };
