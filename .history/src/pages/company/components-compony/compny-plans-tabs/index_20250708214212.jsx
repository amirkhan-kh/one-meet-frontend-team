import React from "react";
import { Tabs } from "antd";
import PaymentsMethod from "@/pages/company/Plans"; // to'g'ri import yo'lini yozing
import PaymentHistory from "@/sections/company-pages/payments-method"; // to'g'ri import yo'lini yozing

const CompanyPaymentsTabs: = () => {
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
