import { coopApi } from '@/app/api';
import { onAddNewSolicitudCredito, onLoadSolicitudCredito, onSetActiveSolicitudCredito, onUpdateSulicitudCredito, onDeleteSolicitudCredito } from '@/app/store/creditos/solicitudSlice';
import { AppDispatch, AppStore, RootState } from '@/app/store/store';
import { useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'

export const useSolicitudStore = () => {
  const store = useAppStore()

  const initialized = useRef(false)

  const { activeSolicitudCredito, listSolicitudCredito, isLoadingSolicitudesCredito, mensajeSolicitudCredito } = useAppSelector((state: any) => state.solicitud);

  const dispatch = useAppDispatch()

  const setActiveSolicitudCredito = (solicitud: any) => {
    dispatch(onSetActiveSolicitudCredito(solicitud))
  }

  const startLoadingSolicitudes = async () => {
    try {
      const { data } = await coopApi.get('/creditos/solicitud');
      if (!initialized.current) {
        dispatch(onLoadSolicitudCredito(data))
        initialized.current = true
      }
    } catch (error) {
      console.log(error)
    }
  }

  const startSavingSolicitudCredito = async (solicitud: any) => {
    if (solicitud.id) {
      await coopApi.put(`/creditos/solicitud/${solicitud.id}/`, solicitud)
      dispatch(onUpdateSulicitudCredito({ ...solicitud }))
    } else {
      await coopApi.post('/creditos/solicitud/', solicitud)
      dispatch(onAddNewSolicitudCredito({ ...solicitud }))
    }
  }

  const startDeletingSolicitudCredito = async () => {
    try {
      const solicitudCredito = activeSolicitudCredito.id
      if (solicitudCredito) {
        await coopApi.delete(`/creditos/solicitud/${solicitudCredito}/`)
      }
      dispatch(onDeleteSolicitudCredito(activeSolicitudCredito));
    } catch (error) {
      console.log(error)
      console.log('Error al eliminar la solicitud de crédito')
    }
  }



  return {
    //?Metodos
    startLoadingSolicitudes,
    startSavingSolicitudCredito,
    startDeletingSolicitudCredito,
    setActiveSolicitudCredito,
    //?Propiedades
    activeSolicitudCredito,
    listSolicitudCredito,
    isLoadingSolicitudesCredito,
    mensajeSolicitudCredito,
  }
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()