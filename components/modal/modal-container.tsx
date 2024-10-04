import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerDescription,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks';

/**
 * 모달이 화면에 보여질 때 모바일과 데스크탑 환경에 따라 drawer/dialog 형태로 나누어는 반응형을 위해 작성된 컨테이너입니다.
 */

interface ContainerProps {
    isModalOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

function DialogContainer({
    isModalOpen,
    onClose,
    className,
    children,
}: ContainerProps) {
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className={cn('bg-white', className)}>
                <VisuallyHidden.Root asChild>
                    <DialogTitle />
                </VisuallyHidden.Root>
                <VisuallyHidden.Root asChild>
                    <DialogDescription />
                </VisuallyHidden.Root>
                {children}
            </DialogContent>
        </Dialog>
    );
}

function DrawerContainer({
    children,
    isModalOpen,
    onClose,
    className,
}: ContainerProps) {
    return (
        <Drawer open={isModalOpen} onOpenChange={onClose}>
            <DrawerContent className={cn('bg-white', className)}>
                <VisuallyHidden.Root asChild>
                    <DrawerTitle />
                </VisuallyHidden.Root>
                <VisuallyHidden.Root asChild>
                    <DrawerDescription />
                </VisuallyHidden.Root>
                {children}
            </DrawerContent>
        </Drawer>
    );
}

function DrawerDialogContiner({
    children,
    isModalOpen,
    onClose,
    className,
}: ContainerProps) {
    const isMobile = useMediaQuery();

    if (isMobile) {
        return (
            <DrawerContainer
                isModalOpen={isModalOpen}
                onClose={onClose}
                className={className}
            >
                {children}
            </DrawerContainer>
        );
    }
    return (
        <DialogContainer
            isModalOpen={isModalOpen}
            onClose={onClose}
            className={className}
        >
            {children}
        </DialogContainer>
    );
}

export { DialogContainer, DrawerContainer, DrawerDialogContiner };
