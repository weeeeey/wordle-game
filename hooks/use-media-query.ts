import { useState, useEffect } from 'react';

/**
 *
 * @param query
 * drawer/dialog 반응형 모달을 위해 선언된 훅으로 쿼리 값을 통해 768px보다 작은 모바일 환경에선 true, 데스크탑 환경에선 false를 리턴합니다.
 */

const useMediaQuery = (query = '(max-width: 768px)') => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const getMatches = (query: string): boolean => {
            if (typeof window !== 'undefined') {
                return window.matchMedia(query).matches;
            }
            return false;
        };

        function handleChange() {
            setMatches(getMatches(query));
        }

        handleChange();

        const matchMedia = window.matchMedia(query);

        matchMedia.addEventListener('change', handleChange);

        return () => {
            matchMedia.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
