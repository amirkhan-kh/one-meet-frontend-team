import { configureStore } from "@reduxjs/toolkit";
import companyReducer from './company-service/slice-company'
import getCompany from './company-service/get-id';
import getCompanyProfile from './company-service/profile-get'
import createPlanPyment from './company-service/payment-servce/payment-create/index.jsx'
export const store = configureStore({
    reducer: {
       company: companyReducer,
       getcompanyID: getCompany,
       companyProfileGet: getCompanyProfile,
       createPlanPyment: createPaymentPlan
    }
})