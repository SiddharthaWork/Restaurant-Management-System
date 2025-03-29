import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDialog from "./VendorDialog";
import deleteicon from "../../../assets/images/vendor/deleteicon.svg";
import StarIcon from "@mui/icons-material/Star";
import { ActionButton } from "./ActionButton";
import DataTable from "../../../components/table";

const VendorList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const navigate = useNavigate();

  console.log("State: Vendor List");

  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleViewClick = useCallback(
    (vendor) => {
      console.log("Selected Vendor:", vendor);
      navigate(`${vendor.id}`);
    },
    [navigate]
  );

  const handleEditClick = useCallback(
    (vendor) => {
      console.log("Edit clicked for vendor:", vendor);
      setSelectedVendor(vendor);
      handleDialogOpen();
    },
    [handleDialogOpen]
  );

  const table = {
    colums: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Vendor Name" },
      { accessorKey: "personName", header: "Contact Person" },
      { accessorKey: "itemSupplied", header: "Item Supplied" },
      { accessorKey: "leadTime", header: "Lead Time" },
      { accessorKey: "deliveryScore", header: "Delivery Score" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "action", header: "Action" },
    ],
    data: [
      {
        id: 1,
        name: "Fresh Farm",
        personName: "Ryan Donin",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        leadTime: "2 days",
        deliveryScore: (
          <span className="flex flex-row items-center justify-center gap-[3px]">
            5 <StarIcon sx={{ color: "gold" }} />
          </span>
        ),
        status: <Badge status="paid" />,
        action: (
          <ActionButton
            handleEditClick={() =>
              handleEditClick({ id: 1, name: "Fresh Farm" })
            }
            handleViewClick={() =>
              handleViewClick({ id: 1, name: "Fresh Farm" })
            }
          />
        ),
      },
      {
        id: 2,
        name: "Olivano Co",
        personName: "Miracle Herwitz",
        itemSupplied: ["Oils", "Spices"].join(", "),
        leadTime: "6 days",
        deliveryScore: (
          <span className="flex flex-row items-center justify-center gap-[3px]">
            4 <StarIcon sx={{ color: "gold" }} />
          </span>
        ),
        status: <Badge status="due" />,
        action: (
          <ActionButton
            handleEditClick={() =>
              handleEditClick({ id: 2, name: "Olivano Co" })
            }
            handleViewClick={() =>
              handleViewClick({ id: 2, name: "Olivano Co" })
            }
          />
        ),
      },
      {
        id: 3,
        name: "Mariln Imp",
        personName: "Miracle Lubin",
        itemSupplied: "Cleaning Supplies",
        leadTime: "3 days",
        deliveryScore: (
          <span className="flex flex-row items-center justify-center gap-[3px]">
            3 <StarIcon sx={{ color: "gold" }} />
          </span>
        ),
        status: <Badge status="overdue" />,
        action: (
          <ActionButton
            handleEditClick={() =>
              handleEditClick({ id: 3, name: "Mariln Imp" })
            }
            handleViewClick={() =>
              handleViewClick({ id: 3, name: "Mariln Imp" })
            }
          />
        ),
      },
      {
        id: 4,
        name: "Fresh Farm",
        personName: "Ryan Donin",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        leadTime: "2 days",
        deliveryScore: (
          <span className="flex flex-row items-center justify-center gap-[3px]">
            1 <StarIcon sx={{ color: "gold" }} />
          </span>
        ),
        status: <Badge status="advanced" />,
        action: (
          <ActionButton
            handleEditClick={() =>
              handleEditClick({ id: 1, name: "Fresh Farm" })
            }
            handleViewClick={() =>
              handleViewClick({ id: 1, name: "Fresh Farm" })
            }
          />
        ),
      },
      {
        id: 5,
        name: "Fresh Farm",
        personName: "Ryan Donin",
        itemSupplied: ["Fruits", "Vegetables"].join(", "),
        leadTime: "2 days",
        deliveryScore: (
          <span className="flex flex-row items-center justify-center gap-[3px]">
            3 <StarIcon sx={{ color: "gold" }} />
          </span>
        ),
        status: <Badge status="due" />,
        action: (
          <ActionButton
            handleEditClick={() =>
              handleEditClick({ id: 1, name: "Fresh Farm" })
            }
            handleViewClick={() =>
              handleViewClick({ id: 1, name: "Fresh Farm" })
            }
          />
        ),
      },
    ],
  };
  return (
    <div>
      {/* <FilterationBar
        handleFirstBtnClick={handleDialogOpen}
        firstBtnText="Create Vendor"
        datePicker=""
      >
        <button className="px-6 py-[5px] flex flex-row items-center gap-2 text-white bg-[#F05D5F] rounded-md">
          <img src={deleteicon} alt="delete icon" />
          Delete
        </button>
      </FilterationBar> */}

      <DataTable
        columns={table?.colums}
        data={table?.data}
        entriesPerPage={10}
      />
      <FormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        mode="edit"
        vendorDetails={selectedVendor}
      />
    </div>
  );
};

export default VendorList;

export const Badge = ({ status }) => {
  const statusColors = {
    paid: "bg-[#DCF5D6]",
    due: "bg-[#FFF6C9]",
    overdue: "bg-[#FFDADB]",
    advanced: "bg-[#F4EBFC]",
    delivered: "bg-[#ADADAD]",
  };

  const statusTextColors = {
    paid: "text-[#42AB49]",
    due: "text-[#D7A300]",
    overdue: "text-[#E3371C]",
    advanced: "text-[#AD6FE0]",
    delivered: "text-[#FFFFFF]",
  };

  const bgColor = statusColors[status] || "bg-gray-200";
  const textColor = statusTextColors[status] || "text-gray-200";

  return (
    <div className={`px-4 py-2 rounded-2xl text-white ${bgColor} ${textColor}`}>
      <p className={`uppercase ${textColor}`}>{status}</p>
    </div>
  );
};
