import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BaseModal } from '@/app/components/modal/BaseModal';
import { useModalStore } from '@/app/hooks/ui/useModal';
import { Alert, Box, Grid, TextField, Typography, Divider, Toolbar } from '@mui/material';
import { TabPanel } from '../tabs/TabPanel';


const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95vw', // 70% del ancho de la pantalla
    height: '95vh', // 70% del alto de la pantalla
    overflow: 'auto',
    backgroundColor: '#ffffff', // Cambia a un color válido
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)', // Box shadow más claro y comprensible
    padding: '0.5rem', // Uso de padding en rems para mantener la coherencia
    borderRadius: '8px', // Opcional: añade bordes redondeados
};


export const SolicitudModal = () => {
    const { closeModal, nameModal } = useModalStore();
    const errorMessage = 'Mensajes de error'
    const handleCancel = () => {
        closeModal()
        // onResetForm()
    }
    return (
        <BaseModal title={nameModal} style={style}>
            <Grid
                container
                sx={{
                    backgroundColor: 'secondary.main',
                    padding: '0.5rem',
                }}
            >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                >
                    DATOS DEL CRÉDITO
                </Typography>
            </Grid>

            <Box sx={{ padding: '0.5rem' }}>
                <form>
                    <Grid container spacing={2}>
                        {errorMessage && (
                            <Grid item xs={12}>
                                <Alert severity="error">{errorMessage}</Alert>
                            </Grid>
                        )}

                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Lugar de solicitud"
                                size="small"
                                sx={{ minWidth: 180 }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                        },
                                    }}
                                    format="YYYY-MM-DD"
                                    label="Fecha de solicitud"
                                    sx={{ minWidth: 150 }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField
                                label="Monto"
                                size="small"
                                sx={{ minWidth: 180 }}
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField
                                label="Plazo (Meses)"
                                size="small"
                                sx={{ minWidth: 180 }}
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField
                                label="Cuota estimada"
                                size="small"
                                sx={{ minWidth: 180 }}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Box>

            <Toolbar />
            <Divider />
            <TabPanel />
            {/* Otros componentes o secciones */}
        </BaseModal>
    )
}
