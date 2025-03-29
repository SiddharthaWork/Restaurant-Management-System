/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Checkbox,
  CircularProgress,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { ChevronDown, ChevronRight, MonitorIcon } from "lucide-react";
import { memo, useCallback, useState } from "react";
import CustomButton from "../../../components/CustomButton";
import DialogHeader from "./DialogHeader";

const ChangeWaiter = memo(({ open, onClose }) => {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Ashley Brown",
      phone: "+977 9876540980",
      avatar: "/placeholder.svg",
      count: 6,
      selected: true,
    },
    {
      id: "2",
      name: "Javier Holloway",
      phone: "+977 9876540980",
      avatar: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Stephen Harris",
      phone: "+977 9876540980",
      avatar: "/placeholder.svg",
    },
    {
      id: "4",
      name: "Richard Walters",
      phone: "+977 9876540980",
      avatar: "/placeholder.svg",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const showUsers = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  const handleUserSelect = (selectedUsers, setFieldValue, userId) => {
    const updatedUsers = users.map((user) => ({
      ...user,
      selected: user.id === userId ? !user.selected : user.selected,
    }));
    setUsers(updatedUsers);
    setFieldValue(
      "users",
      updatedUsers.filter((user) => user.selected)
    );
  };

  return (
    <DialogHeader
      open={open}
      onClose={onClose}
      headerText="Table Details"
      size="sm"
    >
      <DialogContent>
        <Stack className="p-2 border-2 rounded-md">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p className="text-lg font-medium">Change Status</p>
            {show ? (
              <ChevronDown onClick={showUsers} size={16} />
            ) : (
              <ChevronRight onClick={showUsers} size={16} />
            )}
          </Stack>

          {show && (
            <Stack direction="row" py={1} spacing={1}>
              {loading ? (
                <CircularProgress size={24} />
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <Formik
                  initialValues={{
                    users: users.filter((user) => user.selected),
                  }}
                  onSubmit={(values) => {
                    console.log("Submitted Values:", values.users);
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <Box>
                        {/* Server Label */}
                        <Box display="flex" alignItems="center" mb={2}>
                          <MonitorIcon
                            style={{ marginRight: 8, fontSize: 20 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            SERVER
                          </Typography>
                        </Box>

                        {/* User List */}
                        <Stack spacing={2}>
                          {users.map((user) => {
                            const isSelected = values.users.some(
                              (u) => u.id === user.id
                            );
                            return (
                              <Box
                                key={user.id}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Box display="flex" alignItems="center" gap={2}>
                                  <Checkbox
                                    checked={isSelected}
                                    onChange={() =>
                                      handleUserSelect(
                                        values.users,
                                        setFieldValue,
                                        user.id
                                      )
                                    }
                                  />
                                  <Avatar src={user.avatar} alt={user.name} />
                                  <Box>
                                    <Typography variant="subtitle2">
                                      {user.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {user.phone}
                                    </Typography>
                                  </Box>
                                </Box>
                                {user.count && (
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={0.5}
                                  >
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {user.count}
                                    </Typography>
                                    <MonitorIcon style={{ fontSize: 20 }} />
                                  </Box>
                                )}
                              </Box>
                            );
                          })}
                        </Stack>

                        {/* Buttons */}
                        <Stack
                          direction="row"
                          pt={1}
                          justifyContent="end"
                          spacing={2}
                        >
                          <CustomButton
                            backgroundColor="#C0C0C0"
                            onClick={onClose}
                          >
                            Cancel
                          </CustomButton>
                          <CustomButton backgroundColor="#669CB8" type="submit">
                            Done
                          </CustomButton>
                        </Stack>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </DialogHeader>
  );
});

ChangeWaiter.displayName = "ChangeWaiter";
export default ChangeWaiter;
