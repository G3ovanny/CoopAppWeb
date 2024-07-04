import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
// import {
//   Capacitaciones,
//   ContactoEmergencia,
//   DireccionPermanente,
//   DominioPaqueteInformatico,
//   EstudiosActuales,
//   ExperienciaLaboral,
//   FormacionAcademica,
//   HistorialIess,
//   InformacionBancaria,
//   InformacionConyuge,
//   InformacionFamiliares,
//   InformacionHijos,
//   InformacionPersonal,
//   MencionesHonorificas,
//   OtrosIdiomas,
//   OtrosTrabajosInstitucionales,
//   Publicaciones
// } from '../fichaHojaVida';

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const TabPanel = ({ selectedTab, onFormSubmit }: any) => {
  console.log(selectedTab)
  const [value, setValue] = React.useState(0);
  const handleChange = ({ event, newValue }: any) => {
    setValue(newValue);
  };
  return (
    <Box
      component='div'
      sx={{ width: '100%' }}>
      <Box
        component='div'
        sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          component='div'
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="basic tabs example">

          <Tab component='div' label='DATOS DEL CRÉDITO' {...a11yProps(0)} />
          <Tab component='div' label='DATOS PERSONALES' {...a11yProps(1)} />
          <Tab component='div' label='DATOS DEL DOMICILIO' {...a11yProps(2)} />
          <Tab component='div' label='DATOS DEL CÓNYUGE Y/O CONVIVIENTE' {...a11yProps(3)} />
          <Tab component='div' label='ACTIVIDAD ECONÓMICA' {...a11yProps(4)} />

        </Tabs>
        {/* {selectedTab === 0 && <InformacionPersonal onFormSubmit={onFormSubmit} />}
        {selectedTab === 1 && <InformacionBancaria onFormSubmit={onFormSubmit} />}
        {selectedTab === 2 && <DireccionPermanente onFormSubmit={onFormSubmit} />}
        {selectedTab === 3 && <InformacionConyuge onFormSubmit={onFormSubmit} />}
        {selectedTab === 4 && <InformacionHijos onFormSubmit={onFormSubmit} />}
        {selectedTab === 5 && <InformacionFamiliares onFormSubmit={onFormSubmit} />}
        {selectedTab === 6 && <HistorialIess onFormSubmit={onFormSubmit} />}
        {selectedTab === 7 && <ContactoEmergencia onFormSubmit={onFormSubmit} />}
        {selectedTab === 8 && <FormacionAcademica onFormSubmit={onFormSubmit} />}
        {selectedTab === 9 && <Capacitaciones onFormSubmit={onFormSubmit} />}
        {selectedTab === 10 && <EstudiosActuales onFormSubmit={onFormSubmit} />}
        {selectedTab === 11 && <OtrosTrabajosInstitucionales onFormSubmit={onFormSubmit} />}
        {selectedTab === 12 && <Publicaciones onFormSubmit={onFormSubmit} />}
        {selectedTab === 13 && <MencionesHonorificas onFormSubmit={onFormSubmit} />}
        {selectedTab === 14 && <OtrosIdiomas onFormSubmit={onFormSubmit} />}
        {selectedTab === 15 && <DominioPaqueteInformatico onFormSubmit={onFormSubmit} />}
        {selectedTab === 16 && <ExperienciaLaboral onFormSubmit={onFormSubmit} />} */}
      </Box>
    </Box>
  )
}