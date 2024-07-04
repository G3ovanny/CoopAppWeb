'use client'
import React from 'react'
import { AuthLayouth } from './layout/AuthLayout'
import { Alert, Button, Grid, TextField, Typography } from '@mui/material'

export default function Auth() {
    const onSubmit = () => {
        console.log('Iniciando sesion');
    }
    const errorMessage = "iniciando sesion"
    return (
        <AuthLayouth title={'Inicio de sesión'} >
            <form action="">
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Usuario'
                            type='text'
                            placeholder='usuario'
                            fullWidth
                            name='username'
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }} >
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='Contraseña'
                            fullWidth
                            name='password'
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
                        <Grid
                            item
                            xs={12}
                            //display={true}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error' >{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                                href='creditos/dashboard'
                                //type='submit'
                                variant='contained'
                                fullWidth

                                onClick={onSubmit}
                            >
                                Iniciar Sesión
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>

            </form>
        </AuthLayouth>
    )
}
