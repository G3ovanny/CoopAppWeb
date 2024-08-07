import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

interface IndexCell {
    id: string;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
}

interface Props {
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    numSelected: number;
    rowCount: number;
    indexCells: IndexCell[];
}

export const TableIndex = ({ onSelectAllClick, numSelected, rowCount, indexCells }: Props) => {

    return (
        <TableHead
            sx={{
                backgroundColor: 'secondary.main'
            }}
            component="div"
        >
            <TableRow
                component="div"
            >
                <TableCell
                    padding='checkbox'
                    component="div"
                >
                    <Checkbox
                        sx={{
                            color: 'secondary.contrastText'
                        }}
                        component='div'

                        //indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {
                    indexCells.map((indexCell) => (
                        <TableCell
                            sx={{
                                color: 'secondary.contrastText'
                            }}
                            key={indexCell.id}
                            align={indexCell.numeric ? 'right' : 'left'}
                            padding={indexCell.disablePadding ? 'none' : 'normal'}
                            component='div'
                        >
                            {indexCell.label}
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}
