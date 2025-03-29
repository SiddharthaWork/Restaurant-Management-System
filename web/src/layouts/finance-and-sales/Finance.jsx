import CustomButton from '@/components/CustomButton';
import Heading from '@/components/Heading'
import React from 'react'
import DataTable from '@/components/table';
import { FaAngleDown } from 'react-icons/fa';
import IncomeTracking from './components/IncomeTracking';

const Finance = () => {
    const table = {
        columns: [
            { accessorKey: "id", header: "ID" },
            { accessorKey: "date", header: "Date" },
            { accessorKey: "invoiceNo", header: "Invoice No" },
            { accessorKey: "source", header: "Source" },
            { accessorKey: "paymentMode", header: "Payment Mode" },
            { accessorKey: "amount", header: "Amount (Rs)" },
        ],
        data: [
            {
                id: 1,
                date: "11/25/2024",
                invoiceNo: "IN-10234",
                source: "Dine-In",
                paymentMode: "Cash",
                amount: 180,
            },
            {
                id: 2,
                date: "11/25/2024",
                invoiceNo: "IN-10234",
                source: "Delivery",
                paymentMode: "QR",
                amount: 230,
            },
            {
                id: 3,
                date: "11/25/2024",
                invoiceNo: "IN-10234",
                source: "Take away",
                paymentMode: "Card",
                amount: 180,
            },
            {
                id: 4,
                date: "11/25/2024",
                invoiceNo: "IN-10234",
                source: "Dine-In",
                paymentMode: "Card",
                amount: 290,
            },
            {
                id: 5,
                date: "11/25/2024",
                invoiceNo: "IN-10234",
                source: "Take away",
                paymentMode: "Card",
                amount: 250,
            },
        ],
    };
    const defaultData = [];
    const defaultColumns = [];



    return (
        <div className='w-full h-full px-4'>
            <Heading text="Sales" />
            <div className='w-full h-full md:flex-row flex-col flex gap-6'>
                <div className='md:w-1/3 w-full h-full'>
                <IncomeTracking/> 
                </div>
                <div className='md:w-2/3 w-full h-full relative'>
            <DataTable data={table.data} columns={table.columns}
             entriesPerPage={10}
             canSearch={true}
             download={true}
             export={true}
             print={true}
             filter={true}
            content={
                <>
                <div className='flex justify-end'>
                <div className='absolute left-0 flex justify-start items-center'>
                <button className='flex px-6 py-[0.5rem] items-center justify-center gap-6 bg-white text-[#585858] text-sm rounded-bl-lg border border-[#585858]/50 shadow-md'>
                All
                </button>
                <button className='flex px-6 py-[0.5rem] items-center justify-center gap-6 bg-white text-[#585858] text-sm border border-[#585858]/50 shadow-md'>
                Sales
                </button>
                <button className='flex px-6 py-[0.5rem] items-center justify-center gap-6 bg-white text-[#585858] text-sm rounded-br-md border border-[#585858]/50 shadow-md '>
                Return
                </button>
                </div>
                <div className='flex'>
                <button className='flex px-2 py-[0.5rem] items-center justify-center gap-6 bg-white text-[#585858] text-sm rounded-md border border-[#585858]/50 shadow-md'>
                    Today
                    <span className='flex '>
                        <FaAngleDown />
                    </span>
                </button>
                </div>
                </div>
                </>
            }
            >

              
            </DataTable>
            </div>
            </div>




        </div>
    )
}

export default Finance