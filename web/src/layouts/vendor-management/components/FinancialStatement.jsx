import React from "react";
import DataTable from "../../../components/table";

const FinancialStatement = () => {
  const table = {
    colums: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "purchaseDate", header: "PurChase Date" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "orderAmount", header: "Order Amount(DR)" },
      { accessorKey: "paymentAmount", header: "Payment Amount(CR)" },
      { accessorKey: "balance", header: "Balance" },
    ],
    data: [
      {
        id: 1,
        purchaseDate: "2024-11-01",
        description: "Opening Balance",
        orderAmount: "NPR 10,000",
        paymentAmount: "",
        balance: "NPR 20,000",
      },
      {
        id: 2,
        purchaseDate: "2024-11-01",
        description: "Opening Balance",
        orderAmount: "",
        paymentAmount: "NPR 5000",
        balance: "NPR 20,000",
      },
      {
        id: 3,
        purchaseDate: "2024-11-01",
        description: "Opening Balance",
        orderAmount: "NPR 10,000",
        paymentAmount: "NPR 5000",
        balance: "NPR 10,000",
      },
      {
        id: 4,
        purchaseDate: "2024-11-01",
        description: "Opening Balance",
        orderAmount: "NPR 10,000",
        paymentAmount: "",
        balance: "NPR 20,000",
      },
      {
        id: 5,
        purchaseDate: "2024-11-01",
        description: "Opening Balance",
        orderAmount: "",
        paymentAmount: "NPR 5000",
        balance: "NPR 10,000",
      },
    ],
  };
  console.log("State: Financial Statement");
  return (
    <div>
      <DataTable
        columns={table?.colums}
        data={table?.data}
        entriesPerPage={10}
      />
    </div>
  );
};

export default FinancialStatement;
