"use client";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaDotCircle } from "react-icons/fa";


const FilterModal = ({ onclose }) => {
    const [formData, setFormData] = useState({
        category: "",
        minQty: "",
        maxQty: "",
        status: "Available",
        vendor: "fresh",
        expirationDate: "",
        type: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            category: "",
            minQty: "",
            maxQty: "",
            status: "Available",
            vendor: "fresh",
            expirationDate: "",
            type: "",
        });
    };

    const handleApply = () => {
        console.log("Applied Filters:", formData);
        onClose(); // Close the modal
    };

    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg w-[400px] p-6 relative shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaFilter size={16} />
              Filter
            </h2>
            <button onClick={onclose}>
              <RxCross2 size={24} className="text-gray-600 cursor-pointer" />
            </button>
          </div>
      
          {/* Form */}
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <label className="flex flex-col">
                <label className="text-gray-600 text-sm">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg text-gray-500"
                >
                  <option value="" disabled>
                    Select Quantity
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </label>
      
              {/* QTY */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">QTY</label>
                <div className="flex items-center gap-2">
                  <input
                    name="minQty"
                    type="number"
                    value={formData.minQty}
                    onChange={handleChange}
                    placeholder="Min"
                    className="w-full px-3 py-2 border rounded-lg text-gray-500"
                  />
                  <span className="text-gray-600">-</span>
                  <input
                    name="maxQty"
                    type="number"
                    value={formData.maxQty}
                    onChange={handleChange}
                    placeholder="Max"
                    className="w-full px-3 py-2 border rounded-lg text-gray-500"
                  />
                </div>
              </div>
      
              {/* Other Fields */}
              <label className="flex flex-col">
                <span className="text-gray-600 text-sm">Status</span>
                <div className="flex border rounded-lg items-center px-2">
                    <FaDotCircle color="lightgreen" />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-lg text-gray-500 outline-none bg-transparent flex-1"
                >
                    
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                </div>
              </label>
      
              <label className="flex flex-col">
                <span className="text-gray-600 text-sm">Vendor</span>
                <select
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg text-gray-500"
                >
                  <option value="fresh">Fresh</option>
                  <option value="local">Local</option>
                </select>
              </label>
      
              <label className="flex flex-col">
                <span className="text-gray-600 text-sm">Expiration Date</span>
                <input
                  name="expirationDate"
                  type="date"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg text-gray-500"
                />
              </label>
      
              <label className="flex flex-col">
                <span className="text-gray-600 text-sm">Type</span>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg text-gray-500"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </label>
            </div>
          </div>
      
          {/* Footer */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleReset}
              className="px-6 py-2 border rounded-lg text-gray-500"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-[#51B0AA] text-white rounded-lg"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      
    );
};

export default FilterModal;
