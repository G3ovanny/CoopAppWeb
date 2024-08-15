'use client'
import React, { useEffect, useState, FormEvent } from 'react'
import { Box, Card, CardContent, Divider, Grid, List, ListItem, ListItemText, Toolbar, Typography, Tooltip, IconButton, TextField, CardActions, Button, Alert } from '@mui/material'
import { DeleteOutline, Edit } from '@mui/icons-material'
import { useAlertDialogStore } from '@/app/hooks/ui/useAlertDialogStore'
import { AlertDialog } from '@/app/components/dialog/alerta/AlertDialog'
import { useForm } from '@/app/hooks'
import { useTipoSolicitudStore } from '@/app/hooks/creditos/useTipoSolicitudStore'

interface FormaPago {
  id: number;
  descripcion: string;
}

const initialFormData = {
  descripcion: '',
}


export default function TiposSolicitud() {

  const {
    startLoadingTipoSolicitud,
    setActiveTipoSolicitud,
    startDeletingTipoSolicitud,
    startSavingTipoSolicitud,
    inicialTipoSolicitud,
    listTipoSolicitud,
    activeTipoSolicitud,
  } = useTipoSolicitudStore()

  const {
    descripcion,
    isFormValid,
    formState,
    onInputChange,
    onResetForm,
    setFormState
  } = useForm(initialFormData)



  const { openAlertDialog, closeAlertDialog } = useAlertDialogStore()
  const [edit, setEdit] = useState(false)

  const content = '¿Está seguro de eliminar el registro?'

  const handleDelete = (objeto: FormaPago) => {
    setEdit(false)
    setActiveTipoSolicitud(objeto)
    openAlertDialog()
  }

  const handleEdit = (objeto: FormaPago) => {
    setEdit(true)
    setActiveTipoSolicitud(objeto)
  }

  const handleConfirmation = async () => {
    await startDeletingTipoSolicitud()
    closeAlertDialog()
  }

  const handleCancel = () => {
    setActiveTipoSolicitud(inicialTipoSolicitud)
    onResetForm()
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (isFormValid) {
      await startSavingTipoSolicitud({ ...formState })
      onResetForm()
    }
  }

  useEffect(() => {
    startLoadingTipoSolicitud()
    if (activeTipoSolicitud && edit) {
      setFormState(activeTipoSolicitud)
    }
  }, [activeTipoSolicitud])


  return (
    <Box sx={{ p: 3 }}>
      <Toolbar>
        <Grid container justifyContent="flex-end">
          {/* Aquí puedes agregar algún mensaje global o alertas si es necesario */}
        </Grid>
      </Toolbar>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Tipos de solicitud
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List
                sx={{
                  bgcolor: 'background.paper',
                  maxHeight: 400,
                  overflowY: 'auto',
                  '& ul': { padding: 0 },
                }}
              >
                {listTipoSolicitud.length === 0 ? (
                  <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
                    No hay tipos de solicitud disponibles
                  </Typography>
                ) : (
                  listTipoSolicitud.map((objeto: FormaPago) => (
                    <ListItem key={objeto.id} sx={{ py: 1, borderBottom: 1, borderColor: 'divider' }}>
                      <ListItemText primary={objeto.descripcion} />
                      <Tooltip title="Eliminar" arrow>
                        <IconButton
                          aria-label="Eliminar"
                          color="error"
                          onClick={() => handleDelete(objeto)}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar" arrow>
                        <IconButton
                          aria-label="Editar"
                          color="secondary"
                          onClick={() => handleEdit(objeto)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <form onSubmit={onSubmit}>
              <CardContent>
                <TextField
                  sx={{ mb: 2, '& input': { textTransform: 'uppercase' } }}
                  size='small'
                  id="descripcion"
                  autoComplete='off'
                  label="Tipo de solicitud"
                  type='text'
                  placeholder='Ingrese el Tipo de solicitud'
                  fullWidth
                  name='descripcion'
                  value={descripcion || ''}
                  onChange={onInputChange}
                  helperText={!isFormValid && 'Por favor, ingrese un tipo de solicitud válida.'}
                  error={!isFormValid}
                />
              </CardContent>
              <CardActions>
                <Button
                  type='submit'
                  size='small'
                  variant='contained'
                  disabled={!isFormValid}
                >
                  Guardar
                </Button>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
      <AlertDialog
        onConfirm={handleConfirmation}
        title='Confirmar eliminación'
        content={content}
      />
    </Box>
  )
}
