import AvailablePlans from "@/sections/company-pages/payment-history-section";
import PaymentsMethod from "@/sections/company-pages/payments-method";
// import {
  //   Dialog,
  //   DialogContent,
  //   DialogDescription,
  //   DialogFooter,
  //   DialogHeader,
  //   DialogTitle,
  //   DialogTrigger,
  // } from "@/components/ui/dialog";
  // import { Label } from "@/components/ui/label";
  // import { Input } from "@/components/ui/input";
  // import { useDispatch, useSelector } from "react-redux";
  // import { createPlan } from "@/store/company-service/payment-servce/payment-create";
  // import { useState } from "react";
  import "./style.css";
import { useSelector } from "react-redux";

export const Plans = () => {
    const company = useSelector((state) => state.companyByOwner.data);
  return (
    <div className="p-3 sm:p-6">
      <h3 className="text-[22px] sm:text-[20px] font-bold mb-2">
        Subscription Plan Management
      </h3>
      <p className="text-[13px] sm:text-[15px] font-extralight mb-5">
        Manage your subscription plan and billing details to optimize your
        recruiting process.
      </p>
  <h3 className="text-[18px] font-bold mb-5">All Methods</h3>

   <div className="my-6">
          <p className=" text-[17px] font-medium">Overivew</p>
          <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-4">
            <div className="shadow p-3 rounded-sm w-full sm:w-[50%] hover:bg-[rgb(250,250,250)] transition-colors duration-500 ease-in-out">
              <p  className="text-[13px] font-light">Credits balance</p>
              <span className="text-[19px] font-semibold text-amber-700">{company?.remainingCredits}</span>
            </div>
            <div className="shadow p-3 rounded-sm w-full sm:w-[50%] hover:bg-[rgb(250,250,250)] transition-colors duration-500 ease-in-out">
              <p className="text-[13px] font-light">Maximum Recruiters Allowed</p>
              <span className="text-[19px] font-semibold text-green-700">{company?.maxRecruiters}</span>
            </div>
          </div>
        </div>
      {/* <div className="p-4 bg-white rounded-md shadow-md flex flex-col gap-2 sm:gap-4 mb-8">
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
                <DialogTrigger className="ai-cta">Create a Plan</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className={`mb-5`}>
                      What did you plan?
                    </DialogTitle>
                    <DialogDescription>
                      <form onSubmit={handleSubmit}>
                        <DialogHeader>
                          <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                              name="name"
                              placeholder="Name..."
                              onChange={handleChange}
                              value={form.name}
                            />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="credits">Credits</Label>
                            <Input
                              name="credits"
                              type="number"
                              placeholder="Credits..."
                              onChange={handleChange}
                              value={form.credits}
                            />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="amount">Amount of Money</Label>
                            <Input
                              name="amount"
                              type="number"
                              placeholder="Amount..."
                              onChange={handleChange}
                              value={form.amount}
                            />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="currency">Currency</Label>
                            <select
                              name="currency"
                              value={form.currency}
                              onChange={handleChange}
                              className="border rounded-md p-2"
                            >
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="JPY">JPY</option>
                              <option value="CNY">CNY</option>
                              <option value="RUB">RUB</option>
                              <option value="INR">INR</option>
                              <option value="UZS">UZS</option>
                              <option value="TRY">TRY</option>
                              <option value="KZT">KZT</option>
                              <option value="KRW">KRW</option>
                            </select>
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="maxRecruiters">Recruiters +</Label>
                            <Input
                              name="maxRecruiters"
                              type="number"
                              placeholder="Add.."
                              className="w-20"
                              onChange={handleChange}
                              value={form.maxRecruiters}
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              name="active"
                              type="checkbox"
                              value={form.active}
                              checked={form.active}
                              onChange={handleChange}
                            />
                            <Label htmlFor="active">Active</Label>
                          </div>
                        </div>

                        <DialogFooter className="mt-4 flex justify-between">
                          <span></span>
                          <Button type="submit" disabled={loading}>
                            {loading ? "Yuborilmoqda..." : "Create Plan"}
                          </Button>
                          {error && <p style={{ color: "red" }}>{error}</p>}
                          {plan && (
                            <p style={{ color: "green" }}>
                              Created: {plan.name}
                            </p>
                          )}
                        </DialogFooter>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div> */}

      <PaymentsMethod />
      <AvailablePlans />
    </div>
  );
};
