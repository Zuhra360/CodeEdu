import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import SplineViewer from '../../features/SplineViewer';
import supabase from '../../config/supabaseClient'

export const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password:'',
          confirmpassword:'',
        },
        onSubmit: async (values) => {
          const { email, password, name } = values;
          if (password !== values.confirmpassword) {
              toast.error('Passwords do not match');
              return;
          }

          try {
              // Create user in Supabase using email and password
              const { data, error: signUpError } = await supabase.auth.signUp({
                  email,
                  password,
              });

              if (signUpError) {
                  throw signUpError;
              }
              const userId = data.user?.id;
              if (!userId) {
                throw new Error('User creation failed. Please try again.');
              }


              const { error: dbError } = await supabase
              .from('users')
              .insert([{ id: data.user.id, email, name }]); // Use data.user.id here
        
            if (dbError) {
              console.error('Error inserting into users table:', dbError);
              toast.error('Failed to save user details to database.');
            } else {
              console.log('User added to the users table successfully');
              toast.success('Signup successful! You can now log in.');
            }
            const { error: roleError } = await supabase.from('user_roles').insert([{ user_id: userId, role_id: 1 }]);

            if (roleError) {
              throw roleError;
            }
            
          } catch (error) {
              toast.error(`Error: ${error.message}`);
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
        if (!values.Name) {
          errors.Name = 'Required';
        } else if (values.Name.length > 8) {
          errors.Name = 'Must be 20 characters or less';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length > 8) {
          errors.password = 'Must be 8 characters or more';
        }
        if (!values.confirmpassword) {
          errors.confirmpassword = 'Required';
        } else if (values.confirmpassword.length > 8) {
          errors.confirmpassword = 'Must be 8 characters or more';
        }
        return errors;
      };
      
      // const signUp = async (email, password) => {
      //   const { user, error } = await supabase.auth.signUp({
      //     email,
      //     password,
      //   });
      //   if (error) console.error('Error signing up:', error.message);
      //   else console.log('User signed up:', user);
      // };
  return (
    <div className='w-[100%] md:p-0 px-[10px] py-[20px] bg-[#EEEEEE] h-screen flex flex-row gap-[20px] items-center justify-center'>

    <div className='md:w-[400px] md:h-[550px] w-auto h-auto md:p-0 p-[10px] flex justify-center bg-[#727D73] flex-col items-center gap-[10px] rounded-[10px]'>
      <h1 className='md:text-4xl text-3xl font-bold text-[#EEEEEE]'>Sign Up Here !!! </h1>
      <div className='flex flex-col w-full  h-[400px] p-4'>

      <form  className="flex flex-col gap-[10px] items-center" onSubmit={formik.handleSubmit}>
        
        <div className="flex flex-col  md:text-lg  text-md ">
        <label className="text-[#EEEEEE]" htmlFor="email">Email </label>
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

        <div className="flex flex-col md:text-lg  text-md ">
        <label  className="text-[#EEEEEE]" htmlFor="Name"> Name </label>
        <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="border-2 border-black md:w-80 w-[240px] p-1 text-base rounded bg-[#eae8ea] "
        />
        </div>
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}

        <div className="relative flex flex-col md:text-lg  text-md">
        <label  className="text-[#EEEEEE]" htmlFor="password"> Password </label>
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

        <div className="relative flex flex-col  pb-[20px]  md:text-lg  text-md ">
        <label  className="text-[#EEEEEE]" htmlFor="password">Confirm Password </label>
        <input
            id="confirmpassword"
            name="confirmpassword"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.confirmpassword}
            className="border-2 text-black border-black md:w-80 w-[240px] p-1 text-base rounded bg-[#eae8ea] "
        />
        
        </div>
        {formik.errors.confirmpassword ? <div>{formik.errors.confirmpassword}</div> : null}

        <button  className="font-medium  md:text-lg  text-md items-center bg-black hover:bg-[#AAB99A] text-[#e5e3df] text-white px-8  py-1 rounded-lg" type="submit">Sign Up</button>
        <Toaster />
        <a href="/Login" className='text-[#EEEEEE]'>Login?</a>
        </form>
      </div>
    </div>
    <div className=' md:block hidden w-[600px] h-[600px] '>
        <SplineViewer/>
    </div>
    
  </div>

  )
}
