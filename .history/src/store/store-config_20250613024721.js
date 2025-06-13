import { configureStore } from "@reduxjs/toolkit";
import companyReducer from './'
export const store = configureStore({
    reducer: {
       company: companyReducer,
    }
})