import { useCallback, useState } from "react";
import DataTable from "../../../components/table";
import { Badge } from "./VendorList";
import PurchaseDetailsDialog from "./DetailsDialog";

const PurchaseHistory = () => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  console.log("State: Purchase History");

  const handleDialogOpen = useCallback(() => {
    setDetailsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setDetailsDialogOpen(false);
  }, []);

  const handleDetailsClick = useCallback(
    (vendor) => {
      console.log("Details clicked for vendor:", vendor);
      setSelectedPurchase(vendor);
      handleDialogOpen();
    },
    [handleDialogOpen]
  );

  const table = {
    colums: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "purchaseId", header: "Purchse ID" },
      { accessorKey: "name", header: "Vendor Name" },
      { accessorKey: "purchaseDate", header: "Purchse Date" },
      { accessorKey: "itemSupplied", header: "Item Supplied" },
      { accessorKey: "quantity", header: "QTY" },
      { accessorKey: "totalAmount", header: "Total Amount" },
      { accessorKey: "totalPaid", header: "Total Paid" },
      { accessorKey: "remainingBalance", header: "Remaining Balance" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "deliverStatus", header: "Deliver Status" },
      { accessorKey: "action", header: "Action" },
    ],
    data: [
      {
        id: 1,
        purchaseId: "#PRD1023",
        name: "Fresh Farm",
        purchaseDate: "2024-11-01",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        quantity: ["30 KG", "50 KG"].join("  "),
        totalAmount: "RS 165,000",
        totalPaid: "RS 165,000",
        remainingBalance: "RS 0",
        status: <Badge status="paid" />,
        deliverStatus: <Badge status="delivered" />,
        action: (
          <DetailsButton
            handleDetailsClick={() =>
              handleDetailsClick({ id: 1, name: "Fresh Farm" })
            }
          />
        ),
      },
      {
        id: 2,
        purchaseId: "#PRD1023",
        name: "Olivano Co.",
        purchaseDate: "2024-11-01",
        itemSupplied: ["Oils", "Spices"].join(", "),
        quantity: ["30 KG", "50 KG"].join("  "),
        totalAmount: "RS 165,000",
        totalPaid: "RS 100,000",
        remainingBalance: "RS 65,000",
        status: <Badge status="due" />,
        deliverStatus: <Badge status="delivered" />,
        action: (
          <DetailsButton
            handleDetailsClick={() =>
              handleDetailsClick({ id: 2, name: "Olivano Co." })
            }
          />
        ),
      },
      {
        id: 3,
        purchaseId: "#PRD1023",
        name: "Mariln Imp",
        purchaseDate: "2024-11-01",
        itemSupplied: "Cleaning Supplies",
        quantity: ["30 KG", "50 KG"].join("  "),
        totalAmount: "RS 200,000",
        totalPaid: "RS 155,000",
        remainingBalance: "RS 45,000",
        status: <Badge status="overdue" />,
        deliverStatus: <Badge status="delivered" />,
        action: (
          <DetailsButton
            handleDetailsClick={() =>
              handleDetailsClick({ id: 3, name: "Mariln Imp" })
            }
          />
        ),
      },
      {
        id: 4,
        purchaseId: "#PRD1023",
        name: "Fresh Farm",
        purchaseDate: "2024-11-01",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        quantity: ["30 KG", "50 KG"].join("  "),
        totalAmount: "RS 165,000",
        totalPaid: "RS 165,000",
        remainingBalance: "RS 0",
        status: <Badge status="advanced" />,
        deliverStatus: <Badge status="delivered" />,
        action: (
          <DetailsButton
            handleDetailsClick={() =>
              handleDetailsClick({ id: 4, name: "Fresh Farm" })
            }
          />
        ),
      },
      {
        id: 5,
        purchaseId: "#PRD1023",
        name: "Fresh Farm",
        purchaseDate: "2024-11-01",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        quantity: ["30 KG", "50 KG"].join("  "),
        totalAmount: "RS 165,000",
        totalPaid: "RS 0",
        remainingBalance: "RS 65,000",
        status: <Badge status="due" />,
        deliverStatus: <Badge status="delivered" />,
        action: (
          <DetailsButton
            handleDetailsClick={() =>
              handleDetailsClick({ id: 5, name: "Fresh Farm" })
            }
          />
        ),
      },
    ],
  };
  return (
    <div>
      <DataTable
        columns={table?.colums}
        data={table?.data}
        entriesPerPage={10}
      />{" "}
      <PurchaseDetailsDialog
        open={detailsDialogOpen}
        onClose={handleDialogClose}
        mode="edit"
        vendorDetails={selectedPurchase}
      />
    </div>
  );
};

export default PurchaseHistory;

export const DetailsButton = ({ handleDetailsClick }) => {
  return (
    <div className={`px-4 py-2 rounded-md text-white bg-[#51B0AA]`}>
      <button className="" onClick={handleDetailsClick}>
        Details
      </button>
    </div>
  );
};
