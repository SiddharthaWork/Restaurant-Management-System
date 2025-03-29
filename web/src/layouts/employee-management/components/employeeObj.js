import { User } from "lucide-react";

export const creditFormObj = [
  {
    title: "heading",
    label: "Employee Details",
    icon: User,
  },
  {
    label: "Employee Name",
    name: "employeeName",
    type: "text",
    placeholder: "Enter Employee Name",
  },
  {
    label: "Employee ID",
    name: "employeeId",
    type: "text",
    placeholder: "Enter Employee ID",
  },
  { title: "divider" },
  {
    title: "heading",
    label: "Credit Details",
    icon: User,
  },
  {
    label: "Credit Amount",
    name: "creditAmount",
    type: "number",
    placeholder: "Enter Credit Amount",
  },
  {
    label: "Credit Reason",
    name: "creditReason",
    type: "text",
    placeholder: "Enter Credit Reason",
  },
  {
    label: "Credit Date",
    name: "creditDate",
    type: "date",
    placeholder: "Select Credit Date",
  },
  {
    label: "Repayment Method",
    type: "dropdown",
    name: "repaymentMethod",
    options: [
      { label: "Cash", value: "cash" },
      { label: "Cheque", value: "cheque" },
      { label: "Online", value: "online" },
    ],
    placeholder: "Select Repayment Method",
  },
  { title: "divider" },
  {
    title: "heading",
    label: "Repayment Details",
    icon: User,
  },
  {
    label: "Installment Amount",
    name: "installmentAmount",
    type: "number",
    placeholder: "Enter Installment Amount",
  },
  {
    label: "Repayment Frequency",
    name: "repaymetFrequency",
    type: "dropdown",
    options: [
      {
        label: "Monthly",
        value: "monthly",
      },
      {
        label: "Quarterly",
        value: "quarterly",
      },
      {
        label: "Semi-Annually",
        value: "semi-annually",
      },
    ],
    placeholder: "Enter Repayment Frequency",
  },
  {
    label: "Repayment Balance",
    name: "repaymentBalance",
    type: "number",
    placeholder: "Enter Repayment Balance",
  },
  {
    title: "divider",
  },
  {
    label: "Description",
    name: "description",
    multiline: true,
    rows: 4,
    placeholder: "Enter Description",
  },
];
export const employeeFilterForm = [
  {
    label: "Employee Name",
    name: "employeeName",
    type: "text",
    placeholder: "Enter Employee Name",
  },
  {
    type: "split",
  },
  {
    label: "Repayment Method",
    name: "repaymentMethod",
    type: "dropdown",
    placeholder: "Enter Repayment Method",
    options: [
      {
        label: "Cash",
        value: "cash",
      },
      {
        label: "Bank Transfer",
        value: "bankTransfer",
      },
      {
        label: "Credit Card",
        value: "creditCard",
      },
    ],
  },
  {
    label: "Status",
    name: "status",
    type: "dropdown",
    placeholder: "Enter Status",
    options: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Inactive",
        value: "inactive",
      },
    ],
  },
];

export const newEmployeeObj = [
  {
    title: "heading",
    label: "Basic Information",
    icon: User,
  },
  {
    label: "Employee Name",
    name: "employeeName",
    type: "text",
    placeholder: "Enter Employee Name",
  },
  {
    label: "Phone Number",
    name: "number",
    type: "number",
    placeholder: "9XXXXXXXXXXX",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter Email",
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    placeholder: "Enter Address",
  },
  {
    label: "Date of Birth",
    name: "dob",
    type: "date",
    placeholder: "Select Date",
  },
  {
    title: "radio",
    label: "Gender",
    name: "gender",
    type: "radio",
    options: [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
      {
        label: "Other",
        value: "other",
      },
    ],
  },
  { title: "divider", label: "d1" },
  {
    title: "heading",
    label: "Job Details",
    icon: User,
  },
  {
    label: "Join Date",
    name: "joinDate",
    type: "date",
    placeholder: "Select Date",
  },
  {
    label: "Department",
    name: "department",
    type: "dropdown",
    options: [
      {
        label: "HR",
        value: "HR",
      },
      {
        label: "Finance",
        value: "Finance",
      },
      {
        label: "Marketing",
        value: "Marketing",
      },
      {
        label: "IT",
        value: "IT",
      },
    ],
    placeholder: "Select Department",
  },
  {
    label: "Select Position",
    name: "position",
    type: "dropdown",
    options: [
      {
        label: "Manager",
        value: "Manager",
      },
      {
        label: "Team Lead",
        value: "Team Lead",
      },
    ],
    placeholder: "Select Position",
  },
  {
    label: "Shift Type",
    name: "shiftType",
    type: "dorpdown",
    options: [
      {
        label: "Morning",
        value: "morning",
      },
      {
        label: "Afternoon",
        value: "afternoon",
      },
      {
        label: "Night",
        value: "night",
      },
    ],
    placeholder: "Select Shift Type",
  },
  {
    title: "split",
  },
  {
    label: "Salary",
    name: "salary",
    type: "number",
    placeholder: "Enter Salary",
  },
  {
    label: "Paid Leave",
    name: "paidLeave",
    type: "number",
    placeholder: "Enter Paid Leave",
  },
  { title: "divider", label: "d2" },
];
export const employeeFilter = [
  {
    label: "Employee ID",
    name: "employeeId",
    type: "text",
    placeholder: "Enter Employee ID",
  },
  {
    label: "Employee Name",
    name: "employeeName",
    type: "text",
    placeholder: "Enter Employee Name",
  },
  {
    label: "Department",
    name: "department",
    type: "dropdown",
    placeholder: "Select Department",
    options: [
      { label: "HR", value: "HR" },
      { label: "Finance", value: "Finance" },
    ],
  },
  {
    label: "Role",
    name: "role",
    type: "dropdown",
    placeholder: "Select Role",
    options: [{ label: "Manager", value: "Manager" }],
  },
  {
    type: "split",
    label: "Time Range",
    name: "time",
  },
  {
    label: "Shift",
    name: "shift",
    type: "dropdown",
    placeholder: "Select Shift",
    options: [{ label: "Morning", value: "morning" }],
  },
];
