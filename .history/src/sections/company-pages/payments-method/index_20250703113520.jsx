import React from "react";

const PaymentsMethod = () => {
  return (
    <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white">
      <h3 className="text-[18px] font-bold">Payment Methods</h3>

      <div className=" w-full gap-3">
        <div className="">
          <p className=" text-[17px] font-medium">Overivew</p>
          <div className="flex flex-col sm:flex items-center w-full justify-between gap-4">
            <div className="shadow-sm p-3 rounded-sm w-[50%]">
              <p className="text-[15px] font-light"></p>
              <span className="text-[19px] font-semibold"></span>
            </div>
            <div className="shadow-sm p-3 rounded-sm w-[50%]">
              <p className="text-[15px] font-light"></p>
              <span className="text-[19px] font-semibold"></span>
            </div>
          </div>
        </div>
        <div>
          <p className=" text-[17px] font-medium">Saved Payment Methods</p>
          <div className="shadow-sm p-3 rounded-sm">
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsMethod;
