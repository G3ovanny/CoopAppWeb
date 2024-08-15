import React, { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BaseModal } from '@/app/components/modal/BaseModal';
import { useModalStore } from '@/app/hooks/ui/useModal';
import { Alert, Box, Grid, TextField, Typography, Divider, InputAdornment, Button, Stack, FormControl, InputLabel, Select, MenuItem, ToggleButtonGroup, ToggleButton, Toolbar } from '@mui/material';
import { TabPanel } from '../tabs/TabPanel';
import { useForm } from '@/app/hooks';
import { useSolicitudStore } from '@/app/hooks/creditos/useSolicitudStore';
import { useTipoGarantiaStore } from '@/app/hooks/creditos/useTipoGarantiaStore';
import { useTipoSegmentacionStore } from '@/app/hooks/creditos/useTipoSegmentacionStore';
import { useTipoSolicitudStore } from '@/app/hooks/creditos/useTipoSolicitudStore';
import { useFormaPagoStore } from '@/app/hooks/creditos/useFormaPagoStore';

const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95vw',
    height: '95vh',
    overflow: 'auto',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
    padding: '0',
    borderRadius: '8px',
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
};

const listaLugares = [
    { 'id': 1, 'detalle': 'TULCAN' },
    { 'id': 2, 'detalle': 'SAN GABRIEL' }
];

export const SolicitudModal: React.FC = () => {
    const { closeModal, nameModal, isModalOpen } = useModalStore();
    const { listFormaPago, startLoadingFormasPago } = useFormaPagoStore();
    const { listTipoGarantia, startLoandingTipoGarantia } = useTipoGarantiaStore();
    const { listTipoSegmentacion, startLoadingTipoSegmentacion } = useTipoSegmentacionStore();
    const { listTipoSolicitud, startLoadingTipoSolicitud } = useTipoSolicitudStore();
    const { activeSolicitudCredito, mensajeSolicitudCredito, startSavingSolicitudCredito, startLoadingSolicitudes, listSolicitudCredito } = useSolicitudStore();

    const formValidations = {
        // Add your form validations here
    };

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
        setFormState
    } = useForm(formData, formValidations);

    const [errorMessage, setErrorMessage] = React.useState('');

    const handleCancel = () => {
        closeModal();
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isFormValid) {
            await startSavingSolicitudCredito(formState);
            await startLoadingSolicitudes()
            const newSolicitud = listSolicitudCredito[listSolicitudCredito.length - 1];
            console.log(newSolicitud)
        } else {
            setErrorMessage('Por favor, complete todos los campos requeridos correctamente.');
        }
    };


    useEffect(() => {
        if (isModalOpen) {
            startLoadingFormasPago();
            startLoadingTipoSegmentacion();
            startLoadingTipoSolicitud();
            startLoandingTipoGarantia();
        }
        if (activeSolicitudCredito !== null) {
            setFormState({ ...activeSolicitudCredito[0] });
        }
    }, [isModalOpen, activeSolicitudCredito]);

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
                    color='primary.contrastText'
                    variant="h6"
                    component="h2"
                >
                    DATOS DEL CRÉDITO
                </Typography>
            </Grid>

            <Box sx={{ padding: '1.5rem' }}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={3}>
                        {errorMessage && (
                            <Grid item xs={12}>
                                <Alert severity="error">{errorMessage}</Alert>
                            </Grid>
                        )}

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="oficina-select-label">Oficina</InputLabel>
                                <Select
                                    labelId="oficina-select-label"
                                    id="oficina-select"
                                    value={lugar_solicitud}
                                    label="Oficina"
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'lugar_solicitud' } })}
                                >
                                    {listaLugares.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.detalle}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipo-solicitud-select-label">Tipo de solicitud</InputLabel>
                                <Select
                                    labelId="tipo-solicitud-select-label"
                                    id="tipo-solicitud-select"
                                    value={tipo_solicitud}
                                    label="Tipo de solicitud"
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_solicitud' } })}
                                >
                                    {listTipoSolicitud.map((option: any) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.descripcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="forma-pago-select-label">Forma de pago</InputLabel>
                                <Select
                                    labelId="forma-pago-select-label"
                                    id="forma-pago-select"
                                    value={forma_pago}
                                    label="Forma de pago"
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'forma_pago' } })}
                                >
                                    {listFormaPago.map((option: any) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.descripcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipo-segmentacion-select-label">Tipo de segmentación</InputLabel>
                                <Select
                                    labelId="tipo-segmentacion-select-label"
                                    id="tipo-segmentacion-select"
                                    value={tipo_segmentacion}
                                    label="Tipo de segmentación"
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_segmentacion' } })}
                                >
                                    {listTipoSegmentacion.map((option: any) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.descripcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tipo-garantia-select-label">Tipo de garantía</InputLabel>
                                <Select
                                    labelId="tipo-garantia-select-label"
                                    id="tipo-garantia-select"
                                    value={tipo_garantia}
                                    label="Tipo de garantía"
                                    onChange={(e) => onInputChange({ target: { value: e.target.value, name: 'tipo_garantia' } })}
                                >
                                    {listTipoGarantia.map((option: any) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.descripcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                label="Tasa de interés"
                                size="small"
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                                value={tasa_interes}
                                name='tasa_interes'
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                label="Monto"
                                size="small"
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                value={monto}
                                name='monto'
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                label="Plazo"
                                size="small"
                                type="number"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Meses</InputAdornment>,
                                }}
                                value={plazo}
                                name='plazo'
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                label="Cuota estimada"
                                size="small"
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                value={cuota}
                                name='cuota'
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                fullWidth
                                label="Destino del crédito"
                                size="small"
                                value={destino_credito}
                                name='destino_credito'
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de solicitud"
                                    value={dayjs(fecha_solicitud)}
                                    onChange={(date) => onInputChange({ target: { value: dayjs(date).format('YYYY-MM-DD'), name: 'fecha_solicitud' } })}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Stack direction='row' spacing={2} justifyContent='flex-end'>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Guardar solicitud
                            </Button>

                        </Stack>
                    </Grid>
                </form>
            </Box>
            <TabPanel />
        </BaseModal>
    );
};