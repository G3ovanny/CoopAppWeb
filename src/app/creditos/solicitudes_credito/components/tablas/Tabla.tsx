import { BasicTable } from '@/app/components/tablas/tabla/BasicTable'
import React from 'react'
import { indexCells } from './tableIndex'
import { TableCells } from './TableCells'
import { TableButtons } from './TableButtons'


const objects = [
    {
        id: 1,
        cento_costo:'DIRECCION DE TIC'
    },
    {
        id: 2,
        cento_costo:'DIRECCION DE VINCULACION'
    },

]
const objectactive = [
    {
        id: 1
    },
]
export const Tabla = () => {
    const title = 'Lista de Infimas Cuantia'

    return (
        <BasicTable
            title={title}
            //objetos={columns}
            objetos={objects}
            objactive={ objectactive }
            //setObjecActive={ }
            //startLoadingObjects={ }
            tableCells={<TableCells />}
            //indexCells={rows}
            indexCells={indexCells}
            tableButtons={<TableButtons />}
            // initialState={{
            //     pagination: {
            //         paginationModel: { page: 0, pageSize: 9 },
            //     },
            // }}
            // pageSizeOptions={[9, 10]}
        />
    )
}
