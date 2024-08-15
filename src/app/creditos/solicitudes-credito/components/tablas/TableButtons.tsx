import { AlertDialog } from '@/app/components/dialog/alerta/AlertDialog'
import { useSolicitudStore } from '@/app/hooks/creditos/useSolicitudStore'
import { useAlertDialogStore } from '@/app/hooks/ui/useAlertDialogStore'
import { useModalStore } from '@/app/hooks/ui/useModal'
import { DeleteOutline, Download, Edit } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

export const TableButtons = () => {
  const { activeSolicitudCredito, startLoadingSolicitudes } = useSolicitudStore()
  const { openModal } = useModalStore()
  const { openAlertDialog, closeAlertDialog } = useAlertDialogStore()
  const numActivos = activeSolicitudCredito ? activeSolicitudCredito.length : 0;

  const content = 'Seguro que quiere eliminar el registro?'

  

  const handleEdit = (event: any) => {
    event.preventDefault();
    openModal('Editando datos')
  }
  const handleDelete = () => {
    openAlertDialog();
    //startDeletingPermiso()
  }
  const handleConfirmation = () => {
    // startDeletingPermiso();
    closeAlertDialog();
    // setDeleteConfirmation(false); // Reinicia el estado de confirmación de eliminación
  };
  const handlePrint = () => {
    // DocExcel(activePermiso)
  }
  return (
    <>
      {
        numActivos !== 1 ? (
          <>
            <Tooltip title="Exportar a excel">
              <IconButton
                component='div'
                disabled={!numActivos}
                onClick={handlePrint}
              >
                <Download />
              </IconButton>
            </Tooltip>

            <Tooltip
              title="Eliminar"
              color="error"
            >
              <IconButton
                component='div'
                disabled={!numActivos}
                onClick={handleDelete}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Exportar a excel">
              <IconButton
                sx={{ color: 'primary.contrastText' }}
                component='div'
                disabled={!numActivos}
                onClick={handlePrint}
              >
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="ELiminar" color="error">
              <IconButton
                onClick={handleDelete}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar"
              sx={{ color: 'primary.contrastText' }}
            >
              <IconButton
                onClick={handleEdit}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </>
        )}
      <AlertDialog
        onConfirm={handleConfirmation}
        title="Confirmar Eliminación"
        content={content}
      />
    </>
  )
}
