import CustomButton from "@/components/CustomButton";
import { useLoginMutation } from "@/redux/api/authApi";
// import { useDoLoginMutation } from "@/redux/api/authApi";
import {
  Card,
  CardContent,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/configUser";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [getLogin, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("**email is required**"),
    password: yup
      .string()
      .required("**password is required**")
      .min(5, "**password must be at least 8 characters**"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const res = await getLogin(values).unwrap();
        if (res?.success) {
          dispatch(setToken(res?.data?.token));
          Cookies.set("RSM", res?.data?.token);
          toast.success(res.message);
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || "Login failed, Try Again");
      }
    },
  });

  const { handleSubmit, getFieldProps, errors, touched } = formik;

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h2" pb={2} fontSize="1.8rem">
            Sign In
          </Typography>
          <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <div>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    {...getFieldProps("email")}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>
                <div>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    id="password"
                    type="password"
                    placeholder="*********"
                    {...getFieldProps("password")}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>
              </Stack>
              <Stack py={2}>
                <CustomButton loading={isLoading} type="submit">
                  Submit
                </CustomButton>
              </Stack>
            </Form>
          </FormikProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
