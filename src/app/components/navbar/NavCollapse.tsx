import PropTypes from 'prop-types';
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { NavItem } from './NavItem';
import { useTheme } from '@emotion/react';

export const NavCollapse = ({ drawerWidth = 240, item, level }: any) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: drawerWidth ? '1rem' : '1.25rem' }} /> : false;

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    pl: level * 3,
                }}>
                <ListItemIcon
                    sx={{
                        minWidth: 28,
                    }}
                >
                    {itemIcon}
                    {/* <item.icon /> */}
                </ListItemIcon>
                <ListItemText primary={
                    <Typography
                        variant="body2"  // Changed from "h7" to "body2"
                        sx={{
                            fontSize: '0.85rem',  // Adjust this value as needed
                        }}
                    >
                        {item.title}
                    </Typography>
                } />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse

                in={open} timeout="auto" unmountOnExit
            >
                <List
                    sx={{
                        ml: 8,
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: -8, // Adjust the position to match the desired style
                            width: '1px',
                            backgroundColor: theme.palette.primary.main,
                        }

                    }}
                    component="div">
                    {item.children.map((child: any) => (
                        <NavItem key={child.id} item={child} level={level + 1} />
                    ))}
                </List>
            </Collapse>
        </>
    );
};

NavCollapse.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};