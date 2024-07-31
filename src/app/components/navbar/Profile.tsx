import { Avatar, Divider, Fade, IconButton, ListItemIcon, Menu, MenuItem, Stack } from '@mui/material'
import React, { useState } from 'react'
import { AccountCircle, Logout, PersonAdd, Settings, ManageAccounts } from '@mui/icons-material';
import { useAuthStore } from '@/app/hooks/auth/useAuthStore';
import { useRouter } from 'next/navigation'

export const Profile: React.FC = () => {
    const { startLogout } = useAuthStore();
    const [auth, setAuth] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPerfil = () => {
        console.log('redireccionar al perfil')
    }

    const handleLogout = () => {
        startLogout();
        router.push('/');
    }

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={openPerfil}>
                    <ListItemIcon>
                        <ManageAccounts fontSize="small" />
                    </ListItemIcon>
                    Mi perfil
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Salir
                </MenuItem>
            </Menu>
        </div>
    )
}