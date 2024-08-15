import React, { useEffect } from 'react'
import { Box, Grid, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { FirmaSocio } from '../detalleSolicitud/firmaSocio/FirmaSocio';
import { BaseTab } from '@/app/components/tabs/BaseTab';
import { DatosPesonales } from '../detalleSolicitud/datosPersonales/DatosPesonales';
import { DatosDomicilio } from '../detalleSolicitud/datosDomicilio/DatosDomicilio';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const TabPanel = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [alignment, setAlignment] = React.useState('solicitante'); //? PERMITE CAMBIAR EL FORMULARIO DEL SOLICITANTE O DEL GARANTE


  const handleChangeD = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);

  };
  useEffect(() => {
    console.log(alignment)
  }, [alignment])

  return (
    <Box sx={{ width: '100%' }}>
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
          DETALLE DEL CRÉDITO
        </Typography>
      </Grid>
      <Box
        sx={{
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <ToggleButtonGroup
          size='small'
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChangeD}
          aria-label="Platform"
        >
          <ToggleButton value="solicitante">SOLICITANTE</ToggleButton>
          <ToggleButton value="garante">GARANTE</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Firma" {...a11yProps(0)} />
          <Tab label="DATOS PERSONALES" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <BaseTab value={value} index={0}>
        <FirmaSocio />
      </BaseTab>
      <BaseTab value={value} index={1}>
        <DatosPesonales />
      </BaseTab>
      <BaseTab value={value} index={2}>
        <DatosDomicilio />
      </BaseTab>
    </Box>

  )
}