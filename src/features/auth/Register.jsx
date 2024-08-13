import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from 'yup';  
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "./userApi";
import { toast } from "react-toastify";


const registerSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  fullname: Yup.string().required()
});
  
  
  const Register = () => {
    const nav = useNavigate();
    const [registerUser, {isLoading}] = useRegisterUserMutation();



    const {values, errors, handleSubmit, handleChange, touched} = useFormik({
      initialValues: {
        fullname: '',
        email: '',
        password: ''
      },
      onSubmit: async (val) => {
        try {
          const response = await registerUser(val).unwrap();
          toast.success('Successfully Registered');
          nav(-1)
        } catch (error) {
          toast.error(error.data?.message);
        }
      },
     
      validationSchema: registerSchema

    });
   
    return (
        <div className="p-4 w-80 max-w-screen-lg sm:w-96 mx-auto">
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Register
        </Typography>
       
        <form className="mt-5 mb-2 " onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
           
            <Input
              name="fullname"
              onChange={handleChange}
              value={values.fullname}
              size="lg"
              placeholder="Your Name"
             label="Your Name"
            />
            {errors.fullname && touched.fullname && <h1 className="text-red-600">{errors.fullname}</h1>}

           
            <Input
              name="email"
              onChange={handleChange}
              value={values.email}
              size="lg"
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
            {errors.password && touched.password && <h1 className="text-red-600">{errors.email}</h1>}

          </div>

          <Button type="submit" className="mt-6" fullWidth>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
           <button type="button" onClick={() => nav(-1)} className="font-medium text-gray-900">Sign In</button>
          </Typography>
        </form>
      </Card>
      </div>
    );
  }
  
  
  export default Register