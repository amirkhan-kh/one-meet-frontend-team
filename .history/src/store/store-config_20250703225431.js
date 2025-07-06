import { configureStore } from "@reduxjs/toolkit";
import companyReducer from './company-service/slice-company'
import getCompany from './company-service/get-id';
import getCompanyProfile from './company-service/profile-get'
export const store = configureStore({
    reducer: {
       company: companyReducer,
       getcompanyID: getCompany,
       companyProfileGet: getCompanyProfile
       paymetPlanCreate: 
    }
})