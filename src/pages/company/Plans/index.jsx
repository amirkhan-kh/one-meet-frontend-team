
import './style.css'

import { Button } from "@/components/ui/button";
import "./style.css";
import { BsBarChartLine } from "react-icons/bs";
import { MdDone } from "react-icons/md";
// import AvilablesPlans from "@/sections/company-pages/avilables-plans";
// import PaymnetMethod from "@/sections/company-pages/payment-mthod";


// import { BsBarChartLine } from 'react-icons/bs';
import './style.css'

// import { MdDone } from 'react-icons/md';
import AvailablePlans from '@/sections/company-pages/availabile-section';
import PaymentsMethod from '@/sections/company-pages/payments-method';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
export const Plans = () => {
  return (
    <div className="px-3 py-5 sm:p-6">
      <h3 className="text-[20] sm:text-2xl font-semibold mb-4">Subscription Plan Management</h3>
      <p className="text-[15px] mb-8">
        Manage your subscription plan and billing details to optimize your
        recruiting process.
      </p>

      <div className="border border-[#c0c1c3] px-3 sm:px-6 py-3 sm:py-8 bg-white rounded-md mb-10">
        <h3 className="text-[18px] font-bold mb-12">Current Plan</h3>

        <BsBarChartLine color="#2a50bc" size={20}/>
        <p className="mt-5 text-[15px] mb-4">
          Your current subscription plan provides access to various recruiting
          management features based on your selected tier.
        </p>
        <div className="flex flex-col sm:flex-row justify-between w-full items-start">
          <ul className="w-full sm:w-[50%]">
            <li className="flex items-center gap-1.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>Recruiter management tools
            </li>
            <li className="flex items-center gap-1.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>Company profile customization
            </li>
            <li className="flex items-center gap-1.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>Basic analytics dashboard
            </li>
          </ul>
          <div className='w-full sm:w-[20%]'>
            <Dialog>
              <DialogTrigger className="ai-cta">
                Change Subscribe Plan
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <AvailablePlans/>
      <PaymentsMethod/>
    </div>
  )
}

//      

