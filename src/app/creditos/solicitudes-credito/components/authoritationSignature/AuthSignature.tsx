import { Close, Search } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Modal, Toolbar, Tooltip, Typography, FormControl, FormLabel, FormHelperText, InputLabel, Select, MenuItem, TextField, InputAdornment, Grid } from '@mui/material';
import React, { useState } from 'react'
import { FirmaSocio } from '../detalleSolicitud/firmaSocio/FirmaSocio';
import { useMediaQuery, useTheme } from '@mui/material';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height: '90vh',
    bgcolor: '#ffffff',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    p: 2,
};

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '60vw',
//     height: '60vh',
//     // width: 700,
//     bgcolor: '#ffffff',
//     boxShadow: 24,
//     p: 2,
// };

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Open Child Modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Grid sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Grid>
            </Modal>
        </React.Fragment>
    );
}



type SearchType = 'name' | 'email' | 'id';

export const AuthSignature = () => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchType, setSearchType] = useState<SearchType>('name');

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSearch = () => {
        console.log(`Buscando ${searchTerm} por ${searchType}`);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="primary">
                Autorización
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Grid
                    sx={{
                        ...style,
                        flexDirection: isSmallScreen ? 'column' : 'row', // Cambia la dirección del layout
                        width: isSmallScreen ? '90vw' : '60vw', // Ajusta el ancho del modal
                        height: isSmallScreen ? 'auto' : '90vh', // Ajusta la altura en pantallas pequeñas
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" flex={1}>
                            Autorización
                        </Typography>
                        <Tooltip title="Cerrar" color="secondary">
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                    <Divider />
                    <Grid container
                        sx={{
                            flexDirection: isSmallScreen ? 'column' : 'row', // Cambia la disposición del contenido
                            paddingTop: 5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: isSmallScreen ? 2 : 0, // Ajusta el espaciado en pantallas pequeñas
                        }}
                    >
                        <FormControl fullWidth variant="outlined">
                            <Grid display="flex" alignItems="center" width="100%">
                                <TextField
                                    variant="outlined"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    label="Buscar por..."
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Select
                                                    size="small"
                                                    value={searchType}
                                                    onChange={(e) => setSearchType(e.target.value)}
                                                    displayEmpty
                                                    variant="outlined"
                                                    style={{ marginRight: '8px' }}
                                                >
                                                    <MenuItem value="name">Nombre</MenuItem>
                                                    <MenuItem value="email">Email</MenuItem>
                                                    <MenuItem value="id">ID</MenuItem>
                                                </Select>
                                                <IconButton
                                                    onClick={handleSearch}
                                                    color="primary"
                                                >
                                                    <Search />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </FormControl>
                        <FirmaSocio />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
};