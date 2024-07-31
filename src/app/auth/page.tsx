'use client'
import React, { useEffect } from 'react'
import { AuthLayouth } from './layout/AuthLayout'
import { Alert, Box, Button, CircularProgress, Grid, Modal, TextField, Typography } from '@mui/material'
import { useForm } from '../hooks'
import { useAuthStore } from '../hooks/auth/useAuthStore'
import { useRouter } from 'next/navigation'

const loginFormFields = {
    username: '',
    password: ''
}

export default function Auth() {
    const { username, password, onInputChange } = useForm(loginFormFields)
    const { startLogin, errorMessage, status } = useAuthStore();

    const router = useRouter()

    const onSubmit = async (event: any) => {
        event.preventDefault();
        await startLogin({ username, password });
    }

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/creditos/inicio/panel-control')
        }
    }, [status, router])

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
                            value={username}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }} >
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='Contraseña'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
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
                                // href='creditos/dashboard'
                                type='submit'
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
            <Modal
                open={status === 'checking'}
                aria-labelledby="loading-modal"
                aria-describedby="loading-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 200,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <CircularProgress />
                    <Typography id="loading-modal-description" sx={{ mt: 2 }}>
                        Cargando...
                    </Typography>
                </Box>
            </Modal>
        </AuthLayouth>
    )
}
