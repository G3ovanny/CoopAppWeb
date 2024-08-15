import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TipoSegmentacion {
    id: number;
    listTipoSegmentacion: any[]; // Replace with specific type if known
}
interface TipoSegmentacionState {
    isLoadingTipoSegmentacion: boolean;
    activeTipoSegmentacion: TipoSegmentacion[];
    listTipoSegmentacion: TipoSegmentacion[];
    inicialTipoSegmentacion: any[]; // Replace with specific type if known
    mensajeTipoSegmentacion: string;
}
const initialState: TipoSegmentacionState = {
    isLoadingTipoSegmentacion: true,
    activeTipoSegmentacion: [],
    listTipoSegmentacion: [],
    inicialTipoSegmentacion: [],
    mensajeTipoSegmentacion: '',
};

export const tipoSegmentacionSlice = createSlice({
    name: 'tipoSegmentacion',
    initialState,
    reducers: {
        onSetActiveTipoSegmentacion: (state, action: PayloadAction<TipoSegmentacion[]>) => {
            state.activeTipoSegmentacion = action.payload;
            state.inicialTipoSegmentacion = [];
            if (state.activeTipoSegmentacion.length === 1) {
                state.inicialTipoSegmentacion = action.payload[0].listTipoSegmentacion;
            }
        },
        onAddNewTipoSegmentacion: (state, { payload }) => {
            state.listTipoSegmentacion.push(payload);
            state.activeTipoSegmentacion = [];
            state.inicialTipoSegmentacion = []
            state.mensajeTipoSegmentacion = 'Los datos se han guardado correctamente';
        },
        onUpdateTipoSegmentacion: (state, { payload }) => {
            state.listTipoSegmentacion = state.listTipoSegmentacion.map(tipoSegmentacion => {
                if (tipoSegmentacion.id === payload.id) {
                    return payload
                }
                return tipoSegmentacion
            })
            state.mensajeTipoSegmentacion = 'Los datos se actualizaron correctamente'
        },
        onDeleteTipoSegmentacion: (state, { payload }) => {
            state.listTipoSegmentacion = state.listTipoSegmentacion.filter(tipoSegmentacion => tipoSegmentacion.id !== payload.id);
            state.isLoadingTipoSegmentacion = true;
            state.activeTipoSegmentacion = [];
            state.inicialTipoSegmentacion = [];
            state.mensajeTipoSegmentacion = 'Los datos se han eliminado correctamente';
        },
        onLoadTipoSegmentacion: (state, action: PayloadAction<TipoSegmentacion[]>) => {
            // state.isLoadingTipoSegmentacion = false;
            // state.listTipoSegmentacion = payload
            action.payload.forEach(tipoSegmentacion => {
                const exist = state.listTipoSegmentacion.some(dbtipoSegmentacion => dbtipoSegmentacion.id === tipoSegmentacion.id);
                if (!exist) {
                    state.listTipoSegmentacion.push(tipoSegmentacion)
                }
            });
        },
        clearMessageTipoSegmentacion: (state) => {
            state.mensajeTipoSegmentacion = '';
        }
    }
})

export const { onSetActiveTipoSegmentacion, onAddNewTipoSegmentacion, onUpdateTipoSegmentacion, onDeleteTipoSegmentacion, onLoadTipoSegmentacion, clearMessageTipoSegmentacion } = tipoSegmentacionSlice.actions