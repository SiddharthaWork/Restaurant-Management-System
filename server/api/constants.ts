import { IMap } from "./types/permission.types";

//* JWT
const JWT_SECRET = process.env.JWT_SECRET || "";
const URI = process.env.MONGO || "";
const SALT = 10;

//* Database Reference
const DB = {
  USER: "users",
  EMPSHIFT: "Shift",
  MENU: "MenuItems",
  MENUCATEGORY: "MenuCategory",
  EMPROLE: "EmpRole",
  TABLE: "Table",
  ORDER: "Order",
  FLOORPLAN: "floorplan",
  DEPARTMENT: "Department",
  POSITION: "Position",
  RESTAURANT: "Restaurant",
  PERMISSION: "Permission",
  ATTENDANCE: "Attendance",
  CREDIT: "Credit",
  CREDITREPAYMENTMETHOD: "CreditRepaymentMethod",
  CREDITREPAYMENTFREQUENCY: "CreditRepaymentFrequency",
  RESERVATION: "Reservation",
  RESERVATIONTYPE: "ReservationType",
  VENDOR: "Vendor",
  Expense: "Expense",
  ExpenseCategory: "ExpenseCategory",
  BUSINESSTYPE: "BusinessType",
  PAYMENTMODE: "PaymentMode",
  ITEM: "Item",
  ITEMTYPE: "ItemType",
  ITEMCATEGORY: "ItemCategory",
  STOCK: "Stock",
  FOODSIZE: "FoodSize",
  BEVERAGESIZE: "BeverageSize",
  WASTESOURCE: "WasteSource",
  WASTETYPE: "WasteType",
  WASTEPRODUCTTYPE: "WasteProductType",
};

//* vendorStatus
const VENDORSTATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

//*User
const USERROLE = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  USER: "user",
};
const SUPERADMIN = {
  name: "SuperAdmin",
  password: process.env.SUPER_ADMIN_PASS || "",
  email: process.env.SUPER_ADMIN_EMAIL || "",
};
const MAX_LOGO_SIZE_MB = 5;
const MAXUSERDOCSIZE = 5;
const ATTENDANCESTATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
  LEAVE: "leave",
  ONGOING: "ongoing",
};

//* Credit
const CREDITSTATUS = {
  PAID: "paid",
  UNPAID: "unpaid",
  EXPIRED: "expired",
  REJECTED: "rejected",
};

//* Table status
const TABLESTATUS = {
  AVAILABLE: "available",
  SEATED: "seated",
  WAITLIST: "waitlist",
  UNAVAILABLE: "unavailable",
};

//* Order
const ORDERSTATUS = {
  SERVER: "server",
  READY: "ready",
  INPROGRESS: "inprogress",
  CANCEL: "cancel",
  COMPLAINT: "complaint",
};

const ORDERTYPE = {
  DINEIN: "dineIn",
  TAKEAWAY: "takeaway",
  DELIVERY: "delivery",
};

const PERMISSION_LEVELS = {
  NONE: 0, // 0000
  READ: 1 << 0, // 0001
  WRITE: 1 << 1, // 0010
  UPDATE: 1 << 2, // 0100
  DELETE: 1 << 3, // 1000
};

const PERMISSIONS = {
  NONE: "NONE",
  READ: "READ",
  CREATE: "WRITE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

//* Predefined permission combinations
const PERMISSION_COMBINATIONS = {
  NONE: PERMISSION_LEVELS.NONE, // 0
  READ_ONLY: PERMISSION_LEVELS.READ, // 1
  READ_WRITE: PERMISSION_LEVELS.READ | PERMISSION_LEVELS.WRITE, // 3
  READ_WRITE_UPDATE:
    PERMISSION_LEVELS.READ | PERMISSION_LEVELS.WRITE | PERMISSION_LEVELS.UPDATE, // 7
  FULL_ACCESS:
    PERMISSION_LEVELS.READ |
    PERMISSION_LEVELS.WRITE |
    PERMISSION_LEVELS.UPDATE |
    PERMISSION_LEVELS.DELETE, // 15
};

const PERMISSIONMODULES = {
  ManageOrders: "Manage Orders",
  MenuManagement: "Menu Management",
  TableReservation: "Table Reservation",
  InventoryManagement: "Inventory Management",
  DeliveryManagement: "Delivery Management",
  FinanceSales: "Finance & Sales",
  EmployeeManagement: "Employee Management",
  PermissionManagement: "Permission Management",
  OrderManagement: "Order Management",
  WasteManagement:"Waste Management",
  Reports: "Reports",
  Settings: "Settings",

};

const PERMISSIONSUBMODULES = {
  Menu: "Menu",
  MenuCategory: "Menu Category",
  Employee: "Employee",
  Recipe: "Recipe and costing",
  Credit: "Credit",
  Attendance: "Attendance",
  Table: "Table",
  ReservationType: "Reservation Type",
  Reservation: "Reservation",
  Vendor: "Vendor",
  BusinessType: "Business Type",
  Expense: "Expense",
  ExpenseCategory: "Expense Category",
  Purchase: "Purchase",
  ProductionRate: "Production rate",
};

const MODULE_SUBMODULE_MAP: IMap = {
  "Manage Orders": [],
  "Menu Management": ["Menu", "Menu Category", "Recipe and costing"],
  "Inventory Management": ["Purchase", "Vendor", "Production rate"],
  "Delivery Management": [
    "Assign Delivery",
    "Track Delivery",
    "Manage Delivery Partners",
  ],
  "Finance & Sales": ["Expense", "Manage Invoices", "Refund Management"],
  "Employee Management": ["Attendance", "Employee", "Credit"],
  Reports: ["Sales Report", "Inventory Report", "Employee Performance Report"],
  Settings: ["Employee", "Business Type", "Expense Category","Purchase"],
  "Table Reservation": ["Table", "Reservation Type", "Reservation"],
  "Permission Management": [],
};

//* To check valid object id of mongodb
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default {
  DB,
  JWT_SECRET,
  URI,
  SALT,
  USERROLE,
  SUPERADMIN,
  MAX_LOGO_SIZE_MB,
  MAXUSERDOCSIZE,
  MODULE_SUBMODULE_MAP,
  ATTENDANCESTATUS,
  ORDERSTATUS,
  ORDERTYPE,
  CREDITSTATUS,
  PERMISSION_LEVELS,
  PERMISSIONS,
  PERMISSIONMODULES,
  PERMISSIONSUBMODULES,
  PERMISSION_COMBINATIONS,
  TABLESTATUS,
  VENDORSTATUS,
  objectIdRegex,
  corsOptions,
};
