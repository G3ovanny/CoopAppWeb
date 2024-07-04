import { onCloseModal, onOpenModal } from '@/app/store/ui/modalSlice';
import { useDispatch, useSelector } from 'react-redux'

interface ModalState {
    modal: {
        isModalOpen: boolean;
        nameModal: string;
    };
}
export const useModalStore = () => {
    const dispatch = useDispatch();
    const { isModalOpen, nameModal } = useSelector((state: ModalState) => state.modal);

    const openModal = (name: string) => {
        dispatch(onOpenModal(name));
    };

    const closeModal = () => {
        dispatch(onCloseModal());
    };

    return {
        // Eigenschaften
        isModalOpen,
        nameModal,
        // Methoden
        openModal,
        closeModal,
    };
};