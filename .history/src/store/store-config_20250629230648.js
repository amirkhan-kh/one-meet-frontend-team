import { configureStore } from "@reduxjs/toolkit";
import companyReducer from './company-service/slice-company'
import 
export const store = configureStore({
    reducer: {
       company: companyReducer,
       getcompanyID: getCompany
    }
})