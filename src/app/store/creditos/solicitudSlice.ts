import { createSlice } from "@reduxjs/toolkit";



export const solicitudSlice = createSlice({
    name: 'solicitud',
    initialState: {
        isLoadingSolicitud: true,
        activeSolicitud: [],
        listSolicitud: [],
        inicialSolicitud: [],
        mensajeSolicitud: '',
    },
    reducers: {
        onLoadSolicitud: (state, { payload }) => {
            state.isLoadingSolicitud = false;
            state.listSolicitud = payload
            // //state.listSolicitud = payload
            // payload.forEach((solicitud:any) => {
            //     const exist = state.listSolicitud.some(dbsolicitud => dbsolicitud.id === solicitud.id);
            //     if (!exist) {
            //         state.listSolicitud.push(solicitud)
            //     }
            // });
        },
        onSetActiveSolicitud: (state, { payload }) => {
            state.activeSolicitud = payload;
            state.inicialSolicitud = [];
            if (state.activeSolicitud.length === 1) {
                state.inicialSolicitud = payload[0].listSolicitud
            }
        },
        onAddNewSolicitud: (state, { payload }) => {
            state.activeSolicitud = [];
            state.inicialSolicitud = [];
            state.mensajeSolicitud = 'Los datos se han guardado correctamente';
            //state.listSolicitud.push(payload);
        },
        onUpdateSulicitud: (state, { payload }) => {
            console.log(payload)
            console.log(state.listSolicitud)
            // state.listSolicitud = state.listSolicitud.map(solicitud=> {
            //   if (solicitud.id === payload.id) {
            //     return payload1
            //   }
            //   return solicitud
            // })
            // state.mensajeSolicitud = 'Los datos se actualizaron correctamente'
        },
        onDeleteSolicitud: (state) => {
            const solicitudActiva = state.activeSolicitud
            console.log(solicitudActiva)
            // if (solicitudActiva) {
            //      for (let i = 0; i < solicitudActiva.length; i++) {
            //     const element = solicitudActiva[i].id;
            //     if (element) {
            //         state.listSolicitud = state.listSolicitud.filter(solicitud => solicitud.id !== element);
            //         state.activeSolicitud = [];
            //         state.inicialSolicitud = [];
            //         state.mensajeSolicitud = 'Los datos se han eliminado correctamente'
            //     }
            // }
            // }
        },
    }

})

export const {
    onLoadSolicitud,
    onSetActiveSolicitud,
    onAddNewSolicitud,
    onUpdateSulicitud,
    onDeleteSolicitud, } = solicitudSlice.actions