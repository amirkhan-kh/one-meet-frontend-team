import { Button } from "@/components/ui/button";
import "./style.css";
import { BsBarChartLine } from "react-icons/bs";
import { MdDone } from "react-icons/md";
// import AvilablesPlans from "@/sections/company-pages/avilables-plans";
// import PaymnetMethod from "@/sections/company-pages/payment-mthod";


// import { BsBarChartLine } from 'react-icons/bs';
import './style.css'

import { MdDone } from 'react-icons/md';
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

//       <div
//         className={` p-4 bg-white rounded-md border border-[#dbd7d7] flex flex-col gap-2 sm:gap-4 mb-8`}
//       >
//         <h3
//           className={`text-[15px] font-semibold flex items-center gap-2 mb-8`}
//         >
//           Current Plan
//         </h3>
//         <span>
//           <BsBarChartLine size={22} color="#1f33ad" />
//         </span>
//         <div>
//           <p>
//             Your current subscription plan provides access to various recruiting
//             management features based on your selected tier.
//           </p>
//           <div className="flex flex-col md:flex-row justify-between w-full py-3">
//             <ul className="w-[100%] md:w-[30%]">
//               <li className="flex items-center gap-2 my-3 text-[16px]">
//                 <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
//                   <MdDone color="green" size={13} />
//                 </span>
//                 Recruiter management tools
//               </li>
//               <li className="flex items-center gap-2 my-3 text-[16px]">
//                 <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
//                   <MdDone color="green" size={13} />
//                 </span>
//                 Company profile customization
//               </li>
//               <li className="flex items-center gap-2 my-3 text-[16px]">
//                 <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
//                   <MdDone color="green" size={13} />
//                 </span>
//                 Basic analytics dashboard
//               </li>
//             </ul>
//             <div className="w-[100%] md:w-[20%]">
//               <Dialog>
//                 <DialogTrigger className="ai-cta">Change Select Plan</DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Are you absolutely sure?</DialogTitle>
//                     <DialogDescription>
//                       This action cannot be undone. This will permanently delete
//                       your account and remove your data from our servers.
//                     </DialogDescription>
//                   </DialogHeader>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </div>
//       </div>
//       <AvilablesPlans />
//       <PaymnetMethod/>
//     </div>
//   );
// };
