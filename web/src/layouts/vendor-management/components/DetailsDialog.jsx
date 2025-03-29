import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { Eye } from "lucide-react";

export default function PurchaseDetailsDialog({
  open,
  onClose,
  vendorDetails,
}) {
  //   const [formData, setFormData] = useState({
  //     vendorId: "",
  //     businessType: "",
  //     name: "",
  //     province: "",
  //     district: "",
  //     address: "",
  //   });

  //   useEffect(() => {
  //     if (mode === "edit" && vendorDetails) {
  //       setFormData(vendorDetails);
  //     } else if (mode === "add") {
  //       setFormData({
  //         vendorId: "",
  //         businessType: "",
  //         name: "",
  //         province: "",
  //         district: "",
  //         address: "",
  //       });
  //     }
  //   }, [mode, vendorDetails]);

  console.log("vendorDetails", vendorDetails);

  //   console.log("formdata", formData);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Submitted Data:", formData);
  //     // Add logic to save or update vendor details
  //     onClose(); // Close dialog after submission
  //   };

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
        className={`fixed inset-0 z-50 flex items-center justify-center md:p-10 p-6 ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="bg-white w-full overflow-x-auto overflow-y-auto sm:max-w-2xl max-w-lg md:max-w-5xl max-h-[90vh] rounded-lg shadow-lg">
          <div className="h-[80vh] w-full">
            <div className="bg-[#669CB8] relative flex justify-between w-full items-center text-white text-center py-4 rounded-t-lg">
              <h2 className="mx-auto text-xl font-semibold uppercase">
                Details{" "}
              </h2>
              <CancelIcon
                className="absolute cursor-pointer right-5"
                sx={{ scale: "1.3" }}
                onClick={onClose}
              />
            </div>
            <div className="flex flex-col items-start w-full h-full p-6 bg-white rounded-lg shadow-md">
              <button className="flex rounded-md text-[#73798F] flex-row items-center self-end justify-center gap-1 border-2 border-[#669CB8] px-3 py-2">
                <Eye />
                <span>Invoice photo</span>
              </button>
              <table className="w-full mt-10 h-[70%] text-sm text-left border border-collapse border-gray-200 table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border border-gray-200">
                      Category
                    </th>
                    <th className="px-4 py-2 border border-gray-200">Item</th>
                    <th className="px-4 py-2 border border-gray-200">QTY</th>
                    <th className="px-4 py-2 border border-gray-200">
                      Unit Price (Rs)
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Total Cost (Rs)
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Category Total (Rs)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="px-4 py-2 border border-gray-200"
                      rowSpan="3"
                    >
                      Fruits
                    </td>
                    <td className="px-4 py-2 border border-gray-200">Mango</td>
                    <td className="px-4 py-2 border border-gray-200">5 KG</td>
                    <td className="px-4 py-2 border border-gray-200">
                      Rs 200 / kg
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      Rs 1000
                    </td>
                    <td
                      className="px-4 py-2 border border-gray-200"
                      rowSpan="3"
                    >
                      Rs 2800
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200">Papaya</td>
                    <td className="px-4 py-2 border border-gray-200">10 KG</td>
                    <td className="px-4 py-2 border border-gray-200">
                      Rs 120 / kg
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      Rs 1200
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200">Peach</td>
                    <td className="px-4 py-2 border border-gray-200">2 KG</td>
                    <td className="px-4 py-2 border border-gray-200">
                      Rs 300 / kg
                    </td>
                    <td className="px-4 py-2 border border-gray-200">Rs 600</td>
                  </tr>
                  <tr>
                    <td
                      className="px-4 py-2 border border-gray-200"
                      rowSpan="2"
                    >
                      Vegetables
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      Potatoes
                    </td>
                    <td className="px-4 py-2 border border-gray-200">20 KG</td>
                    <td className="px-4 py-2 border border-gray-200">
                      Rs 50 / kg
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      Rs 1000
                    </td>
                    <td
                      className="px-4 py-2 border border-gray-200"
                      rowSpan="2"
                    >
                      Rs 1400
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200">
                      Tomatoes
                    </td>
                    <td className="px-4 py-2 border border-gray-200">10 KG</td>
                    <td className="px-4 py-2 border border-gray-200">
                      Rs 40 / kg
                    </td>
                    <td className="px-4 py-2 border border-gray-200">Rs 400</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      className="px-4 py-2 font-bold text-right border border-gray-200"
                      colSpan="5"
                    >
                      Sub-total
                    </td>
                    <td className="px-4 py-2 font-bold border border-gray-200">
                      Rs 3200
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Dialog Content */}
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
