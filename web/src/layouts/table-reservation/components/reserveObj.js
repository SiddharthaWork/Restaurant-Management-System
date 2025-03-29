import * as Yup from "yup";
export const filterOptions = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Seated", value: "seated" },
  { label: "Reserved", value: "reserved" },
  { label: "Waitlist", value: "waitlist" },
  { label: "Unavailable", value: "unavailable" },
];
export const tables = [
  {
    status: "Available",
    tableNumber: "T-07",
    floor: "F-1",
    capacity: { total: 4 },
  },
  {
    status: "Reserved",
    tableNumber: "T-02",
    floor: "F-1",
    capacity: { current: 4, total: 4 },
    reservationNumber: "R-0098",
    timeSlot: "13:00 - 14:00",
  },
  {
    status: "Seated",
    tableNumber: "T-03",
    floor: "F-1",
    capacity: { current: 2, total: 4 },
  },
  {
    status: "Unavailable",
    tableNumber: "T-03",
    floor: "F-1",
    capacity: { current: 2, total: 4 },
  },
];
export const statusCard = [
  {
    label: "Total Reservation",
    count: 12,
  },
  {
    label: "Total Waitlist",
    count: 8,
  },
  {
    label: "Total Guests",
    count: 10,
  },
  {
    label: "Seat Occupied",
    count: 1,
  },
];

export const reservationSchema = Yup.object().shape({
  reservationType: Yup.string().required("Reservation type is required"),
  floorPlan: Yup.string().required("Floor plan is required"),
  paxCount: Yup.number()
    .min(1, "Must have at least 1 person")
    .max(20, "Maximum 20 people allowed")
    .required("Number of people is required"),
  tableNumber: Yup.string().required("Table number is required"),
  date: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("Date is required"),
  timeFrom: Yup.string().required("Start time is required"),
  timeTo: Yup.string().required("End time is required"),
  title: Yup.string().required("Title is required"),
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  deposit: Yup.number()
    .min(0, "Deposit must be positive")
    .required("Deposit is required"),
  additionalRequest: Yup.string(),
});

export const reservationDetailsObj = {
  reservationDetails: [
    { label: "Reservation Type", value: "Single Table" },
    { label: "Floor", value: "F-01" },
    { label: "Table Number", value: "T-01" },
    { label: "Date", value: "Wednesday, Nov 20, 2024" },
    { label: "Time", value: "13:00 — 14:00" },
    { label: "Pax", value: "🪑 4/4" },
  ],

  clientDetails: [
    { label: "Full Name", value: "Mr Luffy Shakya" },
    { label: "Phone Number", value: "987654320" },
    { label: "Email", value: "ShakyaLuffy@icloud.com" },
    { label: "Pax", value: "Rs 50.00" },
  ],

  additionalRequest: `It's a special occasion, so a small flower arrangement on the table would be lovely. Also, please note that one of our guests has a gluten allergy—kindly ensure gluten-free options are available. Thank you!`,
};

export const seatedTableData = {
  tableDetails: [
    { label: "Floor", value: "F-01" },
    { label: "Table Number", value: "T-01" },
    { label: "Pax", value: "🪑 4/4" },
  ],
  waiterDetails: [
    { label: "Waiter", value: "Aakash waiter" },
    { label: "Start Time", value: "1:00 PM" },
    { label: "Duration", value: "1:45:23" },
    { label: "Guests", value: "👤 2" },
  ],

  orderDetails: [
    { label: "Order Number", value: "#01189" },
    { label: "Total Order", value: "0/8" },
  ],
};
