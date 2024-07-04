import { RequestQuote } from "@mui/icons-material"

const icons = {
    RequestQuote,
}

export const creditos = {
    id: 'creditos',
    title: 'Solicitud de credito',
    type: 'group',
    children: [
        {
            id: 'Lista de creditos',
            title: 'Lista de creditos',
            type: 'item',
            url: '/creditos/solicitudes_credito',
            icon: icons.RequestQuote,
        }
    ]
}