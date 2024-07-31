'use client'
import React, { useEffect } from 'react'
import { Box, Paper, Table, TableContainer } from '@mui/material'
import { TableHead } from './TableHead';
import { TableIndex } from './TableIndex';

// interface Props {
//     title?: string;
//     objetos?: object[];
//     objactive?: object[];
//     setObjecActive?: (selected: string[]) => void;
//     startLoadingObjects?: () => void;
//     tableCells?: React.ReactNode;
//     indexCells?: object[];
//     tableButtons?: React.ReactElement;
// }

export const BasicTable = ({ title, objetos, objactive, setObjecActive, startLoadingObjects, tableCells, indexCells, tableButtons }: any) => {

    const filters = {
        'filtro1': '',
        'filtro2': ''
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked && objetos) {
            const newSelected = objetos.map((n: any) => n);
            setObjecActive && setObjecActive(newSelected);
            return;
        }
        setObjecActive && setObjecActive([]);
    };


    const onSelected = (event: React.MouseEvent<HTMLElement>, element: string) => {
        if (!objactive) return;

        const selectedIndex = objactive.indexOf(element);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(objactive, element);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(objactive.slice(1));
        } else if (selectedIndex === objactive.length - 1) {
            newSelected = newSelected.concat(objactive.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                objactive.slice(0, selectedIndex),
                objactive.slice(selectedIndex + 1)
            );
        }

        setObjecActive && setObjecActive(newSelected);
    };

    //const isSelected = (id) => {objactive ? objactive.indexOf(id) !== -1};

    useEffect(() => {
        if (startLoadingObjects) {
            startLoadingObjects;
        }
    }, []);

    return (
        <div>
            <Paper
                component='div'
            >
                <TableHead
                    title={title}
                    numSelected={objactive ? objactive.length : 0}
                    //filters={filters}
                    tableButtons={tableButtons}
                />
                <TableContainer
                    sx={{ maxHeight: 440 }}
                    component="div"
                >
                    <Table
                        aria-labelledby='tableTittle'
                        component="div"
                    >
                        <TableIndex
                            onSelectAllClick={handleSelectAllClick}
                            numSelected={objactive ? objactive.length : 0}
                            rowCount={objetos ? objetos.length : 0}
                            indexCells={indexCells}
                        />
                        {tableCells}
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}
