import { configureStore } from "@reduxjs/toolkit";
import companyReducer from './company-service/slice-company'
import getCompany from './company-service/get-id';
import getCompanyProfile from './company-service/profile-get'
import createPaymentPlanReducer from './company-service/payment-servce/plan-create';
import companyByOwnerReducer from './company-service/get-profile-by-id'
import getAllPlansReducer from './company-service/payment-servce/plan-get'
import paymentGetAllReducer from './company-service/payment-servce/payment-hstory-get'
export const store = configureStore({
    reducer: {
       company: companyReducer,
       getcompanyID: getCompany,
       companyProfileGet: getCompanyProfile,
       paymentPlan: createPaymentPlanReducer,
       companyByOwner: companyByOwnerReducer,
       plans: getAllPlansReducer,
       payments: paymentGetAllReducer,
       createPayment:
    }
})