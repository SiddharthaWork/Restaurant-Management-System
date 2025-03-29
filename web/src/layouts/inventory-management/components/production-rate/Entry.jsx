import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";


const Entry = ({ closeadditemclick }) => {
  return (
    <div className="w-full md:h-screen flex justify-center items-center sticky md:mt-0 mt-10 md:fixed md:inset-0  px-4 sm:px-10 lg:px-32 md:bg-black/10 z-50">
      <div className="w-full max-w-3xl h-auto bg-white flex flex-col rounded-xl overflow-hidden">
        {/* Header */}
        <div className="w-full h-16 bg-[#669CB8] flex items-center justify-between px-4 sm:px-6">
          <h1 className="flex-1 flex justify-center uppercase text-white font-semibold text-base sm:text-lg tracking-wider">
            Create stock Threshold
          </h1>
          <RxCrossCircled
            size={30}
            color="white"
            onClick={closeadditemclick}
            className="cursor-pointer"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col w-full h-full md:h-[20rem] p-4 space-y-6">
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <label className="flex flex-col gap-1 w-full sm:w-1/2">
              Item
              <input  
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                placeholder="Select Item"
              />
            </label>
            <label className="flex flex-col gap-1 w-full sm:w-1/3">
              Threshold
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                placeholder="20"
              />
            </label>
            <label className="flex flex-col gap-1 w-full sm:w-1/3">
              Restocking Interval
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                placeholder="Daily"
              />
            </label>
          </div>

          {/* Row 2 */}
         <div className='flex md:flex-row items-center gap-4 mt-4 md:mt-0 md:pb-0 pb-2'>
        <button className='bg-[#DC8057] text-white px-2 py-1  md:px-2 md:py-1 rounded-md flex items-center gap-2 text-sm'>
          <FaPlus />
          Add More
        </button>
      </div>


         
          {/* Submit Button */}
          <div className="flex w-full h-full items-end justify-center pb-8">
          <div className="flex justify-center items-end ">
            <button className="bg-[#669CB8] text-white px-10 py-2 rounded-lg">
              Submit
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
