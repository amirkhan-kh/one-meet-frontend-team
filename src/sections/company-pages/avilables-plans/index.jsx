import { Button } from "@/components/ui/button";
import React from "react";
import { MdDone } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const AvilablesPlans = () => {
  return (
    <div className="border border-[#dbd7d7] rounded-md p-4 mb-6">
      <h3 className={`text-[15px] font-semibold flex items-center gap-2 mb-8`}>
        AvilablesPlans
      </h3>
      <div className="flex flex-col md:flex-row w-full justify-between gap-5  ">
        <div
          className={` p-4 bg-white rounded-md border border-[#dbd7d7] flex flex-col gap-2 sm:gap-4 mb-8 w-[100%] md:w-[33%]`}
        >
          <p className="text-lg font-medium">Free</p>
          <div className="flex flex-col gap-3">
            <h3 className="text-md text-2xl font-bold mb-2.5">$0/month</h3>
            <p className="text-sm">Get started with basic recruiting tools</p>
            <ul>
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Up to 3 recruiter connections
              </li>
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Basic company profile
              </li>
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Advanced analytics
              </li>
            </ul>
            <Dialog>
              <DialogTrigger className="border border-[#dbd7d7] rounded-md w-full py-1 text-md hover:bg-[#dad6d636] cursor-pointer">
                Select Plan
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
        <div
          className={` p-4 bg-white rounded-md border border-[#dbd7d7] flex flex-col gap-2 sm:gap-4 mb-8 w-[100%] md:w-[33%]`}
        >
          <span className=" bg-blue-700 w-15 p-0.5 rounded-lg px-1 text-white text-sm">
            Popular
          </span>
          <p className="text-lg font-medium">Standard</p>
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold mb-2.5">$49/month</h3>
            <p className="text-sm">Perfect for growing companies</p>
            <ul>
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
                Recruiter management tools
              </li>
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Recruiter management tools
              </li>
            </ul>
            <Dialog>
              <DialogTrigger className="ai-cta">
                Select Plan
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
        <div
          className={` p-4 bg-white rounded-md border border-[#dbd7d7] flex flex-col gap-2 sm:gap-4 mb-8w-[100%] md:w-[33%]`}
        >
          <p className="text-lg font-medium">Enterprise</p>
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold mb-2.5">$199/month</h3>
            <p className="text-sm">For large organizations with advanced needs</p>
            <ul>
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Unlimited recruiter connections
              </li>
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Premium company profile
              </li>
              <li className="flex items-center gap-2 my-3 text-[16px]">
                <span className="border-2 grid place-content-center border-green-400 w-4 h-4 p-3 bg-green-200 rounded-full">
                  <MdDone color="green" size={13} />
                </span>
                Advanced analytics dashboard
              </li>
            </ul>
            <Dialog>
              <DialogTrigger className="border border-[#dbd7d7] rounded-md w-full py-1 text-md hover:bg-[#dad6d636] cursor-pointer">
                Select Plan
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
    </div>
  );
};

export default AvilablesPlans;
