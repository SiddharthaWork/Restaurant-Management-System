import Heading from "../../../components/Heading";
import DataTable from "../../../components/table";
import React from "react";
import { Badge } from "./VendorList";
import { DetailsButton } from "./PurchaseHistory";

const VendorPurchaseHistory = () => {
  const table = {
    colums: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "purchaseId", header: "Purchase ID" },
      { accessorKey: "purchaseDate", header: "Purchase Date" },
      { accessorKey: "itemSupplied", header: "Item Supplied" },
      { accessorKey: "quantity", header: "QTY" },
      { accessorKey: "totalAmount", header: "Total Amount" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "deliverStatus", header: "Deliver Status" },
      { accessorKey: "action", header: "Action" },
    ],
    data: [
      {
        id: 1,
        purchaseId: "#PRD1023",
        purchaseDate: "2024-03-05",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        quantity: ["30 KG", "50 KG"].join(" "),
        totalAmount: "NPR 165,000",
        status: <Badge status="paid" />,
        deliverStatus: <Badge status="delivered" />,
        action: <DetailsButton />,
      },
      {
        id: 1,
        purchaseId: "#PRD0876",
        purchaseDate: "2012-10-08",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        quantity: ["30 KG", "50 KG"].join(" "),
        totalAmount: "NPR 165,000",
        status: <Badge status="paid" />,
        deliverStatus: <Badge status="delivered" />,
        action: <DetailsButton />,
      },
      {
        id: 1,
        purchaseId: "#PRD0876",
        purchaseDate: "2012-10-08",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        quantity: ["30 KG", "50 KG"].join(" "),
        totalAmount: "NPR 165,000",
        status: <Badge status="paid" />,
        deliverStatus: <Badge status="delivered" />,
        action: <DetailsButton />,
      },
      {
        id: 1,
        purchaseId: "#PRD0876",
        purchaseDate: "2012-10-08",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        quantity: ["30 KG", "50 KG"].join(" "),
        totalAmount: "NPR 165,000",
        status: <Badge status="paid" />,
        deliverStatus: <Badge status="delivered" />,
        action: <DetailsButton />,
      },
      {
        id: 1,
        purchaseId: "#PRD0876",
        purchaseDate: "2012-10-08",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        quantity: ["30 KG", "50 KG"].join(" "),
        totalAmount: "NPR 165,000",
        status: <Badge status="paid" />,
        deliverStatus: <Badge status="delivered" />,
        action: <DetailsButton />,
      },
    ],
  };
  return (
    <div>
      <Heading text="Vendor Purchase Histroy" />
      <DataTable
        columns={table?.colums}
        data={table?.data}
        entriesPerPage={10}
      />
    </div>
  );
};

export default VendorPurchaseHistory;
