import React, { useRef } from 'react'
import { AppDispatch, AppStore, RootState } from '@/app/store/store';
import { coopApi } from '@/app/api'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { onAddNewTipoGarantia, onDeleteTipoGarantia, onLoadTipoGarantia, onSetActiveTipoGarantia, onUpdateTipoGrantia } from "@/app/store/creditos/tipoGarantiaSlice";


export const useTipoGarantiaStore = () => {

    const { activeTipoGarantia, listTipoGarantia, isLoadingTipoGarantia, inicialTipoGarantia } = useAppSelector((state: any) => state.tipoGarantia)
    const initialized = useRef(false)
    const dispatch = useDispatch()

    const startLoandingTipoGarantia = async () => {
        try {
            const { data } = await coopApi.get('/creditos/tipos-garantia');
            if (!initialized.current) {
                dispatch(onLoadTipoGarantia(data))
                initialized.current = true
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingTipoGarantia = async (tipoGarantia: any) => {
        if (tipoGarantia.id) {
            await coopApi.put(`/creditos/tipos-garantia/${tipoGarantia.id}/`, tipoGarantia)
            dispatch(onUpdateTipoGrantia({ ...tipoGarantia }))
        } else {
            await coopApi.post('/creditos/tipos-garantia/', tipoGarantia)
            dispatch(onAddNewTipoGarantia({ ...tipoGarantia }))
        }
    }
    const startDeleteTipoGarantia = async () => {
        try {
            const tipoGarantia = activeTipoGarantia.id
            if (tipoGarantia) {
                await coopApi.delete(`/creditos/tipos-garantia/${tipoGarantia}/`)
            }
            dispatch(onDeleteTipoGarantia(activeTipoGarantia));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar el tipo de Garantia')
        }
    }

    const setActiveTipoGarantia = (tipoGarantia: any) => {
        dispatch(onSetActiveTipoGarantia(tipoGarantia))
    }

    return {
        //?Metodos
        startLoandingTipoGarantia,
        startSavingTipoGarantia,
        startDeleteTipoGarantia,
        setActiveTipoGarantia,
        //?Propiedades
        activeTipoGarantia,
        listTipoGarantia,
        isLoadingTipoGarantia,
        inicialTipoGarantia,
    }
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()