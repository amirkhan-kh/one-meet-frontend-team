import React from "react";
import { Tabs } from "antd";
import PaymentsMethod from "@/pages/company/Plans"; // to'g'ri import yo'lini yozing
import PaymentHistory from "@/sections/company-pages/payments-method"; // to'g'ri import yo'lini yozing

const CompanyPaymentsTabs: React.FC = () => {
  const onChange = (key: string) => {
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
          children: <PaymentsMetho />,
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
