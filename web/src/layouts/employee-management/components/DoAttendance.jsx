import Heading from "@/components/Heading";
import DataTable from "@/components/table";
import { Action } from "@/components/TableAction";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";

const DoAttendance = () => {
  const dummyObj = [
    {
      title: "Front of House(FOH)",
      employee: [
        {
          id: "emp-1",
          name: "John Doe",
          attendance: "Present",
          date: "2022-01-01",
        },
      ],
    },
    {
      title: "Server",
      employee: [],
    },
  ];

  const initialValues = dummyObj.reduce((acc, group) => {
    acc[group.title] = group.employee.map((emp) => ({
      id: emp.id || "",
      name: emp.name || "",
      checkin: "",
      checkout: "",
      status: "present",
    }));
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("Form data:", values);
    },
  });
  const { values, handleChange, handleSubmit, setFieldValue } = formik;
  return (
    <>
      <Heading text="Attendance" />
      <form onSubmit={handleSubmit}>
        <Stack>
          {Object.entries(formik.values).map(([title, employees]) => (
            <DataTable
              key={title}
              tableHeader={title}
              columns={[
                { accessorKey: "id", header: "Employee ID" },
                { accessorKey: "name", header: "Employee Name" },
                { accessorKey: "checkin", header: "Check In" },
                { accessorKey: "checkout", header: "Check Out" },
                { accessorKey: "status", header: "Status" },
                { accessorKey: "action", header: "Action" },
              ]}
              data={employees.map((emp, index) => ({
                ...emp,
                checkin: (
                  <TextField
                    size="small"
                    className="max-w-20"
                    name={`${title}[${index}].checkin`}
                    value={values[title][index].checkin}
                    onChange={handleChange}
                  />
                ),
                checkout: (
                  <TextField
                    size="small"
                    className="max-w-20"
                    name={`${title}[${index}].checkout`}
                    value={values[title][index].checkout}
                    onChange={handleChange}
                  />
                ),
                status: (
                  <Autocomplete
                    size="small"
                    options={[
                      { label: "Present", value: "present" },
                      { label: "Absent", value: "absent" },
                    ]}
                    value={{
                      label:
                        values[title][index].status === "present"
                          ? "Present"
                          : "Absent",
                      value: values[title][index].status,
                    }}
                    onChange={(e, newValue) =>
                      setFieldValue(
                        `${title}[${index}].status`,
                        newValue?.value || ""
                      )
                    }
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                ),
                action: <Action />,
              }))}
            />
          ))}
        </Stack>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default DoAttendance;
