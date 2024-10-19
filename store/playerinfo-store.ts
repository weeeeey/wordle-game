import { create } from 'zustand';

const LOCALKEY = 'playerInfo';

type GuessWordle = number[];

export interface PlayerInfo {
    playTime: number;
    totalPlayCount: number;
    winCount: number;
    guessWordle: GuessWordle;
    isPractice: boolean;
    latestDate: string;
}

interface usePlayerInfoStoreProps {
    playerInfo: PlayerInfo;
    setPlayerInfo: (
        key: PlayerInfoKey,
        value: number | boolean | string
    ) => void;
    incrementGuessWordle: (guessCount: number) => void;
    resetGuessWordle: () => void;
    saveToLocalStorage: () => void;
}

export type PlayerInfoKey =
    | 'playTime'
    | 'totalPlayCount'
    | 'winCount'
    | 'isPractice'
    | 'latestDate';

const initPlayerInfo: PlayerInfo = {
    playTime: 0,
    guessWordle: [0, 0, 0, 0, 0, 0],
    isPractice: false,
    winCount: 0,
    totalPlayCount: 0,
    latestDate: Date.now().toString(),
};

const getInitPlayerInfo = (): PlayerInfo => {
    if (typeof window === 'undefined') {
        return initPlayerInfo;
    }
    return JSON.parse(
        localStorage.getItem(LOCALKEY) || JSON.stringify(initPlayerInfo)
    );
};

export const usePlayerInfoStore = create<usePlayerInfoStoreProps>(
    (set, get) => ({
        playerInfo: getInitPlayerInfo(),
        setPlayerInfo: (key: PlayerInfoKey, value: number | boolean | string) =>
            set((state) => ({
                playerInfo: {
                    ...state.playerInfo,
                    [key]: value,
                },
            })),
        incrementGuessWordle: (guessCount: number) =>
            set((state) => {
                const newGuessWordle = [...state.playerInfo.guessWordle];
                if (guessCount >= 1 && guessCount <= 6) {
                    newGuessWordle[guessCount - 1]++;
                }
                return {
                    playerInfo: {
                        ...state.playerInfo,
                        guessWordle: newGuessWordle,
                    },
                };
            }),
        resetGuessWordle: () =>
            set((state) => ({
                playerInfo: {
                    ...state.playerInfo,
                    guessWordle: [0, 0, 0, 0, 0, 0],
                },
            })),
        saveToLocalStorage: () => {
            const { playerInfo } = get();
            if (typeof window === 'undefined') return;
            window.localStorage.setItem(
                LOCALKEY,
                JSON.stringify({
                    ...playerInfo,
                    latestDate: Date.now().toString(),
                })
            );
        },
    })
);
