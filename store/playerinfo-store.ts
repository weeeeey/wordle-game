import { create } from 'zustand';

interface usePlayerInfoStoreProps {
    playTime: number;
    totalPlayCount: number;
    winCount: number;
    guessWordle: {
        one: number;
        two: number;
        three: number;
        four: number;
        five: number;
        six: number;
    };
    isPractice: boolean;
    setPlayerInfo: (key: PlayerInfoKey, value: number | boolean) => void;
    getPlayerInfo: (key: PlayerInfoKey) => number | boolean | object;
    saveToLocalStorage: () => void;
}

type PlayerInfoPropsType = Omit<
    usePlayerInfoStoreProps,
    'setPlayerInfo' | 'getPlayerInfo' | 'saveToLocalStorage'
>;

type PlayerInfoKey =
    | 'playTime'
    | 'totalPlayCount'
    | 'winCount'
    | 'isPractice'
    | 'guessWordle'
    | 'guessWordle.one'
    | 'guessWordle.two'
    | 'guessWordle.three'
    | 'guessWordle.four'
    | 'guessWordle.five';

const LOCALKEY = 'playerInfo';

const initPlayerInfo = {
    playTime: 0,
    guessWordle: { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 },
    isPractice: false,
    winCount: 0,
    totalPlayCount: 0,
};
const getInitPlayerInfo = () => {
    if (typeof window === 'undefined') {
        return initPlayerInfo;
    }
    return JSON.parse(
        localStorage.getItem(LOCALKEY) || JSON.stringify(initPlayerInfo)
    );
};
export const usePlayerInfoStore = create<usePlayerInfoStoreProps>(
    (set, get) => ({
        ...getInitPlayerInfo(),
        setPlayerInfo: (key: PlayerInfoKey, value: number | boolean) =>
            set((previous) => {
                const properties = key.split('.');
                if (properties.length === 1) {
                    return {
                        ...previous,
                        [key]: value,
                    };
                } else {
                    return {
                        ...previous,
                        guessWordle: {
                            ...previous.guessWordle,
                            [properties[1]]: value,
                        },
                    };
                }
            }),
        getPlayerInfo: (key: PlayerInfoKey): number | boolean | object => {
            const properties = key.split('.');
            const state = get();

            if (properties.length === 1)
                return state[key as keyof typeof state];
            else
                return state.guessWordle[
                    properties[1] as keyof typeof state.guessWordle
                ];
        },
        saveToLocalStorage: () => {
            const state = get();
            const playerInfo: PlayerInfoPropsType = {
                guessWordle: state.guessWordle,
                isPractice: state.isPractice,
                playTime: state.playTime,
                totalPlayCount: state.totalPlayCount,
                winCount: state.winCount,
            };
            if (typeof window === 'undefined') return;
            window.localStorage.setItem(LOCALKEY, JSON.stringify(playerInfo));
        },
    })
);
