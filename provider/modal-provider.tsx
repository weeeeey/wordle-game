'use client';

import { FailModal, SuccessModal, HowModal } from '@/components/modal';
/**
 *
 * @returns 존재하는 모든 모달을 감싸주고 있습니다.
 * layout에서 호출되어 전역 적으로 사용 가능합니다.
 */

export default function ModalProvider() {
    return (
        <>
            <SuccessModal />
            <FailModal />
            <HowModal />
        </>
    );
}
