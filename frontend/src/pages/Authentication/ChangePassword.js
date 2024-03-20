import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { passwordRegex } from '../../utils/regex';

const ChangePassword = () => {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .required(true, 'Password is required')
      .matches(passwordRegex, 'Password is Invalid'),
    cpassword: yup
      .string()
      .required(true, 'Confirm Password is required')
      .matches(passwordRegex, 'Password is Invalid')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const resetPassword = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="container mx-auto grid place-items-center h-screen">
        <div className="flex justify-center px-6 my-12  lg:w-[70%]">
          {/* Row */}
          <div className="w-full flex shadow-md">
            {/* Col */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              }}
            />
            {/* Col */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Change Your Password?</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and we'll send you a link to reset your password!
                </p>
              </div>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit(resetPassword)}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <span
                      className="absolute top-3 right-5"
                      onClick={() => setToggle1(!toggle1)}
                    >
                      {toggle1 ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={`${toggle1 ? 'text' : 'password'}`}
                      placeholder="Enter Password..."
                      {...register('password')}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span
                      className="absolute top-3 right-5"
                      onClick={() => setToggle(!toggle)}
                    >
                      {toggle ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter Confirm Password..."
                      type={`${toggle ? 'text' : 'password'}`}
                      {...register('cpassword')}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    type="submit"
                  >
                    Reset Password
                    {/* {isLoading && (
                      <div
                        className="inline-block ml-2 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    )} */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
