import { Settings, AccountBox, Group } from "@mui/icons-material"


const icons = {
    Settings,
    AccountBox,
    Group,
}

export const configuracion = {
    id: 'configuracion',
    title: 'Configuración',
    type: 'group',
    children: [
        {
            id: 'parametros',
            title: 'Parámetros de Crédito',
            type: 'collapse',
            icon: icons.Settings,
            children: [
                {
                    id: 'pago',
                    title: 'Formas de pago',
                    type: 'item',
                    url: '/creditos/configuracion/parametros/formas-pago'
                },
                {
                    id: 'garantia',
                    title: 'Tipos de garantia',
                    type: 'item',
                    url: '/creditos/configuracion/parametros/tipos-garantia'
                },
                {
                    id: 'solicitud',
                    title: 'Tipos de solicitud',
                    type: 'item',
                    url: '/creditos/configuracion/parametros/tipos-solicitud'
                },
                {
                    id: 'segmentacion',
                    title: 'Tipos de segmentacion',
                    type: 'item',
                    url: '/creditos/configuracion/parametros/tipos-segmentacion'
                },
                
                // Añade más submenús según sea necesario
            ]
        },
        {
            id: 'usuarios',
            title: 'Usuarios',
            type: 'item',
            url: '/creditos/configuracion/usuarios',
            icon: icons.Group,
        }
    ]
}