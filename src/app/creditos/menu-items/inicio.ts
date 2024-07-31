import { Dashboard, AccountBox } from "@mui/icons-material"


const icons = {
    Dashboard,
    AccountBox,
}

export const inicio = {
    id: 'inicio',
    title: 'Inicio',
    type: 'group',
    children: [
        {
            id: 'panel-control',
            title: 'Panel de control',
            type: 'item',
            url: '/creditos/inicio/panel-control',
            icon: icons.Dashboard,
        },
        {
            id: 'perfil',
            title: 'Mi perfil',
            type: 'item',
            url: '/creditos/inicio/perfil',
            icon: icons.AccountBox,
        }
    ]
}