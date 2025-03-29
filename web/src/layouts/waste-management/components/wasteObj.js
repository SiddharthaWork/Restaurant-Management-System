export const wasteCustomFormData = [
  {
    type: "date",
    placeholder: "Enter Date",
    label: "Date",
    name: "date",
  },
  {
    type: "dropdown",
    placeholder: "Select Category",
    label: "Select Category",
    name: "category",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
  {
    type: "dropdown",
    placeholder: "Source of Waste",
    label: "Source of Waste",
    name: "source",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
  {
    type: "dropdown",
    placeholder: "FoodMenu",
    label: "Food Menu",
    name: "menu",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
  {
    type: "dropdown",
    placeholder: "Waste Type",
    label: "WasteType",
    name: "type",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
  {
    type: "text",
    placeholder: "Cost Estimation",
    label: "Cost Estimation",
    name: "estimation",
  },
  {
    type: "text",
    placeholder: "Ente Food Waste Quantity",
    label: "Food Waste Quantiy",
    name: "quantity",
  },
  {
    type: "dropdown",
    placeholder: "Product Type",
    label: "Product Type",
    name: "productType",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
  {
    type: "text",
    placeholder: "Reason",
    label: "Reason",
    name: "reason",
  },
];

export const wasteFilterFormData = [
  {
    type: "dropdown",
    label: "Category",
    options: [{ label: "", value: "" }],
    placeholder: "Select Category",
    name: "category",
  },
  {
    type: "split",
  },
  {
    type: "dropdown",
    label: "Status",
    options: [{ label: "", value: "" }],
    placeholder: "Available",
    name: "status",
  },
  {
    type: "dropdown",
    label: "Vendor",
    options: [{ label: "", value: "" }],
    placeholder: "fresh",
    name: "vendor",
  },
  {
    type: "date",
    label: "Expiration Data",
    placeholder: "",
    name: "date",
  },
  {
    type: "dropdown",
    label: "Type",
    options: [{ label: "nom", value: "nom" }],
    placeholder: "Select Type",
    name: "type",
  },
];
