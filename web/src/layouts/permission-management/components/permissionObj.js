export const permissions = [
  {
    category: "Manage Orders",
    items: ["Menu", "Order Details"],
  },
  {
    category: "Menu Management",
    items: ["Menu", "Recipe and costing"],
  },
  {
    category: "Inventory Management",
    items: [
      "Purchase",
      "Vendor",
      "Stock Level Tracking",
      "Production rate",
    ],
  },
  {
    category: "Delivery Management",
    items: [],
  },
  {
    category: "Finance & Sales",
    items: ["Sales", "Expense", "Cash Flow", "Profit & Loss"],
  },
  {
    category: "Employee Management",
    items: [
      "Attendance",
      "Assign Table",
      "Employee Scheduling",
      "Employee Details",
    ],
  },
  {
    category: "Reports",
    items: [
      "Sales Report",
      "Inventory Report",
      "Employee Details",
      "Purchase Report",
      "Reservation Report",
      "Order Report",
      "Menu Report",
      "Employee Report",
      "Waste Report",
    ],
  },
];

export const actions = ["Create", "View", "Edit", "Delete"];

export const roleOptions = [
  {
    value: "admin",
    label: "Admin",
  },
  { value: "user", label: "User" },
  { value: "manager", label: "Manager" },
];