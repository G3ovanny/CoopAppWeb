'use client'
import { useModalStore } from '@/app/hooks/ui/useModal';
import { NoteAdd } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export const BotonesBreadcrumbs = () => {
  const { openModal, nameModal } = useModalStore();

  const handeleAddCredit = () => {
    openModal('Nuevo crédito')
  }

  return (

    <Tooltip title="Nuevo crédito" color="secondary" >
      <IconButton
        onClick={handeleAddCredit}
      >
        <NoteAdd />
      </IconButton>
    </Tooltip>
  )
}
