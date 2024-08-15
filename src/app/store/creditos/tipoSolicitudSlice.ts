import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TipoSolicitud {
    id: number;
    listTipoSolicitud: any[]; // Replace with specific type if known
}
interface TipoSolicitudState {
    isLoadingTipoSolicitud: boolean;
    activeTipoSolicitud: TipoSolicitud[];
    listTipoSolicitud: TipoSolicitud[];
    inicialTipoSolicitud: any[]; // Replace with specific type if known
    mensajeTipoSolicitud: string;
}
const initialState: TipoSolicitudState = {
    isLoadingTipoSolicitud: true,
    activeTipoSolicitud: [],
    listTipoSolicitud: [],
    inicialTipoSolicitud: [],
    mensajeTipoSolicitud: '',
};

export const tipoSolicitudSlice = createSlice({
    name: 'tipoSolicitud',
    initialState,
    reducers: {
        onSetActiveTipoSolicitud: (state, action: PayloadAction<TipoSolicitud[]>) => {
            state.activeTipoSolicitud = action.payload;
            state.inicialTipoSolicitud = [];
            if (state.activeTipoSolicitud.length === 1) {
                state.inicialTipoSolicitud = action.payload[0].listTipoSolicitud;
            }
        },
        onAddNewTipoSolicitud: (state, { payload }) => {
            state.listTipoSolicitud.push(payload);
            state.activeTipoSolicitud = [];
            state.inicialTipoSolicitud = []
            state.mensajeTipoSolicitud = 'Los datos se han guardado correctamente';
        },
        onUpdateTipoSolicitud: (state, { payload }) => {
            state.listTipoSolicitud = state.listTipoSolicitud.map(tipoSolicitud => {
                if (tipoSolicitud.id === payload.id) {
                    return payload
                }
                return tipoSolicitud
            })
            state.mensajeTipoSolicitud = 'Los datos se actualizaron correctamente'
        },
        onDeleteTipoSolicitud: (state, { payload }) => {
            state.listTipoSolicitud = state.listTipoSolicitud.filter(tipoSolicitud => tipoSolicitud.id !== payload.id);
            state.isLoadingTipoSolicitud = true;
            state.activeTipoSolicitud = [];
            state.inicialTipoSolicitud = [];
            state.mensajeTipoSolicitud = 'Los datos se han eliminado correctamente';
        },
        onLoadTipoSolicitud: (state, action: PayloadAction<TipoSolicitud[]>) => {
            // state.isLoadingTipoSolicitud = false;
            // state.listTipoSolicitud = payload
            action.payload.forEach(tipoSolicitud => {
                const exist = state.listTipoSolicitud.some(dbtipoSolicitud => dbtipoSolicitud.id === tipoSolicitud.id);
                if (!exist) {
                    state.listTipoSolicitud.push(tipoSolicitud)
                }
            });
        },
        clearMessageTipoSolicitud: (state) => {
            state.mensajeTipoSolicitud = '';
        }
    }
})

export const { onSetActiveTipoSolicitud, onAddNewTipoSolicitud, onUpdateTipoSolicitud, onDeleteTipoSolicitud, onLoadTipoSolicitud, clearMessageTipoSolicitud } = tipoSolicitudSlice.actions