import { configureStore } from "@reduxjs/toolkit";
import companyReducer from './company-service/'
export const store = configureStore({
    reducer: {
       company: companyReducer,
    }
})