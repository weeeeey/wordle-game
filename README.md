# Wordle 구현 프로젝트

## 기술 스택

-   프론트엔드 프레임워크: Next.js14.2
-   스타일링: Tailwind CSS, shadcn/ui
-   상태 관리: Zustand
-   유틸리티 라이브러리: date-fns, crypto-js, clsx, tailwind-merge

## 프로젝트 개요

1. 사용자 인터페이스 설계

    - 반응형 디자인을 통해 유저는 자신의 상황에 맞는 디자인을 볼 수 있습니다.
    - 메인 페이지
        - 유저는 시작하기,워들 생성하기, 이어하기 버튼을 선택할 수 있습니다.
        - 시작하기: 정답이 WORLD로 고정되어 있습니다.
        - 워들 생성하기: 랜덤한 단어를 맞추는 게임이 진행됩니다.
        - 이어하기: 이전에 진행중이던 게임이 있다면 나타나는 버튼으로 이전 게임 상태를 유지된채로 진행됩니다.
    - 게임 페이지
        - 유저는 게임 방식대로 진행하며 상황에 맞는 애니메이션들이 표출됩니다.
        - 잘못된 값을 입력 시 에러 애니메이션과 함께 Toast를 통해 메시지를 보여줍니다.
        - 각 행마다 단어를 체크할 시 알맞은 애니메이션이 나타납니다.
        - 게임 종료 시 모달을 통해 유저에게 성공/실패를 보여줍니다.

2. 데이터 관리

-   WordleGameState 데이터는 현재 게임의 상태를 관리합니다.<br>
    해당 state에는 암호화 된 정답 단어, 게임 상태(진행 중, 성공, 실패), 완료된 행 수, 현재 입력 인덱스, 오류 행, 입력 값, 검사된 단어(맞음, 위치 틀림, 없음) 에 대한 정보가 포함됩니다.

```javascript
type WordleGameState = {
    hashword: string,
    status: 'pending' | 'success' | 'fail',
    completedRow: number,
    currentInputIdx: number,
    errorRow: number,
    inputValues: string[],
    checkedWords: CheckedWordsType,
};
type CheckedWordsType = {
    correct: number[],
    misplace: number[],
    absent: number[],
};
```

-   플레이어 정보 유지:

PlayerInfo를 사용하여 플레이어의 게임 기록을 관리합니다.<br>
해당 정보에는 현재 게임의 플레이 시간, 총 플레이 횟수, 승리 횟수, 추측 단어 기록, 마지막 승리 단어가 포함됩니다.
이 정보를 통해 페이지에 재접속시에도 이전 게임 상태가 유지됩니다.

```javascript
type PlayerInfoType = {
    playTime: number,
    totalPlayCount: number,
    winCount: number,
    guessWordle: GuessWordleType,
    lastWinWord: string,
};
```

-   데이터 저장 방식:
    페이지가 종료되더라도 이전 상태를 유지하기 위해 localStorage를 활용하였습니다.<br>
    localStorage에는 playerInfo,wordleGameState,isVisited가 저장되어 각각의 상황에 맞게 저장됩니다.<br>

    -   wordleGameState는 데이터 입력,단어 체크, 데이트 지움 이벤트가 발생할 때 localStorage에 저장됩니다.
    -   playerInfo
        -   playTime: game이 진행될 시 마운트 시 생성된 start와 언마운트시 생성된 end와의 차이를 저장합니다.
        -   totalPlayCount: 메인페이지에서 게임페이지로 이동할 시 새로운 단어를 생성한다면 값이 증가되어 저장됩니다.
        -   winCount: wordleGameState.status가 "success"일 시 증가되어 저장됩니다.
        -   guessWordle: wordleGameState.status가 "success"일 시 체크 된 행을 통해 저장됩니다.
        -   lastWinWord: 성공시 페이지 리로드한다면 winCount가 증가되는 버그를 피해가 위해 선언되었으며 status가 'success'이고 이전에 저장된 lastWinWord가 다르다면 새로운 정답 단어를 저장합니다.

-   데이터 암호화:
    메인 페이지에서 게임 페이지로 이동할 시 정답인 단어가 params에 담겨집니다.<br>
    유저에게는 해당 정답이 보이지 않기 위해 next.js의 서버 사이드 액션을 활용하였습니다.<br>
    페이지 이동 과정에서 /api/word 에서 랜덤 단어를 "random-word-api.herokuapp.com"에서 받아온 뒤 Crypto.js 를 활용하여 암호화 된 채로 받아옵니다. <br>
    해당 정답은 해시화 된 정답은 게임 페이지에서 복호화시킨 뒤 useMemo를 통해 저장되어 추후 복잡한 계산을 피하고 있습니다.

## 프로젝트 실행 방법

```bash
npm install
npm run dev
```

## 향후 개선 사항

-   마운트 시 생성된 시간과 언마운트 시 생성된 시간을 통해 현재 게임의 playTime을 관리하는데 해당 과정이 의도한대로 동작하지 않는 문제점이 있습니다. 추후 해당 과정을 수정해야 합니다.
