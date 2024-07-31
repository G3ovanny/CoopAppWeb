import { useSolicitudStore } from '@/app/hooks/creditos/useSolicitudStore'
import { DeleteOutline, Download, Edit } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

export const TableButtons = () => {
  const { activeSolicitud, startLoadingSolicitudes } = useSolicitudStore()

  const numActivos = activeSolicitud ? activeSolicitud.length : 0;


  const handleEdit = (event: any) => {
    event.preventDefault();
    // openModal('Editando datos')
  }
  const handleDelete = () => {
    // openAlertDialog(content);
    //startDeletingPermiso()
  }
  const handleConfirmation = () => {
    // startDeletingPermiso();
    // closeAlertDialog();
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
            <Tooltip title="Exportar a excel" color='secondary'>
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
            <Tooltip title="Exportar a excel" color='secondary'>
              <IconButton
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
            <Tooltip title="Editar" color='secondary'>
              <IconButton
                onClick={handleEdit}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </>
        )}
      {/* <AlertDialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        onConfirm={handleConfirmation}
        title="Confirmar Eliminación"
        content={content}
      /> */}
    </>
  )
}
