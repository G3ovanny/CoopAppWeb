import { Box, Divider, Toolbar, Typography, useTheme } from '@mui/material';
import { NavGroup } from './NavGroup';

export const Navigation = (menuItems) => {
    const theme = useTheme();

    const navGroups = menuItems.menuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });

    return (
        <>
            <Box
                sx={{
                    position: 'sticky',
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                }}

            >
                <Toolbar>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                    >
                        Usuario
                    </Typography>
                </Toolbar>
                <Divider />
            </Box>
            <Box  sx={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }} >
                {navGroups}
            </Box>
        </ >
    );
};