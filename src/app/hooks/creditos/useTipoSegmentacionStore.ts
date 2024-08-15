import React, { useRef } from 'react'
import { AppDispatch, AppStore, RootState } from '@/app/store/store';
import { coopApi } from '@/app/api'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { onAddNewTipoSegmentacion, onDeleteTipoSegmentacion, onLoadTipoSegmentacion, onSetActiveTipoSegmentacion, onUpdateTipoSegmentacion } from '@/app/store/creditos/tipoSegmentacionSlice';

export const useTipoSegmentacionStore = () => {
    const store = useAppStore()
    const initialized = useRef(false)
    const dispatch = useDispatch()

    const { activeTipoSegmentacion, listTipoSegmentacion, isLoadingTipoSegentacion, inicialTipoSegmentacion } = useAppSelector((state: any) => state.tipoSegmentacion);

    const startLoadingTipoSegmentacion = async () => {
        try {
            const { data } = await coopApi.get('/creditos/tipos-segmentacion');
            if (!initialized.current) {
                dispatch(onLoadTipoSegmentacion(data))
                initialized.current = true
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingTipoSegmentacion = async (tipoSegmentacion: any) => {
        if (tipoSegmentacion.id) {
            await coopApi.put(`/creditos/tipos-segmentacion/${tipoSegmentacion.id}/`, tipoSegmentacion)
            dispatch(onUpdateTipoSegmentacion({ ...tipoSegmentacion }))
        } else {
            await coopApi.post('/creditos/tipos-segmentacion/', tipoSegmentacion)
            dispatch(onAddNewTipoSegmentacion({ ...tipoSegmentacion }))
        }
    }

    const startDeletingTipoSegmentacion = async () => {
        try {
            const tipoSegmentacion = activeTipoSegmentacion.id
            if (tipoSegmentacion) {
                await coopApi.delete(`/creditos/tipos-segmentacion/${tipoSegmentacion}/`)
            }
            dispatch(onDeleteTipoSegmentacion(activeTipoSegmentacion));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el tipo de segmentación')
        }
    }

    const setActiveTipoSegmentacion = (tipoSegmentacion: any) => {
        dispatch(onSetActiveTipoSegmentacion(tipoSegmentacion))
    }

    return {
        //?Metodos
        startLoadingTipoSegmentacion,
        startSavingTipoSegmentacion,
        startDeletingTipoSegmentacion,
        setActiveTipoSegmentacion,
        //?Propiedades
        activeTipoSegmentacion,
        listTipoSegmentacion,
        isLoadingTipoSegentacion,
        inicialTipoSegmentacion,
    }
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()