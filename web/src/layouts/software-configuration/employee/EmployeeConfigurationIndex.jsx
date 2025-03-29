/* eslint-disable react/prop-types */
import Heading from "@/components/Heading";
import { Box, IconButton, Stack, Switch } from "@mui/material";
import SharedTable from "../components/SharedTables";
import { CreateNecessaryForm } from "@/layouts/user-role/components/RoleConfiguration";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import {
  useCreateEmployeeDepartmentMutation,
  useCreateEmployeePositionMutation,
  useCreateEmployeeRoleMutation,
  useCreateEmployeeShiftMutation,
  useDeleteEmployeeDepartmentMutation,
  useDeleteEmployeePositionMutation,
  useDeleteEmployeeRoleMutation,
  useDeleteEmployeeshiftMutation,
  useGetEmployeeDepartmentQuery,
  useGetEmployeePositionQuery,
  useGetEmployeeRoleQuery,
  useGetEmployeeShiftQuery,
} from "@/redux/api/employeeApi";
import { useMemo } from "react";
import { toast } from "react-toastify";
import {
  useDeleteCreditRepaymentFrequencyMutation,
  useCreateCreditRepaymentFrequencyMutation,
  useCreateCreditRepaymentMethodMutation,
  useDeleteCreditRepaymentMethodMutation,
  useGetAllCreditRepaymentMethodQuery,
  useGetAllCreditRepaymentFrequencyQuery,
} from "@/redux/api/creditApi";

