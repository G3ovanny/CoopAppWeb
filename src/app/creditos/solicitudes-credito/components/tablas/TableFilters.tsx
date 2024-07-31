import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


const filterOptions = [
    {
        id: 'cedulaTrab',
        label: 'Cédula',
    },
    {
        id: 'nombresTrab',
        label: 'Nombres',
    },
    {
        id: 'tipoPermiso',
        label: 'Tipo de permiso',
    },
]

export const TableFilters = (props: any) => {
    const [valorBuscar, setValorBuscar] = useState('');
    const [columnaBuscar, setColumnaBuscar] = useState('cedulaTrab');
    const [fechaRegistroBuscar, setFechaRegistroBuscar] = useState(null);
    const [fechaDesdeBuscar, setFechaDesdeBuscar] = useState(null);
    const [fechaHastaBuscar, setFechaHastaBuscar] = useState(null);

    const filtrar = () => {
        props.onBuscar(
            valorBuscar,
            columnaBuscar,
            fechaRegistroBuscar,
            fechaDesdeBuscar,
            fechaHastaBuscar
        )
    }
    const limpiarFiltros = () => {
        setValorBuscar('')
        setColumnaBuscar('cedulaTrab')
        setFechaRegistroBuscar(null)
        setFechaDesdeBuscar(null)
        setFechaHastaBuscar(null)
        filtrar()
    }
    useEffect(() => {
        props.onBuscar(
            valorBuscar,
            columnaBuscar,
            fechaRegistroBuscar,
            fechaDesdeBuscar,
            fechaHastaBuscar
        );
    }, [valorBuscar, columnaBuscar, fechaRegistroBuscar, fechaDesdeBuscar, fechaHastaBuscar]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                    <InputLabel id="filter-label">Filtrar por:</InputLabel>
                    <Select
                        label="FIltrar por:"
                        labelId="filter-label"
                        value={columnaBuscar}
                        onChange={(e) => setColumnaBuscar(e.target.value)}
                    >
                        {filterOptions.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    label="Buscar..."
                    fullWidth
                    size="small"
                    value={valorBuscar}
                    onChange={(e) => setValorBuscar(e.target.value)}
                    InputProps={{
                        startAdornment: <SearchIcon />,
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        slotProps={{ textField: { size: 'small' } }}
                        label="Fecha de registro"
                        value={fechaRegistroBuscar}
                    // onChange={(newValue) => setFechaRegistroBuscar(dayjs(newValue))}
                    />
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        slotProps={{ textField: { size: 'small' } }}
                        label="Desde"
                        value={fechaDesdeBuscar}
                    // onChange={(newValue) => setFechaDesdeBuscar(dayjs(newValue))}
                    />
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        slotProps={{ textField: { size: 'small' } }}
                        label="Hasta"
                        value={fechaHastaBuscar}
                    // onChange={(newValue) => setFechaHastaBuscar(dayjs(newValue))}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item
            //xs={3} sm={6} md={2}
            >
                <Button variant="contained" onClick={filtrar}>
                    Buscar
                </Button>
            </Grid>
            <Grid item
            //xs={3} sm={6} md={2}
            >
                <Button variant="contained" onClick={limpiarFiltros}>
                    Limpiar
                </Button>
            </Grid>
        </Grid>

    )
}