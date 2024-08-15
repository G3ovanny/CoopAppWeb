import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SolicitudCredito {
    id: number;
    listSolicitudCredito: any[]; // Replace with specific type if known
}
interface SolicitudCreditoState {
    isLoadingSolicitudesCredito: boolean;
    activeSolicitudCredito: SolicitudCredito[];
    listSolicitudCredito: SolicitudCredito[];
    inicialSolicitudCredito: any[]; // Replace with specific type if known
    mensajeSolicitudCredito: string;
}
const initialState: SolicitudCreditoState = {
    isLoadingSolicitudesCredito: false,
    activeSolicitudCredito: [],
    listSolicitudCredito: [],
    inicialSolicitudCredito: [],
    mensajeSolicitudCredito: '',
};


export const solicitudSlice = createSlice({
    name: 'solicitud',
    initialState,
    reducers: {
        onLoadSolicitudCredito: (state, action: PayloadAction<SolicitudCredito[]>) => {
            action.payload.forEach(solicitudCredito => {
                const exist = state.listSolicitudCredito.some(dbSolicitudCredito => dbSolicitudCredito.id === solicitudCredito.id);
                if (!exist) {
                    state.listSolicitudCredito.push(solicitudCredito)
                }
            });
        },
        onSetActiveSolicitudCredito: (state, action: PayloadAction<SolicitudCredito[]>) => {
            state.activeSolicitudCredito = action.payload;
            state.inicialSolicitudCredito = [];
            if (state.activeSolicitudCredito.length === 1) {
                state.inicialSolicitudCredito = action.payload[0].listSolicitudCredito;
            }
        },
        onAddNewSolicitudCredito: (state, { payload }) => {
            state.listSolicitudCredito.push(payload);
            state.activeSolicitudCredito = [];
            state.inicialSolicitudCredito = []
            state.mensajeSolicitudCredito = 'Los datos se han guardado correctamente';
        },
        onUpdateSulicitudCredito: (state, { payload }) => {
            state.listSolicitudCredito = state.listSolicitudCredito.map(soliciudCredito => {
                if (soliciudCredito.id === payload.id) {
                    return payload
                }
                return soliciudCredito
            })
            state.mensajeSolicitudCredito = 'Los datos se actualizaron correctamente'
        },
        onDeleteSolicitudCredito: (state, { payload }) => {
            state.listSolicitudCredito = state.listSolicitudCredito.filter(solicitudCredito => solicitudCredito.id !== payload.id);
            state.isLoadingSolicitudesCredito = true;
            state.activeSolicitudCredito = [];
            state.inicialSolicitudCredito = [];
            state.mensajeSolicitudCredito = 'Los datos se han eliminado correctamente';

        },
        clearMessageSolicitudCredito: (state) => {
            state.mensajeSolicitudCredito = '';
        }
    }

})

export const {
    onLoadSolicitudCredito,
    onSetActiveSolicitudCredito,
    onAddNewSolicitudCredito,
    onUpdateSulicitudCredito,
    onDeleteSolicitudCredito, } = solicitudSlice.actions