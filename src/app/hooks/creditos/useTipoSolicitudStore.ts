import React, { useRef } from 'react'
import { AppDispatch, AppStore, RootState } from '@/app/store/store';
import { coopApi } from '@/app/api'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { onAddNewTipoSolicitud, onDeleteTipoSolicitud, onLoadTipoSolicitud, onSetActiveTipoSolicitud, onUpdateTipoSolicitud } from '@/app/store/creditos/tipoSolicitudSlice';

export const useTipoSolicitudStore = () => {
    const store = useAppStore()
    const initialized = useRef(false)
    const dispatch = useDispatch()

    const { activeTipoSolicitud, listTipoSolicitud, isLoadingTipoSolicitud, inicialTipoSolicitud } = useAppSelector((state: any) => state.tipoSolicitud);

    const startLoadingTipoSolicitud = async () => {
        try {
            const { data } = await coopApi.get('/creditos/tipos-solicitud');
            if (!initialized.current) {
                dispatch(onLoadTipoSolicitud(data))
                initialized.current = true
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingTipoSolicitud  = async (tipoSolicitud: any) => {
        if (tipoSolicitud.id) {
            await coopApi.put(`/creditos/tipos-solicitud/${tipoSolicitud.id}/`, tipoSolicitud)
            dispatch(onUpdateTipoSolicitud({ ...tipoSolicitud }))
        } else {
            await coopApi.post('/creditos/tipos-solicitud/', tipoSolicitud)
            dispatch(onAddNewTipoSolicitud({ ...tipoSolicitud }))
        }
    }

    const startDeletingTipoSolicitud = async () => {
        try {
            const tipoSolicitud = activeTipoSolicitud.id
            if (tipoSolicitud) {
                await coopApi.delete(`/creditos/tipos-solicitud/${tipoSolicitud}/`)
            }
            dispatch(onDeleteTipoSolicitud(activeTipoSolicitud));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar la tipoSolicitud')
        }
    }

    const setActiveTipoSolicitud = (tipoSolicitud: any) => {
        dispatch(onSetActiveTipoSolicitud(tipoSolicitud))
    }

    return {
        //?Metodos
        startLoadingTipoSolicitud,
        startSavingTipoSolicitud ,
        startDeletingTipoSolicitud,
        setActiveTipoSolicitud,
        //?Propiedades
        activeTipoSolicitud,
        listTipoSolicitud,
        isLoadingTipoSolicitud,
        inicialTipoSolicitud,
    }
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()