import { configureStore } from "@reduxjs/toolkit";
impo
export const store = configureStore({
    reducer: {
       company: companyReducer,
    }
})