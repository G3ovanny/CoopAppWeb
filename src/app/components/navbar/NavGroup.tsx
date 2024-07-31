import PropTypes from 'prop-types';
import { NavItem } from './NavItem'
import { Box, Divider, List, Toolbar, Typography } from '@mui/material';
import { NavCollapse } from './NavCollapse';

export const NavGroup = ({ item }: any) => {
  const navCollapse = item.children?.map((menuItem: any) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse key={menuItem.id} item={menuItem} level={1} />
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <Box
    >
      <List
        subheader={
          item.title && (
            <Box sx={{ pl: 2, mb: 1, mt: 2 }}>
              <Typography variant="subtitle2" color="secondary">
                {item.title}
              </Typography>
            </Box>
          )
        }
        sx={{ mb: 1.5, py: 0, zIndex: 0 }}
      >
        {navCollapse}
      </List>
    </Box>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};
