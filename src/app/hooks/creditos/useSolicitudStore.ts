import { coopApi } from '@/app/api';
import { onAddNewSolicitud, onDeleteSolicitud, onLoadSolicitud, onSetActiveSolicitud, onUpdateSulicitud } from '@/app/store/creditos/solicitudSlice';
import { AppDispatch, AppStore, RootState } from '@/app/store/store';
import { useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'

interface SolicitudStore {
  activeSolicitud: any[]; // Define el tipo correcto para activeSolicitud
  listSolicitud: any[]; // Define el tipo correcto para listSolicitud
  startLoadingSolicitudes: () => Promise<void>;
}

export const useSolicitudStore = () => {
  const store = useAppStore()

  const initialized = useRef(false)

  const { activeSolicitud, listSolicitud, isLoadingSolicitud } = useAppSelector((state: any) => state.solicitud);

  const dispatch = useAppDispatch()

  const startLoadingSolicitudes = async () => {
    try {
      const { data } = await coopApi.get('/creditos/solicitud');
      if (!initialized.current) {
        dispatch(onLoadSolicitud(data))
        initialized.current = true
      }
    } catch (error) {
      console.log(error)
    }
  }

  const startSavingSolicitud = async (solicitud: any) => {
    if (solicitud.id) {
      await coopApi.put(`/creditos/solicitud/${solicitud.id}`, solicitud)
      dispatch(onUpdateSulicitud({ ...solicitud }))
    } else {
      await coopApi.post('/creditos/solicitud/', solicitud)
      dispatch(onAddNewSolicitud({ ...solicitud }))
    }
  }

  const startDeletingSolicitud = async () => {
    try {
      for (let i = 0; i < activeSolicitud.length; i++) {
        const solicitud = activeSolicitud[i].id;
        if (solicitud) {
          await coopApi.delete(`/creditos/solicitud/${solicitud}`)
        }
      }
      dispatch(onDeleteSolicitud());
    } catch (error) {
      console.log(error)
      console.log('Error al eliminar la solicitud')
    }
  }

  const setActiveSolicitud = (solicitud: any) => {
    dispatch(onSetActiveSolicitud(solicitud))
  }

  return {
    //?Metodos
    startLoadingSolicitudes,
    startSavingSolicitud,
    startDeletingSolicitud,
    setActiveSolicitud,
    //?Propiedades
    activeSolicitud,
    listSolicitud,
    isLoadingSolicitud,
  }
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()