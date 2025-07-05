import React from "react";

const PaymentsMethod = () => {
  return (
    <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white">
      <h3 className="text-[18px] font-bold">Payment Methods</h3>

      <div className=" w-full gap-3">
        <div className=" p-3 rounded-md">
          <p className=" text-[17px] font-medium">Overivew</p>
          <div className="flex items-center w-full justify-between">
            <div className="shadow-sm p-3 rounded-sm w-[50%]"> </div>
            <div className="shadow-sm p-3 rounded-sm w-[50%]"></div>
          </div>
        </div>
        <div className="shadow-md p-3 rounded-md">
          <p className=" text-[17px] font-medium">Saved Payment Methods</p>
          <div className="shadow-sm p-3 rounded-sm">
            <div className="flex items-center justify-between">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsMethod;
