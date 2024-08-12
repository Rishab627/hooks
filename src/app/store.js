import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../features/product/productApi";
import { mealApi } from "../features/product/mealApi";


export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [mealApi.reducerPath]: mealApi.reducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat([
        productApi.middleware,
        mealApi.middleware
    ])
});