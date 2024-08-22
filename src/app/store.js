import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../features/product/productApi";
import { userApi } from "../features/auth/userApi";
import { userSlice } from "../features/auth/userSlice";
import { cartSlice } from "../features/cart/cartSlice";


export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [userSlice.name]: userSlice.reducer,
        [cartSlice.name]: cartSlice.reducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat([
        productApi.middleware,
        userApi.middleware
    ])
});