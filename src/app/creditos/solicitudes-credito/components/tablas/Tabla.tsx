import { BasicTable } from '@/app/components/tablas/tabla/BasicTable'
import React, { useEffect, useState } from 'react'
import { indexCells } from './tableIndex'
import { TableCells } from './TableCells'
import { TableButtons } from './TableButtons'
import { useSolicitudStore } from '@/app/hooks/creditos/useSolicitudStore'
import { TableFilters } from './TableFilters'


export const Tabla = () => {
    const title = 'Solicitudes de creditos'
    const {
        listSolicitudCredito,
        activeSolicitudCredito,
        isLoadingSolicitudesCredito,
        startLoadingSolicitudes,
        setActiveSolicitudCredito } = useSolicitudStore();


    const [resultadoBusqueda, setResultadoBusqueda] = useState(null);
    const page = 0
    const pageSize = 10
    const rowsPerPage = 0
    return (
        <div
            style={{ height: 500, width: '100%' }}
        >
            <BasicTable
                title={title}
                objetos={listSolicitudCredito}
                objactive={activeSolicitudCredito}
                setObjecActive={setActiveSolicitudCredito}
                isLoadingObjects={isLoadingSolicitudesCredito}
                startLoadingObjects={startLoadingSolicitudes()}
                tableCells={<TableCells
                    list={resultadoBusqueda}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />}
                indexCells={indexCells}
                tableButtons={<TableButtons />}
                // filters={<TableFilters onBuscar={handleBuscar} />}
                initialState={{
                    pagination: {
                        paginationModel: { page, pageSize },
                    },
                }}
                pageSizeOptions={[10, 25, 100]}
            />
        </div>
    )
}
