import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

export default function VendorDetailsDialog({
  open,
  onClose,
  mode,
  vendorDetails,
}) {
  const [formData, setFormData] = useState({
    vendorId: "",
    businessType: "",
    name: "",
    province: "",
    district: "",
    address: "",
  });

  useEffect(() => {
    if (mode === "edit" && vendorDetails) {
      setFormData(vendorDetails);
    } else if (mode === "add") {
      setFormData({
        vendorId: "",
        businessType: "",
        name: "",
        province: "",
        district: "",
        address: "",
      });
    }
  }, [mode, vendorDetails]);

  console.log("vendorDetails", vendorDetails);

  console.log("formdata", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Add logic to save or update vendor details
    onClose(); // Close dialog after submission
  };

  return (
    <div>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-10 ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="bg-white w-full sm:max-w-2xl max-w-lg md:max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              console.log(formJson);
            }}
          >
            {/* Dialog Title */}
            <div className="bg-[#669CB8] relative flex justify-between items-center text-white text-center py-4 rounded-t-lg">
              <h2 className="mx-auto text-xl font-semibold uppercase">
                {mode === "add" ? "Add Vendor Details" : "Edit Vendor Details"}
              </h2>
              <CancelIcon
                className="absolute cursor-pointer right-5"
                sx={{ scale: "1.3" }}
                onClick={onClose}
              />
            </div>

            {/* Dialog Content */}
            <div className="p-6 space-y-10">
              <div>
                {/* General Information */}
                <h3 className="flex flex-row items-center gap-2 mb-4 text-lg font-semibold">
                  <span className="bg-white shadow-xl px-[4px] py-[2px] rounded-md border-2 border-gray-300">
                    <HeadsetMicIcon className="text-gray-300" />
                  </span>
                  General Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[
                    { label: "Vendor ID", name: "vendorId", type: "text" },
                    {
                      label: "Business Type",
                      name: "businessType",
                      type: "select",
                      options: ["Type1", "Type2"],
                    },
                    { label: "Vendor Name", name: "name", type: "text" },
                    { label: "Province", name: "province", type: "text" },
                    { label: "District", name: "district", type: "text" },
                    { label: "Address", name: "address", type: "text" },
                  ].map((field) =>
                    field.type === "select" ? (
                      <div
                        key={field.name}
                        className="flex flex-col gap-[10px]"
                      >
                        <label>{field.label}</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div
                        key={field.name}
                        className="flex flex-col gap-[10px]"
                      >
                        <label>{field.label}</label>
                        <input
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          placeholder={`Enter ${field.label}`}
                          onChange={handleChange}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="flex flex-row items-center gap-2 mb-4 text-lg font-semibold">
                  <span className="bg-white shadow-xl px-[4px] py-[2px] rounded-md border-2 border-gray-300">
                    <HeadsetMicIcon className="text-gray-300" />
                  </span>
                  Business Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col gap-[10px]">
                    <label>Company Number</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="text"
                      name="companyNumber"
                      placeholder="Enter Company Number"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label>Permanent Account Number(PAN)</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="text"
                      name="pan"
                      placeholder="Enter PAN"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="flex flex-row items-center gap-2 mb-4 text-lg font-semibold">
                  <span className="bg-white shadow-xl px-[4px] py-[2px] rounded-md border-2 border-gray-300">
                    <HeadsetMicIcon className="text-gray-300" />
                  </span>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col gap-[10px]">
                    <label>Contact Person</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="text"
                      name="contactPerson"
                      placeholder="Enter Contact Person"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label>Contact Person Number</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="text"
                      name="contactPersonNumber"
                      placeholder="Enter Contact Person Number"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label>Email Address</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="email"
                      name="email"
                      placeholder="Enter Email Address"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="flex flex-row items-center gap-2 mb-4 text-lg font-semibold">
                  <span className="bg-white shadow-xl px-[4px] py-[2px] rounded-md border-2 border-gray-300">
                    <HeadsetMicIcon className="text-gray-300" />
                  </span>
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col gap-[10px]">
                    <label>Payment Terms</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="text"
                      name="paymentTerms"
                      placeholder="Enter Payment Terms"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label>Bank Name</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="text"
                      name="bankName"
                      placeholder="Enter Bank Name"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label>Branch</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="text"
                      name="branch"
                      placeholder="Enter Branch"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label>Account Name</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="text"
                      name="accountName"
                      placeholder="Enter Account Name"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label>Account Number</label>

                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      type="text"
                      name="accountNumber"
                      placeholder="Enter Account Number"
                    />
                  </div>
                </div>
              </div>

              <div>
                {/* Items Supplied */}
                <h3 className="flex flex-row items-center gap-2 mb-4 text-lg font-semibold">
                  <span className="bg-white shadow-xl px-[4px] py-[2px] rounded-md border-2 border-gray-300">
                    <HeadsetMicIcon className="text-gray-300" />
                  </span>
                  Items Supplied
                </h3>
                <input
                  type="file"
                  name="accountNumber"
                  placeholder="Enter Account Number"
                  className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg hover:bg-blue-50"
                ></input>
              </div>
            </div>

            {/* Dialog Actions */}
            <div className="flex justify-end gap-4 p-4 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#669CB8] text-white rounded-lg"
              >
                {mode === "edit" ? "Submit Chnages" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
