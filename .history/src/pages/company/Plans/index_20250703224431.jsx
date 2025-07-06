
import './style.css'

import { Button } from "@/components/ui/button";
import "./style.css";
import { BsBarChartLine } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import AvailablePlans from '@/sections/company-pages/availabile-section';
import PaymentsMethod from '@/sections/company-pages/payments-method';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const Plans = () => {
  return (
    <div className="p-3 sm:p-6">
      <h3 className="text-[22px] sm:text-[20px] font-bold mb-2">
        Subscription Plan Management
      </h3>
      <p className="text-[13px] sm:text-[15px] font-extralight mb-5">
        Manage your subscription plan and billing details to optimize your
        recruiting process.
      </p>

      <div className="p-4 bg-white rounded-md shadow-md flex flex-col gap-2 sm:gap-4 mb-8">
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-8">
          Current Plan
        </h3>
        <span>
          <BsBarChartLine size={22} color="#1f33ad" />
        </span>
        <div>
          <p>
            Your current subscription plan provides access to various recruiting
            management features based on your selected tier.
          </p>
          <div className="flex flex-col md:flex-row justify-between w-full py-3">
            <ul className="w-[100%] md:w-[30%]">
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Recruiter management tools
              </li>
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Company profile customization
              </li>
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Basic analytics dashboard
              </li>
            </ul>
            <div className="w-[100%] md:w-[20%]">
              <Dialog>
                <DialogTrigger className="ai-cta">
                  Create a Plan
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className={`mb-5`}>What did you plan?</DialogTitle>
                    <DialogDescription>
                      <form>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="photo">Your Name</Label>
                          <Input placeholder="Name..."
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="firstName">Credits</Label>
                          <Input placeholder="Credits..."
                          type="number"
                          />
                        </div>
                        
                        <div className="grid gap-3">
                          <Label htmlFor="position">Amount of Money</Label>
                          <Input
                            placeholder="Amount..."
                            type="number"
                          />
                        </div>
                         <div className="grid gap-3">
                          <Label htmlFor="position">Currency</Label>
                          <Input
                            placeholder="Currency"
                          />
                        </div>
                        <div className="inline ">
                          <Label htmlFor="lastName" className="mb-3">Recruiters +</Label>
                          <Input placeholder="Add.."
                          type="number"
                          className="w-20"
                          />
                        </div>
                      </div>
                      <DialogFooter className="mt-4 inline flex justify-between">
                        <span></span>
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-400 w-30">Save changes</Button>
                      </DialogFooter>
                    </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>


      <PaymentsMethod />
      <AvailablePlans />
    </div>
  );
};
