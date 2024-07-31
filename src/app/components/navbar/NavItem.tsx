import React, { forwardRef, useEffect, useState } from "react";
import { Avatar, Box, Chip, ListItemIcon, ListItemText, Collapse, ListItemButton, Typography } from "@mui/material";
// import { useTheme } from '@emotion/react';
import { useTheme, Theme as MuiTheme } from '@mui/material/styles';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material/styles';

interface NavItemProps {
    drawerWidth?: number;
    item: {
        id: string;
        url: string;
        title: string;
        icon?: React.ElementType;
        external?: boolean;
        type?: string;
        chip?: {
            color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
            variant: "filled" | "outlined";
            size: "small" | "medium";
            label: string;
            avatar?: string;
        };
        children?: { child: NavItemProps['item'] }[];
    };
    level: number;
}

export const NavItem: React.FC<NavItemProps> = ({ drawerWidth = 240, item, level }) => {
    const theme = useTheme<MuiTheme>();
    const [open, setOpen] = useState(false);
    const currentPath = usePathname();

    const isSelected = currentPath === item.url;
    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            // selectItem(item.id)
        }
    }, [item.id]);

    let listItemProps: {
        component: React.ForwardRefExoticComponent<any> | string;
        href?: string;
        target?: string;
    } = {
        component: forwardRef((props, ref) => (
            <Link
                href={item.url} 
                style={{ textDecoration: 'none' }}
            >
                <ListItemButton
                    ref={ref} {...props}
                />
            </Link>
        ))
    };

    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: '_blank' };
    }

    const IconComponent = item.icon;
    const itemIcon = IconComponent ? <IconComponent style={{ fontSize: drawerWidth ? '1rem' : '1.25rem' }} /> : null;

    const listItemButtonSx: SxProps<Theme> = {
        zIndex: 1201,
        pl: isSelected ? `${level * 8}px` : 1.5,
        py: !isSelected && level === 1 ? 0.5 : 0.75,
        ...(isSelected && {
            '&:hover': {
                bgcolor: 'primary.lighter'
            },
            '&.Mui-selected': {
                bgcolor: 'primary.lighter',
                borderRight: `2px solid ${theme.palette.primary.main}`,
                color: iconSelectedColor,
                '&:hover': {
                    color: iconSelectedColor,
                    bgcolor: 'primary.lighter'
                }
            }
        }),
        ...(!isSelected && {
            '&:hover': {
                bgcolor: 'transparent'
            },
            '&.Mui-selected': {
                '&:hover': {
                    bgcolor: 'transparent'
                },
                bgcolor: 'transparent'
            }
        })
    };

    const listItemIconSx: SxProps<Theme> = {
        minWidth: 28,
        color: isSelected ? iconSelectedColor : textColor,
        ...(!isSelected && {
            borderRadius: 1.5,
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
                bgcolor: 'secondary.lighter'
            }
        }),
    };

    return (
        <>
            <ListItemButton
                {...listItemProps}
                onClick={item.type === 'collapse' ? handleClick : () => console.log(item.id)}
                selected={isSelected}
                sx={listItemButtonSx}
            >
                {itemIcon && (
                    <ListItemIcon
                        sx={listItemIconSx}
                    >
                        {itemIcon}
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={
                        <Typography
                            variant="body2"
                            sx={{
                                color: isSelected ? iconSelectedColor : textColor,
                                fontSize: '0.85rem',
                            }}
                        >
                            {item.title}
                        </Typography>
                    }
                />
                {item.type === 'collapse' && (open ? <ExpandLess /> : <ExpandMore />)}
                {(isSelected || (!isSelected && level !== 1)) && item.chip && (
                    <Chip
                        color={item.chip.color}
                        variant={item.chip.variant}
                        size={item.chip.size}
                        label={item.chip.label}
                        avatar={item.chip.avatar ? <Avatar>{item.chip.avatar}</Avatar> : undefined}
                    />
                )}
            </ListItemButton>
            {item.type === 'collapse' && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box pl={4}>
                        {item.children?.map(({ child }) => (
                            <NavItem key={child.id} item={child} level={level + 1} />
                        ))}
                    </Box>
                </Collapse>
            )}
        </>
    );
};

export default NavItem;