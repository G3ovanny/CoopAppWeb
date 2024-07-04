import { configureStore } from "@reduxjs/toolkit";
import { menuSlice, modalSlice } from "./ui";

export const makeStore = () => {
  return configureStore({
    reducer: {
      menu: menuSlice.reducer,
      modal: modalSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    })
  });
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']