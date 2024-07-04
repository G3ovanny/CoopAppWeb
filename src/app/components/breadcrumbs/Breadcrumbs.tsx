import { Box, Divider, Toolbar, Typography } from '@mui/material'
import React from 'react'


interface Props {
    title: string;
    botones: React.ReactElement;
}

export const Breadcrumbs = ({ title, botones }: Props) => {
    return (
        <Box>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography
                    sx={{ flex: ' 1 1 100%' }}
                    variant='h6'
                    id='tableTitle'
                    component='div'
                >
                    {title}
                </Typography>
                {botones}
            </Toolbar>
            <Divider />
        </Box>
    )
}
