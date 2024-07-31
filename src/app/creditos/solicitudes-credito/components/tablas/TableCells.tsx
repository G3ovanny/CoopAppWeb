'use client'
import React from 'react'
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import { useSolicitudStore } from '@/app/hooks/creditos/useSolicitudStore'

interface TableCellProps {
  listSolicitud: any[]; // Ajusta el tipo según la estructura de tus datos
  isSelected: (solicitud: any) => boolean; // Ajusta el tipo según la función de selección implementada
  onSelected: (event: React.MouseEvent<HTMLDivElement>, solicitud: any) => void; // Ajusta el tipo según la función de selección implementada
}

export const TableCells = ({ list, page, rowPerPage }: any) => {

  const { activeSolicitud, listSolicitud, setActiveSolicitud } = useSolicitudStore()

  const onSelected = (solicitud: any) => {

    const selectedIndex = activeSolicitud.indexOf(solicitud)

    let newSelected: any = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(activeSolicitud, solicitud)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(activeSolicitud.slice(1));
    } else if (selectedIndex === activeSolicitud.length - 1) {
      newSelected = newSelected.concat(activeSolicitud.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        activeSolicitud.slice(0, selectedIndex),
        activeSolicitud.slice(selectedIndex + 1)
      );
    }
    setActiveSolicitud(newSelected)
  }

  const isSelected = (id: any) => activeSolicitud.indexOf(id) !== -1

  let lista = null

  if (!list) {
    lista = listSolicitud
  } else {
    lista = list
  }

  return (
    <TableBody
      component="div"
    >
      {listSolicitud.slice(page
        // * rowsPerPage, page * rowsPerPage + rowsPerPage
      )
        .map((solicitud: any) => {
          const isItemSelected = isSelected(solicitud);
          return (
            <TableRow
              component="div"
              hover
              onClick={() => onSelected(solicitud)}
              role='checkbox'
              tabIndex={-1}
              key={solicitud.id}
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
                scope='patient'
                padding='none'
              >
                {solicitud.id}
              </TableCell>
              <TableCell component='div' >{solicitud.monto}</TableCell>
              <TableCell component='div' >{solicitud.plazo}</TableCell>
              <TableCell component='div' >{solicitud.fecha_solicitud}</TableCell>
              <TableCell component='div' >{solicitud.tipo_solicitud}</TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}
