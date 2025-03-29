import Heading from '@/components/Heading';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

// Data Arrays
const itemInformation = [
  { label: 'Item Name', value: 'Chicken Breast' },
  { label: 'Category', value: 'Raw Ingredients' },
  { label: 'Type', value: 'Meats' },
  { label: 'Quantity', value: '25 KG' },
  { label: 'Expiration Date', value: '11/15/2024' },
  { label: 'Reorder Point', value: '20 KG' },
  { label: 'Unit Cost', value: '$5.00/kg' },
  { label: 'Total Cost', value: '$100.00' },
];

const otherInformation = [
  { label: 'Vendor Name', value: 'Fresh Farms' },
  { label: 'Contact Person', value: 'Aspen Calzoni' },
  { label: 'Contact Number', value: '9876005211' },
  { label: 'Date of Last Order', value: '11/15/2024' },
  { label: 'Date of Last Delivery', value: '11/15/2024' },
  { label: 'Usage Right', value: 'Daily' },
  { label: 'Status', value: 'In Stock' },
];

const Detail = () => {
  return (
    <div className="bg-[#FBFCFF] w-full h-fit py-4">
      <Heading text="Item Detail" />
      <div className="flex w-full h-full items-center justify-end pr-4">
        <button className="px-2 py-2 text-slate-400 flex items-center gap-3 border-[#669CB8] border-2 rounded-lg">
          <span>
            <FaRegEdit />
          </span>
          Edit
        </button>
      </div>

      <div className="mt-4 flex md:flex-row flex-col gap-4 items-start">
        {/* Left Section */}
        <div className="flex flex-col md:w-2/3 w-full md:h-fit h-full border-b-2 bg-white shadow-lg rounded-xl">
          <div className="flex flex-col px-4 py-6 w-full space-y-6 bg-white rounded-xl">
            {/* Item Information */}
            <h1 className="text-lg font-semibold md:text-left text-center">Item Information</h1>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 md:place-items-start place-items-center w-full gap-y-12 border-b pb-8">
              {itemInformation.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <h1 className="font-semibold text-sm">{item.label}</h1>
                  <p className="text-gray-500">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Other Information */}
            <div className="flex flex-col w-full space-y-6">
              <h1 className="text-lg font-semibold md:text-left text-center">Other Information</h1>
              <div className="grid md:grid-cols-4 grid-cols-1 md:place-items-start place-items-center w-full gap-y-12">
                {otherInformation.map((info, index) => (
                  <div key={index} className="flex flex-col">
                    <h1 className="font-semibold text-sm">{info.label}</h1>
                    <p className="text-gray-500">{info.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 w-full h-full md:h-[30rem] bg-white rounded-xl shadow-lg">
          <img src="chicken.svg" alt="Chicken Breast" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Detail;
