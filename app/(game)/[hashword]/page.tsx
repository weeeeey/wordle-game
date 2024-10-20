'use client';

import { GameKeyboard, GameBoard } from './_components';
import { useInitPlayerInfo, usePlayTime, useWordleState } from '@/hooks';
import { usePlayerInfoStore } from '@/store/playerinfo-store';

import { Delete } from 'lucide-react';
import { useEffect, useRef } from 'react';

/**
 * 해당 컴포넌트에서는 gameState를 통해 유저에게 현재의 상태를 보여줍니다.
 * 또한 페이지 접속 시  usePlayTime 훅을 통해 체류 시간을 로컬 저장소에 저장합니다.
 */

interface GamePageProps {
    params: {
        hashword: string;
    };
}

export default function GamePage({ params }: GamePageProps) {
    const {
        gameState: { checkedWords, currentInputIdx, errorRow, inputValues },
        handleChange,
        handleDelete,
        handleEnter,
        keysboardState,
    } = useWordleState(params.hashword);

    return (
        <section className="flex flex-col justify-center items-center gap-y-4 h-full ">
            <article className="grid grid-cols-5 gap-1 ">
                {inputValues.map((key, idx) => (
                    <GameBoard
                        checkedWords={checkedWords}
                        currentInputIdx={currentInputIdx}
                        label={key[0]}
                        idx={idx}
                        key={idx}
                        isError={Math.floor(idx / 5) === errorRow}
                    />
                ))}
            </article>
            <article className="space-y-1 px-1">
                <div className="grid grid-cols-10 gap-1">
                    {keysboardState.slice(0, 10).map((key) => (
                        <GameKeyboard
                            handleClick={handleChange}
                            key={key[0]}
                            keyboard={key[0]}
                            label={key[0]}
                            status={key[1]}
                        />
                    ))}
                </div>
                <div className="flex justify-between items-center  gap-x-1  px-6">
                    {keysboardState.slice(10, 19).map((key) => (
                        <GameKeyboard
                            handleClick={handleChange}
                            key={key[0]}
                            keyboard={key[0]}
                            label={key[0]}
                            status={key[1]}
                        />
                    ))}
                </div>
                <div className="grid grid-cols-11 w-full gap-1">
                    <GameKeyboard
                        handleClick={handleEnter}
                        key="enter"
                        keyboard="Enter"
                        label="enter"
                        className="col-span-2"
                        status="pending"
                    />
                    {keysboardState.slice(19).map((key) => (
                        <GameKeyboard
                            handleClick={handleChange}
                            key={key[0]}
                            keyboard={key[0]}
                            label={key[0]}
                            status={key[1]}
                        />
                    ))}
                    <GameKeyboard
                        handleClick={handleDelete}
                        key="backspace"
                        keyboard="Backspace"
                        label="BackSpace"
                        icon={Delete}
                        className="col-span-2"
                        status="pending"
                    />
                </div>
            </article>
        </section>
    );
}
