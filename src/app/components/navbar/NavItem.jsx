import PropTypes from 'prop-types';
import { Avatar, Box, Chip, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Collapse } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useTheme } from '@emotion/react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export const NavItem = ({ drawerWidth = 240, item, level }) => {
    const theme = useTheme();
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

    let listItemProps = {
        component: forwardRef((props, ref) => (
            <Link
                href={item.url} style={{ textDecoration: 'none' }}
            >
                <ListItemButton ref={ref} {...props} />
            </Link>
        ))
    };

    if (item?.external) {
        listItemProps = { component: 'Link', href: item.url, target: '_blank' };
    }

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: drawerWidth ? '1rem' : '1.25rem' }} /> : false;

    return (
        <>
            <ListItemButton
                {...listItemProps}
                onClick={item.type === 'collapse' ? handleClick : () => console.log(item.id)}
                selected={isSelected}
                sx={{
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
                }}
            >
                {itemIcon && (
                    <ListItemIcon
                        sx={{
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
                            ...(!isSelected &&
                                isSelected && {
                                bgcolor: 'primary.lighter',
                                '&:hover': {
                                    bgcolor: 'primary.lighter'
                                }
                            })
                        }}
                    >
                        {itemIcon}
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={
                        <Typography
                            variant="body2"  // Changed from "h7" to "body2"
                            sx={{
                                color: isSelected ? iconSelectedColor : textColor,
                                fontSize: '0.85rem',  // Adjust this value as needed
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
                        avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                    />
                )}
            </ListItemButton>
            {item.type === 'collapse' && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box pl={4}>
                        {item.children.map((child) => (
                            <NavItem key={child.id} item={child} level={level + 1} />
                        ))}
                    </Box>
                </Collapse>
            )}
        </>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};