import React from "react";
import { Tabs } from "antd";
import PaymentsMethod from "@/sections/company-pages/payments-method";
import PaymentHistory from "@/sections/company-pages/payment-history-section";

const CompanyPaymentsTabs = () => {
  const onChange = (key) => {
    console.log("Active tab:", key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      type="card"
      items={[
        {
          label: "Payment Plans",
          key: "1",
          children: <PaymentsMethod />,
        },
        {
          label: "Payment History",
          key: "2",
          children: <PaymentHistory />,
        },
      ]}
    />
  );
};

export default CompanyPaymentsTabs;
