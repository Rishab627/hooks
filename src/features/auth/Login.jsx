import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';  
import { useLoginUserMutation } from "./userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "./userSlice";
  
  const Login = () => {

    const [loginUser, {isLoading}] = useLoginUserMutation();

    const dispatch = useDispatch();


    const loginSchema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    const {values, errors, handleSubmit, handleChange, touched} = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      onSubmit: async (val) => {
        try {
          const response = await loginUser(val).unwrap();
          toast.success('Successfully Logged in');
          dispatch(addUser(response));
        } catch (error) {
          toast.error(error.data?.message);
        }
      },
     
      validationSchema: loginSchema

    });

    const nav = useNavigate();
   
    return (
        <div className="p-4 w-80 max-w-screen-lg sm:w-96 mx-auto">
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
       
        <form className="mt-5 mb-2 " onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">

            <Input
              name="email"
              onChange={handleChange}
              size="lg"
              value={values.email}
              placeholder="name@mail.com"
              label="Email"
            />
            {errors.email && touched.email && <h1 className="text-red-600">{errors.email}</h1>}
           
            <Input
              name="password"
              onChange={handleChange}
              value={values.password}
              type="password"
              size="lg"
              placeholder="********"
              label="Password"
            />
            {errors.password && touched.password && <h1 className="text-red-600">{errors.password}</h1>}
          </div>

          <Button loading={isLoading} type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <button type="button" onClick={() => nav('/register')} className="font-medium text-gray-900">Sign Up</button>
        
          </Typography>
        </form>
      </Card>
      </div>
    );
  }
  
  
  export default Login