const EmployeeConfigurationIndex = () => {
  const { data: userShift } = useGetEmployeeShiftQuery();
  const [createShift, { isLoading: creatingShift, isSuccess: shiftSuccess }] =
    useCreateEmployeeShiftMutation();
  const [deleteShift] = useDeleteEmployeeshiftMutation();
  const { data: userDepartment } = useGetEmployeeDepartmentQuery();
  const [
    createDepartment,
    { isLoading: creatingDept, isSuccess: deptSuccess },
  ] = useCreateEmployeeDepartmentMutation();
  const [deleteDepartment] = useDeleteEmployeeDepartmentMutation();
  const { data: userPosition } = useGetEmployeePositionQuery();
  const [
    createPosition,
    { isLoading: creatingPosition, isSuccess: positionSuccess },
  ] = useCreateEmployeePositionMutation();
  const [deletePosition] = useDeleteEmployeePositionMutation();
  const { data: userRole } = useGetEmployeeRoleQuery();
  const [createRole, { isLoading: creatingRole, isSuccess: roleSuccess }] =
    useCreateEmployeeRoleMutation();
  const [deleteRole] = useDeleteEmployeeRoleMutation();
  const { data: creditMethod } = useGetAllCreditRepaymentMethodQuery();
  const [
    createRepayment,
    { isLoading: creatingMethod, isSuccess: methodSuccess },
  ] = useCreateCreditRepaymentMethodMutation();
  const [deleteRepayment] = useDeleteCreditRepaymentMethodMutation();
  const { data: creditFrequency } = useGetAllCreditRepaymentFrequencyQuery();
  const [createFrequency, { isLoading: creatingFreq, isSuccess: freqSuccess }] =
    useCreateCreditRepaymentFrequencyMutation();
  const [deleteFrequency] = useDeleteCreditRepaymentFrequencyMutation();
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "action", header: "Action" },
    ],
    []
  );
  const shiftData = useMemo(
    () =>
      userShift
        ? userShift?.data.map((shift) => ({
            id: shift._id,
            type: shift.name,
            action: (
              <ActionButtons
                id={shift._id}
                status={shift.isActive}
                onDelete={() => deleteFunction(shift._id, "shift")}
              />
            ),
          }))
        : [],
    [userShift]
  );
  const departmentData = useMemo(
    () =>
      userDepartment
        ? userDepartment?.data.map((dep) => ({
            id: dep._id,
            type: dep.isActive,
            action: (
              <ActionButtons
                id={dep._id}
                status={dep.name}
                onDelete={() => deleteFunction(dep._id, "department")}
              />
            ),
          }))
        : [],
    [userDepartment]
  );
  const roleData = useMemo(
    () =>
      userRole
        ? userRole?.data.map((role) => ({
            id: role._id,
            type: role.name,
            action: (
              <ActionButtons
                id={role._id}
                status={role.isActive}
                onDelete={() => deleteFunction(role._id, "role")}
              />
            ),
          }))
        : [],
    [userRole]
  );
  const positionData = useMemo(
    () =>
      userPosition
        ? userPosition?.data.map((pos) => ({
            id: pos._id,
            type: pos.name,
            action: (
              <ActionButtons
                id={pos._id}
                status={pos.isActive}
                onDelete={() => deleteFunction(pos._id, "position")}
              />
            ),
          }))
        : [],
    [userPosition]
  );
  const repaymentData = useMemo(
    () =>
      creditMethod
        ? creditMethod?.data.map((pos) => ({
            id: pos._id,
            type: pos.name,
            action: (
              <ActionButtons
                id={pos._id}
                status={pos.isActive}
                onDelete={() => deleteFunction(pos._id, "creditMethod")}
              />
            ),
          }))
        : [],
    [creditMethod]
  );
  const frequencyData = useMemo(
    () =>
      creditFrequency
        ? creditFrequency?.data.map((pos) => ({
            id: pos._id,
            type: pos.name,
            action: (
              <ActionButtons
                id={pos._id}
                status={pos.isActive}
                onDelete={() => deleteFunction(pos._id, "frequency")}
              />
            ),
          }))
        : [],
    [creditFrequency]
  );

  const shiftSubmit = async (values) => {
    const result = values?.shiftType?.map((shift) => ({ name: shift }));
    try {
      let res = await createShift(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };
  const departmentSubmit = async (values) => {
    const result = values?.department?.map((dep) => ({ name: dep }));
    try {
      let res = await createDepartment(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };
  const roleSubmit = async (values) => {
    const result = values?.role?.map((role) => ({ name: role }));
    try {
      let res = await createRole(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };
  const positionSubmit = async (values) => {
    const result = values?.position?.map((position) => ({ name: position }));
    try {
      let res = await createPosition(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };
  const creditMethodSubmit = async (values) => {
    const result = values?.method?.map((method) => ({ name: method }));
    try {
      let res = await createRepayment(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };
  const creditFrequencySubmit = async (values) => {
    const result = values?.frequency?.map((method) => ({ name: method }));
    try {
      let res = await createFrequency(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFunction = async (id, type) => {
    try {
      let res;
      switch (type) {
        case "shift":
          res = await deleteShift(id).unwrap();
          break;
        case "department":
          res = await deleteDepartment(id).unwrap();
          break;
        case "position":
          res = await deletePosition(id).unwrap();
          break;
        case "role":
          res = await deleteRole(id).unwrap();
          break;
        case "creditMethod":
          res = await deleteRepayment(id).unwrap();
          break;
        case "frequency":
          res = await deleteFrequency(id).unwrap();
      }
      if (res.success) toast.success(res.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Stack>
      <Heading text="Employee" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <SharedTable
          headerText="Employee Shift Type"
          headerBtnText="Add New Type"
          dialogHeaderText="CREATE SHIFT TYPE"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              loading={creatingShift}
              success={shiftSuccess}
              name="shiftType"
              initialValues={{ shiftType: [""] }}
              onSubmit={shiftSubmit}
              formlabel="Enployee Shift Type"
            />
          }
          table={{ columns, data: shiftData }}
        />
        <SharedTable
          headerText="Restaurant Department"
          headerBtnText="Add New Department"
          dialogHeaderText="CREATE RESTAURANT DEPARTMENT"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              loading={creatingDept}
              success={deptSuccess}
              name="department"
              onSubmit={departmentSubmit}
              initialValues={{ department: [""] }}
              formlabel="Restaurant Department"
            />
          }
          table={{ columns, data: departmentData }}
        />
        <SharedTable
          headerText="Employee Position"
          headerBtnText="Add New Position"
          dialogHeaderText="CREATE EMPLOYEE POSITION"
          canSearch={false}
          table={{ columns, data: positionData }}
          customForm={
            <CreateNecessaryForm
              loading={creatingPosition}
              success={positionSuccess}
              name="position"
              onSubmit={positionSubmit}
              initialValues={{ position: [""] }}
              formlabel="Employee Position"
            />
          }
        />

        <SharedTable
          headerText="Employee role"
          headerBtnText="Add New Role"
          dialogHeaderText="CREATE EMPLOYEE ROLE"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              loading={creatingRole}
              success={roleSuccess}
              name="role"
              onSubmit={roleSubmit}
              initialValues={{ role: [""] }}
              formlabel="Enployee Role"
            />
          }
          table={{ columns, data: roleData }}
        />
        <SharedTable
          headerText="Employee Credit Repayment Method"
          headerBtnText="Add New Method"
          dialogHeaderText="CREATE CREDIT REPAYMENT METHOD"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              name="method"
              loading={creatingMethod}
              success={methodSuccess}
              initialValues={{ method: [""] }}
              formlabel="Repayment Method"
              onSubmit={creditMethodSubmit}
            />
          }
          table={{ columns, data: repaymentData }}
        />
        <SharedTable
          headerText="Employee Credit Repayment Frequency"
          headerBtnText="Add New Frequency"
          dialogHeaderText="CREATE CREDIT REPAYMENT FREQUENCY"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              name="frequency"
              loading={creatingFreq}
              success={freqSuccess}
              initialValues={{ frequency: [""] }}
              formlabel="Repayment Frequency"
              onSubmit={creditFrequencySubmit}
            />
          }
          table={{ columns, data: frequencyData }}
        />
      </div>
    </Stack>
  );
};

export default EmployeeConfigurationIndex;
export const ActionButtons = ({ id, status, onDelete, type }) => {
  return (
    <Box className="flex items-center gap-2">
      <Switch size="small" checked={Boolean(status)} />
      <IconButton size="small" className="text-gray-600">
        <Edit className="w-4 h-4" />
      </IconButton>
      <IconButton
        size="small"
        className="text-gray-600"
        onClick={() => onDelete(id, type)}
      >
        <Trash2 className="w-4 h-4" />
      </IconButton>
    </Box>
  );
};
