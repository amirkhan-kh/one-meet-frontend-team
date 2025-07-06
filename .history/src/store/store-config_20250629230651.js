import { configureStore } from "@reduxjs/toolkit";
import companyReducer from './company-service/slice-company'
import get
export const store = configureStore({
    reducer: {
       company: companyReducer,
       getcompanyID: getCompany
    }
})