import { RequestQuote } from "@mui/icons-material"

const icons = {
    RequestQuote,
}

export const creditos = {
    id: 'creditos',
    title: 'Gestión de Solicitudes',
    type: 'group',
    children: [
        {
            id: 'solicitudes',
            title: 'Solicitudes de creditos',
            type: 'item',
            url: '/creditos/solicitudes-credito',
            icon: icons.RequestQuote,
        }
    ]
}