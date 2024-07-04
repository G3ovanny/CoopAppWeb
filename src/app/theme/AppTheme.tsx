'use client'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
// import { naviTheme } from './naviTheme'
// import { darkTheme } from './darktheme'
import { grayTheme } from './grayTheme'
import { greenTheme } from './greenTheme'

export const AppTheme = ({ children }:any) => {
    return (
        <ThemeProvider theme={greenTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
