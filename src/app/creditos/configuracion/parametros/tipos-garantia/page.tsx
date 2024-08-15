'use client'
import { AlertDialog } from '@/app/components/dialog/alerta/AlertDialog'
import { useForm } from '@/app/hooks'
import { useTipoGarantiaStore } from '@/app/hooks/creditos/useTipoGarantiaStore'
import { useAlertDialogStore } from '@/app/hooks/ui/useAlertDialogStore'
import { DeleteOutline, Edit } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'

interface TipoGarantia {
  id: number,
  descripcion: string;
}

const initialFormData = {
  descripcion: '',
}

export default function TiposGarantia() {
  const {
    setActiveTipoGarantia,
    startDeleteTipoGarantia,
    startLoandingTipoGarantia,
    startSavingTipoGarantia,
    inicialTipoGarantia,
    listTipoGarantia,
    activeTipoGarantia } = useTipoGarantiaStore()

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

  const handleDelete = (objeto: TipoGarantia) => {
    setEdit(false)
    setActiveTipoGarantia(objeto)
    openAlertDialog()
  }

  const handleEdit = (objeto: TipoGarantia) => {
    setEdit(true)
    setActiveTipoGarantia(objeto)
  }

  const handleConfirmation = async () => {
    await startDeleteTipoGarantia()
    closeAlertDialog()
  }

  const handleCancel = () => {
    setActiveTipoGarantia(inicialTipoGarantia)
    onResetForm()
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (isFormValid) {
      await startSavingTipoGarantia({ ...formState })
      onResetForm()
    }
  }

  useEffect(() => {
    startLoandingTipoGarantia()
    if (activeTipoGarantia && edit) {
      setFormState(activeTipoGarantia)
    }
  }, [activeTipoGarantia])
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
               Tipos de garantía
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
                {listTipoGarantia.length === 0 ? (
                  <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
                    No hay tipos de garantía disponibles
                  </Typography>
                ) : (
                  listTipoGarantia.map((objeto: TipoGarantia) => (
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
                  label="Tipos de garantia"
                  type='text'
                  placeholder='Ingrese el tipo de garantia'
                  fullWidth
                  name='descripcion'
                  value={descripcion || ''}
                  onChange={onInputChange}
                  helperText={!isFormValid && 'Por favor, ingrese un tipo de garantia válida.'}
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
