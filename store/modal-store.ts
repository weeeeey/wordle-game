import { create } from 'zustand';

/**
 * 모달이 전역적으로 관리하기 위해 선언 된 store로 isOpen && modalType 조합으로 원하는 모달이 화면에 출력되며
 * modalType은 onOpen 함수를 통해 셋팅됩니다.
 */
export type ModalType = 'success' | 'fail' | 'how';

type DataType = {
    answer?: string;
};
interface ModalStoreProps {
    isOpen: boolean;
    modalType: ModalType | null;
    onOpen: (type: ModalType, answer?: string) => void;
    onClose: () => void;
    data: DataType;
}

export const useModalStore = create<ModalStoreProps>((set) => ({
    isOpen: false,
    modalType: null,
    data: {},
    onOpen: (type, answer) =>
        set((p) => ({
            isOpen: true,
            modalType: type,
            data: {
                ...p.data,
                answer,
            },
        })),
    onClose: () =>
        set(() => ({
            isOpen: false,
            modalType: null,
            data: {},
        })),
}));
