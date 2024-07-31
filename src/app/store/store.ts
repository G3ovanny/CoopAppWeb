import { configureStore } from "@reduxjs/toolkit";
import { menuSlice, modalSlice } from "./ui";
import { authSlice } from "./auth/authSlice";
import { alertDialogSlice } from "./ui/alertDialogSlice";
import { solicitudSlice } from "./creditos/solicitudSlice";
import { formaPagoSlice } from "./creditos/formaPagoSlice";

export const makeStore:any = () => {
  return configureStore({
    reducer: {
      //!reducers ui
      menu: menuSlice.reducer,
      modal: modalSlice.reducer,
      auth: authSlice.reducer,
      AlertDialog: alertDialogSlice.reducer,
      //!reducers modulo creditos
      solicitud: solicitudSlice.reducer,
      formaPago: formaPagoSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    })
  });
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']