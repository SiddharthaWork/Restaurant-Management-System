"use client";
import { useState } from "react";
import Filter from "./Filter";
import Heading from "@/components/Heading";
import DynamicTab from "@/components/DynamicTab";
import { useCallback } from "react";
import DataTable from "@/components/table";
import { Action } from "@/components/TableAction";

const Topbar = () => {
    const [showFilterModal, setShowFilterModal] = useState(false); // State to toggle Entry visibility
    const [value, setValue] = useState("inventory");
    const table = {
        columns: [
          { accessorKey: "id", header: "#" },
          { accessorKey: "item", header: "ITEM" },
          { accessorKey: "vendor", header: "VENDOR" },
          { accessorKey: "qty", header: "QTY" },
          { accessorKey: "reorderPoint", header: "REORDER POINT" },
          { accessorKey: "status", header: "STATUS" },
          { accessorKey: "action", header: "ACTION" },
        ],
        data: [
          {
            id: 1,
            item: "Chicken Breast",
            vendor: "Fresh Farms",
            qty: "25 KG",
            reorderPoint: "20 kg",
            status: (
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-green-700 bg-green-100">
                IN STOCK
              </span>
            ),
            action: <Action />,
          },
          {
            id: 2,
            item: "Olive Oil",
            vendor: "Fresh Farms",
            qty: "25 KG",
            reorderPoint: "20 kg",
            status: (
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-yellow-700 bg-yellow-100">
                LOW STOCK
              </span>
            ),
            action: <Action />,
          },
          {
            id: 3,
            item: "Salt",
            vendor: "Fresh Farms",
            qty: "25 KG",
            reorderPoint: "20 kg",
            status: (
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-red-700 bg-red-100">
                NO STOCK
              </span>
            ),
            action: <Action />,
          },
          {
            id: 4,
            item: "Salmon Fillet",
            vendor: "Fresh Farms",
            qty: "25 KG",
            reorderPoint: "20 kg",
            status: (
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-blue-700 bg-blue-100">
                ON ORDER
              </span>
            ),
            action: <Action />,
          },
          {
            id: 5,
            item: "Mozzarella Cheese",
            vendor: "Fresh Farms",
            qty: "25 KG",
            reorderPoint: "20 kg",
            status: (
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 bg-gray-200">
                Expired
              </span>
            ),
            action: <Action />,
          },
        ],
      };
        


   
    const openFilter = () => {
        setShowFilterModal(true);
    };

    const closeFilter = () => {
        setShowFilterModal(false);
    };

    const onchange = useCallback((status) => {
        setValue(status);
      }, []);


    

    return (
        <div className="bg-[#FBFCFF] w-full h-full space-y-4">
            {/* Header */}
            <Heading text="Stock Level" />

            {/* Inventory Navigation */}
        
            <DynamicTab 
        value={value}
        handleTabChange={onchange}
        tabOption={[
          { label: "Food Inventory", value: "Food Inventory" },
          { label: "Non-Food Inventory", value: "Non-Food Inventory" },
          { label: "Beverage Inventory", value: "Beverage Inventory" },
        ]}
      />

            {/* Filter Modal */}
            {showFilterModal && <Filter onclose={closeFilter} className="z-10" />}



            {/* Action Bar */}


            {/* Table */}
            {/* <Ptable className="z-0"/> */}
            <DataTable
          columns={table?.columns}
          data={table?.data}
          filter={true}
          // selectOption={false}
        />
        </div>
    );
};

export default Topbar;
