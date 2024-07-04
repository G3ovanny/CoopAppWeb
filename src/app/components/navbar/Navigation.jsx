import { Box, Divider, Toolbar, Typography } from '@mui/material';
import { NavGroup } from './NavGroup';
// import { } from '../menu-items'


export const Navigation = (menuItems) => {
  
  //const usuario = localStorage.getItem('username')

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
    < Box className='animate__animated animate__fadeIn'>
      <Toolbar >
        <Typography
          variant='h6' noWrap component='div'>
            Usuario
          {/* {usuario} */}
        </Typography>
      </Toolbar>
      <Divider />
      {navGroups}
    </Box >
  )
}
