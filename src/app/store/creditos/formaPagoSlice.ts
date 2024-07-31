import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormaPago {
    id: number;
    listFormaPago: any[]; // Replace with specific type if known
}
interface FormaPagoState {
    isLoadingFormasPago: boolean;
    activeFormaPago: FormaPago[];
    listFormaPago: FormaPago[];
    inicialFormaPago: any[]; // Replace with specific type if known
    mensajeFormaPago: string;
}
const initialState: FormaPagoState = {
    isLoadingFormasPago: true,
    activeFormaPago: [],
    listFormaPago: [],
    inicialFormaPago: [],
    mensajeFormaPago: '',
};

export const formaPagoSlice = createSlice({
    name: 'formaPago',
    initialState,
    reducers: {
        onSetActiveFormaPago: (state, action: PayloadAction<FormaPago[]>) => {
            state.activeFormaPago = action.payload;
            state.inicialFormaPago = [];
            if (state.activeFormaPago.length === 1) {
                state.inicialFormaPago = action.payload[0].listFormaPago;
            }
        },
        onAddNewFormaPago: (state, { payload }) => {
            state.listFormaPago.push(payload);
            state.activeFormaPago = [];
            state.inicialFormaPago = []
            state.mensajeFormaPago = 'Los datos se han guardado correctamente';
        },
        onUpdateFormaPago: (state, { payload }) => {
            state.listFormaPago = state.listFormaPago.map(formaPago => {
                if (formaPago.id === payload.id) {
                    return payload
                }
                return formaPago
            })
            state.mensajeFormaPago = 'Los datos se actualizaron correctamente'
        },
        onDeleteFormaPago: (state, { payload }) => {
            state.listFormaPago = state.listFormaPago.filter(formaPago => formaPago.id !== payload.id);
            state.isLoadingFormasPago = true;
            state.activeFormaPago = [];
            state.inicialFormaPago = [];
            state.mensajeFormaPago = 'Los datos se han eliminado correctamente';
        },
        onLoadFormaPago: (state, action: PayloadAction<FormaPago[]>) => {
            // state.isLoadingFormasPago = false;
            // state.listFormaPago = payload
            action.payload.forEach(formaPago => {
                const exist = state.listFormaPago.some(dbformaPago => dbformaPago.id === formaPago.id);
                if (!exist) {
                    state.listFormaPago.push(formaPago)
                }
            });
        },
        clearMessageFormaPago: (state) => {
            state.mensajeFormaPago = '';
        }
    }
})

export const { onSetActiveFormaPago, onAddNewFormaPago, onUpdateFormaPago, onDeleteFormaPago, onLoadFormaPago, clearMessageFormaPago } = formaPagoSlice.actions