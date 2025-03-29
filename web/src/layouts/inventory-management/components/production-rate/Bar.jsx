import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

const Bar = ({ openFilter, handleAddItemClick }) => {
  return (
    <div className="w-full flex flex-wrap gap-6 md:justify-between items-center mt-6 ">
      <div className="flex flex-wrap gap-4 w-full md:w-auto items-center">
       
        <div className="flex items-center w-full md:w-[20rem] px-4 py-2 rounded-lg shadow-md bg-white">
          <CiSearch className="text-gray-500 mr-2 min-h-[24px] min-w-[24px]" size={20} />
          <input
            type="text"
            placeholder="Search items"
            className="flex-1 outline-none bg-transparent"
          />
        </div>
      </div>

      
    </div>
  );
};

export default Bar;
