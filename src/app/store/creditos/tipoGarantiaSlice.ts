import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TipoGarantia {
    id: number;
    listTipoGarantia: any[]; // Replace with specific type if known
}
interface TipoGarantiaState {
    isLoadingTipoGarantia: boolean;
    activeTipoGarantia: TipoGarantia[];
    listTipoGarantia: TipoGarantia[];
    inicialTipoGarantia: any[]; // Replace with specific type if known
    mensajeTipoGarantia: string;
}
const initialState: TipoGarantiaState = {
    isLoadingTipoGarantia: true,
    activeTipoGarantia: [],
    listTipoGarantia: [],
    inicialTipoGarantia: [],
    mensajeTipoGarantia: '',
};

export const tipoGarantiaSlice = createSlice({
    name: 'tipoGarantia',
    initialState,
    reducers: {
        onSetActiveTipoGarantia: (state, action: PayloadAction<TipoGarantia[]>) => {
            state.activeTipoGarantia = action.payload;
            state.inicialTipoGarantia = [];
            if (state.activeTipoGarantia.length === 1) {
                state.inicialTipoGarantia = action.payload[0].listTipoGarantia;
            }
        },
        onAddNewTipoGarantia: (state, { payload }) => {
            state.listTipoGarantia.push(payload);
            state.activeTipoGarantia = [];
            state.inicialTipoGarantia = []
            state.mensajeTipoGarantia = 'Los datos se han guardado correctamente';
        },
        onUpdateTipoGrantia: (state, { payload }) => {
            state.listTipoGarantia = state.listTipoGarantia.map(tipoGarantia => {
                if (tipoGarantia.id === payload.id) {
                    return payload
                }
                return tipoGarantia
            })
            state.mensajeTipoGarantia = 'Los datos se actualizaron correctamente'
        },
        onDeleteTipoGarantia: (state, { payload }) => {
            state.listTipoGarantia = state.listTipoGarantia.filter(tipoGarantia => tipoGarantia.id !== payload.id);
            state.isLoadingTipoGarantia = true;
            state.activeTipoGarantia = [];
            state.inicialTipoGarantia = [];
            state.mensajeTipoGarantia = 'Los datos se han eliminado correctamente';
        },
        onLoadTipoGarantia: (state, action: PayloadAction<TipoGarantia[]>) => {
            action.payload.forEach(tipoGarantia => {
                const exist = state.listTipoGarantia.some(dbTipoGarantia => dbTipoGarantia.id === tipoGarantia.id);
                if (!exist) {
                    state.listTipoGarantia.push(tipoGarantia)
                }
            });
        },
        clearMessageTipoGarantia: (state) => {
            state.mensajeTipoGarantia = '';
        }
    }
})

export const { onSetActiveTipoGarantia, onAddNewTipoGarantia, onUpdateTipoGrantia, onDeleteTipoGarantia, onLoadTipoGarantia, clearMessageTipoGarantia } = tipoGarantiaSlice.actions