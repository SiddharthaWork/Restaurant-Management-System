import { Button, Card, CardContent } from "@mui/material";
import { Calendar, Edit, Mail, MapPin, Phone, Star } from "lucide-react";
import { useCallback } from "react";
import { useState } from "react";
import EmployeeCustomForm from "./EmployeeCustomForm";

export const EmployeeProfile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  return (
    <Card className="bg-white">
      <CardContent className="flex flex-col md:flex-row gap-6 p-6">
        <div className="w-48 h-48 flex-shrink-0">
          <img
            src="/api/placeholder/192/192"
            alt="Employee"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-grow">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Ashley Brown</h2>
                <span className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded">
                  Advance
                </span>
              </div>
              <div className="flex mt-2">
                {[1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <Star className="w-5 h-5 text-gray-300" />
              </div>
            </div>
            <Button
              variant="outlined"
              onClick={handleOpen}
              startIcon={<Edit size={16} />}
            >
              Edit
            </Button>
          </div>

          {/* Contact Information */}
          <div className="flex sm:flex-row flex-col items-center  gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Phone className="size-5 text-teal-500" />
              <span>+977 9876523456</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-5 text-teal-500" />
              <span>Ashleybrown@resturantmail.com</span>
            </div>
          </div>

          {/* Employee Details */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg text-gray-400 font-semibold mb-4">
              Employee Detail
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-600">Server</p>
                <p className="font-medium">Salary: Rs. 20000</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-gray-500" />
                  <span>Sundarbasti, Bhangal, Kathmandu 44600</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-gray-500" />
                  <span>Join Date: May 25, 2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EmployeeCustomForm
          open={open}
          onClose={handleClose}
          headerText="Edit Employee"
        />
      </CardContent>
    </Card>
  );
};
