import React, { useRef } from 'react'
import { AppDispatch, AppStore, RootState } from '@/app/store/store';
import { coopApi } from '@/app/api'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { onAddNewFormaPago, onDeleteFormaPago, onLoadFormaPago, onSetActiveFormaPago, onUpdateFormaPago } from '@/app/store/creditos/formaPagoSlice';

export const useFormaPagoStore = () => {
    const store = useAppStore()
    const initialized = useRef(false)
    const dispatch = useDispatch()

    const { activeFormaPago, listFormaPago, isLoadingFormasPago, inicialFormaPago } = useAppSelector((state: any) => state.formaPago);

    const startLoadingFormasPago = async () => {
        try {
            const { data } = await coopApi.get('/creditos/formas-pagos');
            if (!initialized.current) {
                dispatch(onLoadFormaPago(data))
                initialized.current = true
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingFormaPago = async (formapago: any) => {
        if (formapago.id) {
            await coopApi.put(`/creditos/formas-pagos/${formapago.id}/`, formapago)
            dispatch(onUpdateFormaPago({ ...formapago }))
        } else {
            await coopApi.post('/creditos/formas-pagos/', formapago)
            dispatch(onAddNewFormaPago({ ...formapago }))
        }
    }

    const startDeletingFormaPago = async () => {
        try {
            const formapago = activeFormaPago.id
            if (formapago) {
                await coopApi.delete(`/creditos/formas-pagos/${formapago}/`)
            }
            dispatch(onDeleteFormaPago(activeFormaPago));
        } catch (error) {
            console.log(error)
            console.log('Error al eliminar la formapago')
        }
    }

    const setActiveFormaPago = (formapago: any) => {
        dispatch(onSetActiveFormaPago(formapago))
    }

    return {
        //?Metodos
        startLoadingFormasPago,
        startSavingFormaPago,
        startDeletingFormaPago,
        setActiveFormaPago,
        //?Propiedades
        activeFormaPago,
        listFormaPago,
        isLoadingFormasPago,
        inicialFormaPago,
    }
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()