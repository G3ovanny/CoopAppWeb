import { Dashboard } from "@mui/icons-material"


const icons = {
    Dashboard,
}

export const dashboard = {
    id: 'dashboard',
    title: 'Panel de control',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/creditos/dashboard',
            icon: icons.Dashboard,
        }
    ]
}