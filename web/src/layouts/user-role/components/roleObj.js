import * as yup from "yup";
export const rolesTabOption = [
  {
    label: "Users List",
    value: "usersList",
  },

  {
    label: "Role Configuration",
    value: "roleConfig",
  },
];

export const userRoleFormObj = [
  {
    label: "Name",
    type: "text",
    name: "name",
    placeholder: "Enter Name",
  },
  {
    label: "Email",
    type: "text",
    name: "email",
    placeholder: "Enter Email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "********",
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    placeholder: "*******",
  },
  {
    label: "Role",
    type: "dropdown",
    name: "role",
    placeholder: "Select User Role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Manager", value: "manager" },
    ],
  },
];
export const userYupSchema = yup.object({
  name: yup.string().required("**Name is required**"),
  email: yup.string().email("**Invalid Email**").required("**Email is required**"),
  password: yup
    .string()
    .min(8, "**Password must be at least 8 characters**")
    .matches(/[A-Z]/, "**Password must contain at least one uppercase letter**")
    .matches(/[a-z]/, "**Password must contain at least one lowercase letter**")
    .matches(/[0-9]/, "**Password must contain at least one number**")
    .matches(
      /[^A-Za-z0-9]/,
      "**Password must contain at least one special character**"
    )
    .required("**Password is required**"),
  confirmPassword: yup
    .string()
    .required("**Confirm Password is required**")
    .oneOf([yup.ref("password")], "**Passwords must match**"),
  role: yup.string().required("**Role is required**"),
});
