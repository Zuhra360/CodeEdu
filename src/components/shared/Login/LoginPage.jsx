import { Box } from '@mantine/core';
import bgimage from '../../../assets/images/bgimage.png'
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import supabase from '../../../config/supabaseClient';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

async function getUserRole(userId) {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role_id')
      .eq('user_id', userId)
      .single();
  
    if (error) {
      console.error('Error fetching role:', error);
      return null;
    }
  
    const { data: roleData } = await supabase
      .from('roles')
      .select('role_name')
      .eq('id', data.role_id)
      .single();
  
    if (!roleData) return null;
  
    return roleData.role_name; // Returns 'admin' or 'user'
  }
  
export const LoginPage = () => {
  const navigate = useNavigate();
  // const handleButtonClick = () => {
  //   navigate('/UserHome');  
  // };
  // const handleButtonClick = () => {
  //   navigate('/AdminDashboard');  
  // };
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
  
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        // Log in using Supabase
        let { data, error } = await supabase.auth.signInWithPassword({
          email: email, 
          password: password,
        });
        const jwtToken = data.session.access_token;

        if (error) {
          throw error;
        }

        toast.success('Login Successful!');

        
        // navigate('/UserHome');
        const user = data.user;
        const roleName = await getUserRole(user.id);
        
        if (roleName === 'admin') {
          toast.success('Login successful! Redirecting to Admin Dashboard...');
           navigate('/AdminDashboard');
        } else if (roleName === 'user') {
          toast.success('Login successful! Redirecting to User Dashboard...');
          navigate('/UserHome');
        } else {
          toast.error('Unauthorized role. Access denied.');
        }
       
    } catch (error) {
        console.error('Login error:', error);
        toast.error(`Login failed: ${error.message}`);
    }
    },
  });
  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Must be at least 8 characters';
  }
  
    return errors;
  };

  return (
    <div className=' flex flex-col h-screen  w-full'>
      
    <Box className='w-[100%] md:p-0 p-[10px] bg-[#F5EFE7] h-screen flex flex-row items-center justify-center gap-[30px]'>
      <div className=' md:block hidden w-[400px] h-[400px] flex justify-center items-center'>
         <img src={bgimage}/>
      </div>
      <div className='md:w-[400px] md:h-[400px] w-auto h-auto p-[10px] shadow-lg  flex justify-center bg-[#213555] flex-col items-center rounded-[10px]'>
        <h1 className='md:text-4xl text-3xl font-bold mt-12 p-2 text-[#EEEEEE]'>Login </h1>
        <div className='flex flex-col w-full  h-[300px] p-4'>

        <form  className="flex flex-col gap-4 items-center" onSubmit={formik.handleSubmit}>
          
          <div className="flex flex-col  md:text-lg  text-md ">
          <label className="mr-5 text-[#EEEEEE]" htmlFor="email">Email </label>
          <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="border-2 border-black md:w-80 w-[240px] p-1 text-base rounded bg-[#eae8ea]"
          />
          </div>
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <div className="relative flex flex-col  md:text-lg  text-md ">
          <label className='text-[#EEEEEE]'  htmlFor="password"> Password </label>
          <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={formik.handleChange}
              value={formik.values.password}
              className="border-2 text-black border-black md:w-80 w-[240px] p-1 text-base rounded bg-[#eae8ea] "
          />
            
          </div>
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}

          <button className="font-medium  md:text-lg  text-md  items-center bg-[#1D1616] hover:bg-[#3E5879]  text-[#EEEEEE] px-8 mt-8 py-1 rounded-lg" type="submit">Login</button>
         
          <p className='text-[#EEEEEE]'>Don't have an Account?<a href="/SignUp" className='text-[#D8C4B6]'>Sign Up</a></p>
          </form>
        </div>
      </div>
    </Box>

  </div>
  )
}
