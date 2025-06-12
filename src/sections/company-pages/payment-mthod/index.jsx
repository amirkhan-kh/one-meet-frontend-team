import React from 'react'

const PaymnetMethod = () => {
  return (
    <div className="border border-[#dbd7d7] rounded-md p-4 mb-6">
      <h3 className={`text-[17px] font-semibold flex items-center gap-2 mb-3`}>Payment Methods</h3>

      <div className="flex flex-col md:flex-row items-center w-full gap-4">
        <div className={` p-4 bg-white rounded-md border border-[#dbd7d7] w-full md:w-[50%]`}>
          <h3 className='font-medium'>Saved Payment Methods</h3>
          <div className='border border-[#dbd7d7] rounded-md '>

          </div>
        </div>
        <div className={` p-4 bg-white rounded-md border border-[#dbd7d7] w-full md:w-[50%]`}>
          <h3 className='font-medium'>Billing History</h3>
          <div className='border border-[#dbd7d7] rounded-md '>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymnetMethod
