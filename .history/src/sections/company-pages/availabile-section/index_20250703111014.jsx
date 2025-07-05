import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { MdDone } from "react-icons/md";
const AvailablePlans = () => {
  return (
    <div className="shadow-md bg-[rgb()] rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10">
      <h3 className="text-[18px] font-bold">Available Plans</h3>

      <div className="flex flex-col md:flex-row items-center gap-3">

       <div className="border border-[#bab7b7] p-4 bg-white rounded-sm w-full md:w-[40%] hover:bg-gradient-to-r hover:from-[#3b45d6] hover:to-[#611bd6] transition-colors duration-800 ease-in-out hover:text-white">
          <p className="mt-2 text-[20px] font-medium">Free</p>
          <h3 className="font-bold text-2xl my-2">$0/month</h3>
          <p className="text-[12px] text-gray-500">
            Get started with basic recruiting tools
          </p>
          <ul>
            <li className="flex items-center gap-2.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>
              Up to 3 recruiter connections
            </li>{" "}
            <li className="flex items-center gap-2.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>
              Basic company profile
            </li>
            <li className="flex items-center gap-2.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>
              Advanced analytics
            </li>
          </ul>
          <Dialog>
            <DialogTrigger className="w-full bg-[#e6e1e194]   py-1 rounded-sm">
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
       <div className="border border-[#bab7b7] p-4 bg-white rounded-sm w-full md:w-[40%] hover:bg-gradient-to-r hover:from-[#3b45d6] hover:to-[#611bd6] transition-colors duration-800 ease-in-out hover:text-white">

          <p className="inline bg-blue-800 px-1.5 py-0.5 rounded-lg text-white text-[12px] ">
            Popular
          </p>
          <p className="mt-2 text-[20px] font-medium">Standard</p>
          <h3 className="font-bold text-2xl my-2">$49/month</h3>
          <p className="text-[12px] text-gray-500">
            Perfect for growing companies
          </p>
          <ul>
            <li className="flex items-center gap-2.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>
              Up to 15 recruiter connections
            </li>
            <li className="flex items-center gap-2.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>
              Enhanced company profile
            </li>
            <li className="flex items-center gap-2.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>
              Basic analytics dashboard
            </li>
          </ul>
          <Dialog>
            <DialogTrigger className="w-full bg-[#e6e1e194]   py-1 rounded-sm  ">
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

       <div className="border border-[#bab7b7] p-4 bg-white rounded-sm w-full md:w-[40%] hover:bg-gradient-to-r hover:from-[#3b45d6] hover:to-[#611bd6] transition-colors duration-800 ease-in-out hover:text-white">
          <p className="mt-2 text-[20px] font-medium">Enterprise</p>
          <h3 className="font-bold text-2xl my-2">$199/month</h3>
          <p className="text-[12px] text-gray-500">
            For large organizations with advanced needs
          </p>
          <ul>
            <li className="flex items-center gap-2.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>
              Unlimited recruiter connections
            </li>
            <li className="flex items-center gap-2.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>
              Premium company profile
            </li>
            <li className="flex items-center gap-2.5 my-2">
              <span className="bg-green-300 border-2  border-green-600 rounded-full w-6 h-6 grid place-content-center">
                <MdDone />
              </span>
              Advanced analytics dashboard
            </li>
          </ul>
          <Dialog>
            <DialogTrigger className="w-full bg-[#e6e1e194]   py-1 rounded-sm ">
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
  );
};

export default AvailablePlans;
