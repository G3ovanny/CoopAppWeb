'use client'
import React from 'react'
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'

const infimas = [
  {
    id: 1,
    num_solicitud: '001',
    fecha_solicitud: '',
    tipo_solicitud: 'BIEN',
    cento_costo: 'DIRECCION DE TIC'
  },
  {
    id: 2,
    num_solicitud: '002',
    fecha_solicitud: '',
    tipo_solicitud: 'SERVICIO',
    cento_costo: 'DIRECCION DE VINCULACION'
  },

]

const activeTrab = [
  {
    id: 1,
    num_solicitud: '001',
    fecha_solicitud: '',
    tipo_solicitud: 'BIEN',
    cento_costo: 'DIRECCION DE TIC'
  }
]

export const TableCells = () => {

  //const { infimas, activeTrab, setActiveTrab } = useTrabStore();

  const onSelected = (event, infima) => {

    const selectedIndex = activeTrab.indexOf(infima)

    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(activeTrab, infima)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(activeTrab.slice(1));
    } else if (selectedIndex === activeTrab.length - 1) {
      newSelected = newSelected.concat(activeTrab.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        activeTrab.slice(0, selectedIndex),
        activeTrab.slice(selectedIndex + 1)
      );
    }
    setActiveTrab(newSelected)
  }

  const isSelected = (id) => activeTrab.indexOf(id) !== -1

  return (
    <TableBody
      component="div"
    >
      {infimas.map((infima) => {
        const isItemSelected = isSelected(infima);
        return (
          <TableRow
            component="div"
            hover
            onClick={event => onSelected(event, infima)}
            role='checkbox'
            tabIndex={-1}
            key={infima.id}
            selected={isItemSelected}
          >
            <TableCell
              padding='checkbox'
              component="div"
            >
              <Checkbox
                color='primary'
                checked={isItemSelected}
              />
            </TableCell>
            <TableCell
              component='div'
              // scope='patient'
              // padding='none'
            >
              {infima.num_solicitud}
            </TableCell>
            <TableCell component='div' >{infima.cento_costo}</TableCell>
            {/*<TableCell component='div' >{infima.celular}</TableCell>*/}
            <TableCell component='div' >{infima.fecha_solicitud}</TableCell>
            <TableCell component='div' >{infima.tipo_solicitud}</TableCell>
            {/* <TableCell component='div' >{infima.dias_vacaciones}</TableCell> */}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
