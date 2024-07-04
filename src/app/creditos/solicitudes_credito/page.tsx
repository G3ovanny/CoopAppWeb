'use client'
import { Breadcrumbs } from '@/app/components/breadcrumbs/Breadcrumbs'
import { BotonesBreadcrumbs } from './components/botonesBreadcrumbs/BotonesBreadcrumbs'
import { Tabla } from './components/tablas/Tabla'
import { Alert, Grid, Toolbar } from '@mui/material'
import { SolicitudModal } from './components/modal/SolicitudModal'

export default function Creditos() {
  const title = 'Solicitudes de crédito'
  const mensaje = ''
  return (
    <>
      <Breadcrumbs title={title} botones={<BotonesBreadcrumbs />} />
      <Toolbar>
        <Grid
          className='animate__animated animate__backInRight'
          item
          sx={{ flex: ' 1 1 100%' }}
          display={!!mensaje ? '' : 'none'}
        >
          <Alert severity='success' >{mensaje}</Alert>
        </Grid>
      </Toolbar>
      <Tabla />
      <SolicitudModal />
    </>
  )
}
