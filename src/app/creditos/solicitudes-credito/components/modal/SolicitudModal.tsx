import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BaseModal } from '@/app/components/modal/BaseModal';
import { useModalStore } from '@/app/hooks/ui/useModal';
import { Alert, Box, Grid, TextField, Typography, Divider, Toolbar, InputAdornment, Button, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TabPanel } from '../tabs/TabPanel';
import { useForm } from '@/app/hooks';
import { useSolicitudStore } from '@/app/hooks/creditos/useSolicitudStore';


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

const formData = {
    'forma_pago': '',
    'tipo_garantia': '',
    'tipo_solicitud': '',
    'tipo_segmentacion': '',
    'lugar_solicitud': '',
    'fecha_solicitud': '',
    'tasa_interes': '',
    'monto': '',
    'plazo': '',
    'cuota': '',
    'destino_credito': '',
}
const listaLugares = [
    {
        'id': 1,
        'detalle': 'TULCAN'
    },
    {
        'id': 2,
        'detalle': 'SAN GABRIEL'
    }
]

export const SolicitudModal = () => {
    const { closeModal, nameModal } = useModalStore();
    const { activeSolicitud, startSavingSolicitud } = useSolicitudStore()
    let errorMessage = ''
    const handleCancel = () => {
        closeModal()
        // onResetForm()
    }

    //?validaciones del formulario
    const formValidations = {

    }

    const {
        forma_pago,
        tipo_garantia,
        tipo_solicitud,
        tipo_segmentacion,
        lugar_solicitud,
        fecha_solicitud,
        tasa_interes,
        monto,
        plazo,
        cuota,
        destino_credito,

        onInputChange,
        isFormValid,
        formState,
        onResetForm,
        setFormState
    } = useForm(formData, formValidations)

    const onSubmit = async (even: any) => {
        //event.preventDefault();
        if (isFormValid) {
            // startSavingSolicitud(formState)
        } else {
            errorMessage = 'Error en el formulario'
        }
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
                    color='white'
                    sx={{ flex: '1 1 100%', fontSize: '0.90rem', }}
                    id="transition-modal-title"
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

                        <Grid item xs sx={{ mt: 2 }}>
                            <FormControl
                                sx={{ minWidth: 215, maxWidth: 215 }}
                                size="small"
                            >
                                <InputLabel id="demo-simple-select-label">Oficina</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Oficina"
                                    value={lugar_solicitud || ''}
                                    // onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'lugar_solicitud' } })}
                                >
                                    {listaLugares.map(option => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.detalle}
                                        </MenuItem>
                                    ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs sx={{ mt: 2 }}>
                            <FormControl
                                sx={{ minWidth: 215, maxWidth: 215 }}
                                size="small"
                            >
                                <InputLabel id="demo-simple-select-label">Tipo de solicitud</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tipo de solicitud"
                                    value={tipo_solicitud || ''}
                                    // // onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_solicitud' } })}
                                >
                                    {listaLugares.map(option => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.detalle}
                                        </MenuItem>
                                    ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs sx={{ mt: 2 }}>
                            <FormControl
                                sx={{ minWidth: 215, maxWidth: 215 }}
                                size="small"
                            >
                                <InputLabel id="demo-simple-select-label">Tipo de segmentacion</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tipo de segmentacion"
                                    value={tipo_segmentacion || ''}
                                    // // onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_segmentacion' } })}
                                >
                                    {listaLugares.map(option => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.detalle}
                                        </MenuItem>
                                    ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs sx={{ mt: 2 }}>
                            <FormControl
                                sx={{ minWidth: 215, maxWidth: 215 }}
                                size="small"
                            >
                                <InputLabel id="demo-simple-select-label">Tipo de garantia</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tipo de garantia"
                                    value={tipo_garantia || ''}
                                    // // onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_garantia' } })}
                                >
                                    {listaLugares.map(option => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.detalle}
                                        </MenuItem>
                                    ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs sx={{ mt: 2 }}>
                            <TextField
                                label="Tasa de interes"
                                size="small"
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                                sx={{ minWidth: 180 }}
                                value={tasa_interes}
                                name='tasa_interes'
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs sx={{ mt: 2 }}>
                            <TextField
                                label="Monto"
                                size="small"
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                sx={{ minWidth: 180 }}
                                value={monto}
                                name='monto'
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs sx={{ mt: 2 }}>
                            <TextField
                                label="Plazo"
                                size="small"
                                type="number"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">Meses</InputAdornment>,
                                }}
                                sx={{ minWidth: 180 }}
                                value={plazo}
                                name='plazo'
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs sx={{ mt: 2 }}>
                            <TextField
                                label="Cuota estimada"
                                size="small"
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                sx={{ minWidth: 180 }}
                                value={cuota}
                                name='cuota'
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs sx={{ mt: 2 }}>
                            <TextField
                                label="Destino del crédito"
                                size="small"
                                sx={{ minWidth: 180 }}
                                value={destino_credito}
                                name='destino_credito'
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs sx={{ mt: 2 }}>
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
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Stack direction='row' spacing={2} justifyContent='flex-end'>
                            <Button
                                variant="contained"
                                onClick={onSubmit}
                            >Guardar solicitud</Button>
                        </Stack>
                    </Grid>
                </form>
            </Box>

            {/* <Toolbar /> */}
            <Divider />
            <TabPanel />
            {/* Otros componentes o secciones */}
        </BaseModal>
    )
}
