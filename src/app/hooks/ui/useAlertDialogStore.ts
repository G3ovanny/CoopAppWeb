import { onCloseAlertDialog, onOpenAlertDialog } from '@/app/store/ui/alertDialogSlice'
import { useDispatch, useSelector } from 'react-redux'

interface DialogSate {
  AlertDialog: {
    isAlertDialogOpen: boolean;
  }
}

export const useAlertDialogStore = () => {
  const dispatch = useDispatch()
  const { isAlertDialogOpen } = useSelector((state: DialogSate) => state.AlertDialog)

  const openAlertDialog = () => {
    dispatch(onOpenAlertDialog());
  }

  const closeAlertDialog = () => {
    dispatch(onCloseAlertDialog())

  }

  return {
    //* Propiedades
    isAlertDialogOpen,
    //* Metodos
    openAlertDialog,
    closeAlertDialog,

  }
}