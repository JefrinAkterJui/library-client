import {configureStore} from "@reduxjs/toolkit"
import { baseApi } from "./Api/baseApi";


export const store = configureStore({
    reducer:{
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootSatate =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch