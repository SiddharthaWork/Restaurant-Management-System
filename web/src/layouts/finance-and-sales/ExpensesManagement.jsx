import Heading from '@/components/Heading';
import DataTable from '@/components/table';
import React, { useCallback } from 'react';
import { FaCircle } from "react-icons/fa6";
import Expenses from '../../assets/images/expense.svg';
import Chart from './components/Graph';
import CustomButton from '@/components/CustomButton';
import { Plus } from "lucide-react";
import { FaAngleDown } from "react-icons/fa";
import { Action } from "@/components/TableAction";
import { useState } from 'react';
import CustomForm from './components/ExpensesForm';




const ExpensesManagement = () => {
 const [open, setOpen] = useState(false);
 const handleOpen = useCallback(() => setOpen(true), []);
 const handleClose = useCallback(() => setOpen(false), []);



  const option = [
    { name: "Option A", icon: <FaCircle />, price: "$30" },
    { name: "Option A", icon: <FaCircle />, price: "$30" },
    { name: "Option A", icon: <FaCircle />, price: "$30" },
    { name: "Option A", icon: <FaCircle />, price: "$30" },
    { name: "Option A", icon: <FaCircle />, price: "$30" },
    { name: "Option A", icon: <FaCircle />, price: "$30" },
  ];

  const table = {
    columns: [
      { accessorKey: "id", header: "#" },
      { accessorKey: "date", header: "DATE" },
      { accessorKey: "expense_id", header: "EXPENSE ID" },
      { accessorKey: "category", header: "CATEGORY" },
      { accessorKey: "linked_purchase_id", header: "LINKED PURCHASE ID" },
      { accessorKey: "description", header: "DESCRIPTION" },
      { accessorKey: "amount", header: "AMOUNT (RS)" },
      { accessorKey: "payment_mode", header: "PAYMENT MODE" },
      { accessorKey: "notes", header: "NOTES" },
      { accessorKey: "action", header: "ACTION" },
    ],
    data: [
      {
        id: 1,
        date: "11/25/2024",
        expense_id: "EX-10234",
        category: "Inventory",
        linked_purchase_id: "PR-10234",
        description: "Vegetables purchase",
        amount: "10000",
        payment_mode: "QR",
        notes: "Auto-linked from Purchase",
        action: <Action />,
      },
      {
        id: 2,
        date: "11/25/2024",
        expense_id: "EX-10234",
        category: "Maintenance",
        linked_purchase_id: "N/A",
        description: "Refrigerator repair",
        amount: "15000",
        payment_mode: "Cash",
        notes: "Emergency repair",
        action: <Action />,
      },
      {
        id: 3,
        date: "11/25/2024",
        expense_id: "EX-10234",
        category: "Utilities",
        linked_purchase_id: "N/A",
        description: "Electricity bill",
        amount: "25000",
        payment_mode: "Cash",
        notes: "October bill",
        action: <Action />,
      },
      {
        id: 4,
        date: "11/25/2024",
        expense_id: "EX-10234",
        category: "Salaries",
        linked_purchase_id: "N/A",
        description: "Chef salary",
        amount: "50000",
        payment_mode: "Card",
        notes: "November payment",
        action: <Action />,
      },
    ],
  };
  

  return (
    <div className="w-full h-full space-y-4 px-4">
      <Heading text="Expenses Management" />
      <DataTable
        columns={table?.columns}
        data={table?.data}
        csv={true}
        print={true}
        download={true}
        filter={true}
        content={
          <div className="w-full h-full flex flex-col lg:flex-row justify-center bg-[#FBFCFF] gap-4 pb-2">
            <div className="lg:w-1/2 w-full h-full">
              <Chart />
            </div>

            <div className="w-full lg:w-1/2 xl:h-[29rem] h-full flex flex-col  border border-gray-200 bg-white rounded-lg shadow-md px-6 py-4">
              <h1 className="text-lg font-semibold mb-4 text-center lg:text-left xs:pt-6">
                Category wise Expense Tracking
              </h1>
              <div className="flex flex-col justify-center items-center my-auto md:flex-row md:gap-4">
                <div className="md:w-1/2 w-full h-full mb-4 md:mb-0">
                  <img
                    src={Expenses}
                    alt="Expense"
                    className="md:w-full md:h-full w-[14rem] object-cover rounded-md"
                  />
                </div>

                <div className="md:w-1/2 w-full h-full space-y-4 flex flex-col justify-center items-center">
                  {option.map((item, index) => (
                    <div key={index} className="flex flex-row w-full h-fit">
                      <div className="flex items-center gap-2 flex-1 h-fit">
                        <span>{item.icon}</span>
                        <h1 className="xl:text-lg lg:text-base text-sm font-bold">{item.name}</h1>
                      </div>
                      <div className="flex justify-end items-center gap-2 h-fit">
                        <h1 className="xl:text-lg lg:text-base text-sm font-bold">{item.price}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <button className='flex px-2 py-[0.5rem] items-center justify-center gap-6 bg-white text-[#585858] text-sm rounded-md border border-[#585858]/50 shadow-md'>
        Today
        <span className='flex '>
        <FaAngleDown />
        </span>
        </button>
        <CustomButton text="Add Item" 
            onClick={handleOpen}
            startIcon={<Plus size={16} />}
            size="medium"
              >
                New Expenses 
              </CustomButton>


      </DataTable>
      <CustomForm open={open} onClose={handleClose}/>

    </div>
  );
};

export default ExpensesManagement;
