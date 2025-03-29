import DynamicTab from "@/components/DynamicTab";
import Heading from "@/components/Heading";
import React, { useCallback, useState } from "react";
import FreshfarmImg from "../../../assets/images/vendor/FreshFarm.svg";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { Link } from "react-router-dom";
import PurchaseHistory from "./PurchaseHistory";
import FinancialStatement from "./FinancialStatement";
// import { vendorDetailsTabsOption } from "./vendorDetailsTabsOption";
import VendorList from "./VendorList";
import { vendorTabsOption } from "./vendorTabsOption";

const VendorDescription = () => {
  const [value, setValue] = useState("vendor-list");

  const handleTabChange = useCallback((state) => {
    setValue(state);
  }, []);
  return (
    <div>
      <Heading text="Vendor Detail" />
      <DynamicTab
        tabOption={vendorTabsOption}
        value={value}
        handleTabChange={handleTabChange}
      />
      {value === "vendor-list" ? (
        <VendorDetails />
      ) : value === "purchase-history" ? (
        <PurchaseHistory />
      ) : (
        <FinancialStatement />
      )}
    </div>
  );
};

export default VendorDescription;

export const VendorDetails = () => {
  return (
    <div>
      <div className="w-full">
        <div className="flex flex-col w-full gap-5 px-5 py-8 rounded-md shadow-md md:gap-4 md:flex-row bg-slate-100">
          <div className="md:w-[15%] w-full flex items-center justify-center">
            <img
              src={FreshfarmImg}
              className="md:w-[90%] md:h-[90%] w-[40%] h-[40%]"
            ></img>
          </div>
          <div className="md:w-[85%] w-full md:gap-4 gap-6 flex flex-col lg:flex-row">
            <div className="lg:w-[75%] w-full flex flex-col gap-4">
              <div className="flex flex-row items-center justify-start gap-4">
                <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-[#3E3E3E]">
                  name
                </h2>
                <div className="rounded-full bg-[#D6F1ED] w-8 h-8 flex items-center justify-center">
                  <CallIcon sx={{ color: "#51B0AA", fontSize: "20px" }} />
                </div>
                <div className="rounded-full bg-[#D6F1ED] w-8 h-8 flex items-center justify-center">
                  <EmailIcon sx={{ color: "#51B0AA", fontSize: "20px" }} />
                </div>
              </div>
              <div className="flex flex-row items-center gap-5">
                <div className="flex flex-row items-center text-[#585858] gap-2">
                  <span>
                    <BusinessIcon />
                  </span>
                  <p className="md:text-sm text-xs lg:text-[15px]">
                    FF2024-V001
                  </p>
                </div>
                <div className="flex flex-row items-center text-[#585858] gap-2">
                  <span>
                    <BusinessIcon />
                  </span>
                  <p className="md:text-sm text-xs lg:text-[15px]">
                    Agricultural Produce Supplier{" "}
                  </p>
                </div>
                <div className="flex flex-row items-center text-[#585858] gap-2">
                  <span>
                    <FmdGoodOutlinedIcon />
                  </span>
                  <p className="md:text-sm text-xs lg:text-[15px]">
                    Sundarbasti , Bhangal, Kathmandu 44600{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-3 border border-gray-400 rounded-md">
                <h3>Items Supplied</h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-4">
                  <li className="px-3 py-1 bg-[#FEF2F3] text-[#D02E53] rounded-2xl">
                    Apples
                  </li>
                  <li className="px-3 py-1 bg-[#FEF2F3] text-[#D02E53] rounded-2xl">
                    Bananas
                  </li>
                  <li className="px-3 py-1 bg-[#FEF2F3] text-[#D02E53] rounded-2xl">
                    Oranges
                  </li>
                  <li className="px-3 py-1 bg-[#FEF2F3] text-[#D02E53] rounded-2xl">
                    Papaya
                  </li>
                  <li className="bg-[#F4EBFC] text-[#974ECF] px-3 py-1 rounded-2xl">
                    Cauliflower
                  </li>
                  <li className="bg-[#F4EBFC] text-[#974ECF] px-3 py-1 rounded-2xl">
                    Spinach
                  </li>
                  <li className="bg-[#F4EBFC] text-[#974ECF] px-3 py-1 rounded-2xl">
                    Carrots
                  </li>
                  <li className="bg-[#F4EBFC] text-[#974ECF] px-3 py-1 rounded-2xl">
                    Potatoes
                  </li>
                  <li className="bg-[#E5FFDF] text-[#42AB49] px-3 py-1 rounded-2xl">
                    Avocado
                  </li>
                  <li className="bg-[#E5FFDF] text-[#42AB49] px-3 py-1 rounded-2xl">
                    Kiwi
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-[25%] w-full flex flex-row gap-3 items-start lg:justify-center justify-start">
              <Link to="/dashboard/inventory-management/vendor-management/purchasehistory">
                <button className="bg-[#51B0AA] text-white px-3 py-2 rounded-md shadow-md">
                  Purchase Details
                </button>
              </Link>
              <button className="bg-white border-2 border-[#51B0AA] px-3 py-[7px] rounded-md">
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 py-10 gap-y-8 gap-x-8 md:grid-cols-2">
          <div className="p-4 rounded-md shadow-md bg-slate-100">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center gap-2">
                <span className="bg-white shadow-xl px-[4px] py-[2px] rounded-md border-2 border-gray-300">
                  <HeadsetMicIcon className="text-gray-300" />
                </span>
                <p>Conatct Information</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <div>
                  <p className="text-[#AAAAAA]">Contact Person</p>
                  <p className="text-lg font-medium">Sundarlal Gurung</p>
                </div>
                <div>
                  <p className="text-[#AAAAAA]">Contact Number</p>
                  <p className="text-lg font-medium">+977-123457654</p>
                </div>
                <div>
                  <p className="text-[#AAAAAA]">Email Address</p>
                  <p className="text-lg font-medium">
                    SundarlalGurung@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-md shadow-md bg-slate-100">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center gap-2">
                <span className="bg-white shadow-xl px-[4px] py-[2px] rounded-md border-2 border-gray-300">
                  <HeadsetMicIcon className="text-gray-300" />
                </span>
                <p>Conatct Information</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <div>
                  <p className="text-[#AAAAAA]">Contact Person</p>
                  <p className="text-lg font-medium">Sundarlal Gurung</p>
                </div>
                <div>
                  <p className="text-[#AAAAAA]">Contact Number</p>
                  <p className="text-lg font-medium">+977-123457654</p>
                </div>
                <div>
                  <p className="text-[#AAAAAA]">Email Address</p>
                  <p className="text-lg font-medium">
                    SundarlalGurung@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-md shadow-md bg-slate-100">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center gap-2">
                <span className="bg-white shadow-xl px-[4px] py-[2px] rounded-md border-2 border-gray-300">
                  <HeadsetMicIcon className="text-gray-300" />
                </span>
                <p>Conatct Information</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <div>
                  <p className="text-[#AAAAAA]">Contact Person</p>
                  <p className="text-lg font-medium">Sundarlal Gurung</p>
                </div>
                <div>
                  <p className="text-[#AAAAAA]">Contact Number</p>
                  <p className="text-lg font-medium">+977-123457654</p>
                </div>
                <div>
                  <p className="text-[#AAAAAA]">Email Address</p>
                  <p className="text-lg font-medium">
                    SundarlalGurung@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-md shadow-md bg-slate-100">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center gap-2">
                <span className="bg-white shadow-xl px-[4px] py-[2px] rounded-md border-2 border-gray-300">
                  <HeadsetMicIcon className="text-gray-300" />
                </span>
                <p>Conatct Information</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <div>
                  <p className="text-[#AAAAAA]">Contact Person</p>
                  <p className="text-lg font-medium">Sundarlal Gurung</p>
                </div>
                <div>
                  <p className="text-[#AAAAAA]">Contact Number</p>
                  <p className="text-lg font-medium">+977-123457654</p>
                </div>
                <div>
                  <p className="text-[#AAAAAA]">Email Address</p>
                  <p className="text-lg font-medium">
                    SundarlalGurung@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
