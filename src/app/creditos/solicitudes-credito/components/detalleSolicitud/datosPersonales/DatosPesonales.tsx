import { Autocomplete, Box, Grid, TextField } from '@mui/material'
import React from 'react'

export const DatosPesonales = () => {
    return (
        <Box sx={{ padding: '1.5rem' }}>
            <form action="">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        {/* <Autocomplete
                         size='small'
                        //  inputValue={inputValue || ''}
                        //  onInputChange={(event, newInputValue) => { setInputValue(newInputValue); }}
                        //  onChange={(e, valor) => {
                        //    if (valor && valor.id) {
                        //      onInputChange({ target: { value: valor.id, name: 'id_trabajador' } })
                        //    }
                        //  }
                        //  }
                         id="controllable-states-demo"
                        //  options={}
                        //  getOptionLabel={(options) => options.numero_identificacion}
                        //  renderInput={(params) => <TextField {...params} label="Seleccione la cédula del servidor" />}
                      
                         /> */}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            fullWidth
                            label="Apellido paterno"
                            size="small"
                            type="text"
                            // InputProps={{
                            //     startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            // }}
                            // value={tasa_interes}
                            name='apellido_paterno'
                        // onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            fullWidth
                            label="Apellido materno"
                            size="small"
                            type="text"
                            // InputProps={{
                            //     startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            // }}
                            // value={tasa_interes}
                            name='apellido_materno'
                        // onChange={onInputChange}
                        />
                    </Grid>

                </Grid>
            </form>
        </Box>
    )
}
