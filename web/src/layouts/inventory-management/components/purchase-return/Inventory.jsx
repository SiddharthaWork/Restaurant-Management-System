"use client";
import { useState } from "react";
import DataTable from "@/components/table";
import Filter from "./Filter";
import Heading from "@/components/Heading";

const table = {
    columns: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "billNumber", header: "Bill Number" },
      { accessorKey: "item", header: "Item" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "qty", header: "Quantity" },
      { accessorKey: "unitCost", header: "Unit Cost" },
      { accessorKey: "vendor", header: "Vendor" },
      { accessorKey: "expDate", header: "Expiry Date" },
    ],
    data: [
      {
        id: 1,
        billNumber: "123",
        item: "Item 1",
        category: "Category 1",
        type: "Type 1",
        qty: 10,
        unitCost: 100,
        vendor: "Vendor A",
        expDate: "2024-12-25",
      },
      {
        id: 2,
        billNumber: "124",
        item: "Item 2",
        category: "Category 2",
        type: "Type 2",
        qty: 20,
        unitCost: 150,
        vendor: "Vendor B",
        expDate: "2024-12-26",
      },
      {
        id: 3,
        billNumber: "125",
        item: "Item 3",
        category: "Category 3",
        type: "Type 3",
        qty: 30,
        unitCost: 200,
        vendor: "Vendor C",
        expDate: "2024-12-27",
      },
      {
        id: 4,
        billNumber: "126",
        item: "Item 4",
        category: "Category 4",
        type: "Type 4",
        qty: 40,
        unitCost: 250,
        vendor: "Vendor D",
        expDate: "2024-12-28",
      },
      {
        id: 5,
        billNumber: "127",
        item: "Item 5",
        category: "Category 5",
        type: "Type 5",
        qty: 50,
        unitCost: 300,
        vendor: "Vendor E",
        expDate: "2024-12-29",
      },
      {
        id: 6,
        billNumber: "128",
        item: "Item 6",
        category: "Category 6",
        type: "Type 6",
        qty: 60,
        unitCost: 350,
        vendor: "Vendor F",
        expDate: "2024-12-30",
      },
      {
        id: 7,
        billNumber: "129",
        item: "Item 7",
        category: "Category 7",
        type: "Type 7",
        qty: 70,
        unitCost: 400,
        vendor: "Vendor G",
        expDate: "2024-12-31",
      },
    ],
  };
  

const Inventory = () => {
    const [showFilterModal, setShowFilterModal] = useState(false); // State to toggle Entry visibility

   

    const openFilter = () => {
        setShowFilterModal(true);
    };

    const closeFilter = () => {
        setShowFilterModal(false);
    };

    const closeadditemclick = () => {
        setShowEntry(false);
    };

    return (
        <div className="bg-[#FBFCFF] w-full h-full space-y-4">
            {/* Header */}
          
            <Heading text="Purchase Return History" />


            {/* Inventory Navigation */}
          
            {/* Filter Modal */}
            {showFilterModal && <Filter onclose={closeFilter} />}

            {/* Action Bar */}


            {/* Add Item Form */}

            {/* Table */}
            <DataTable
                 columns={table?.columns}
                 data={table?.data}
                 entriesPerPage={10}
                 canSearch={true}
                 download={true}
                 export={true}
                 print={true}
                 filter={true}
           />

        </div>
    );
};

export default Inventory;
