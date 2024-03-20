import React, { useEffect } from 'react';
import { forgotPassword } from '../../features/actions/authenticationActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { emailRegex } from '../../utils/regex';

// -----------------------------------------------------------------------------------------------------------------
const ResetLoginPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isForgotPasswordSentLinkDone } = useSelector(
    (state) => state?.auth
  );

  useEffect(() => {
    console.log(
      'isForgotPasswordSentLinkDone:: ',
      isForgotPasswordSentLinkDone
    );
  }, [isForgotPasswordSentLinkDone]);

  // This method is used to call Reset Password Api once user click on Reset password Button.
  const resetPasswordHandler = (data) => {
    try {
      dispatch(forgotPassword({ email: data?.email, comingFrom: 'CLIENT' }));
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    // <div className="w-full border-stroke dark:border-strokedark  xl:border-l-2 h-[80vh] grid place-items-center px-4">
    //   <div className="p-4 sm:p-12.5 xl:p-17.5 w-full md:w-[600px]  shadow ">
    //     <h2 className="mb-9 text-2xl font-bold text-meta-4 dark:text-white sm:text-title-xl2 text-center">
    //       Reset your Login Password
    //     </h2>

    //     <form onSubmit={handleSubmit(resetPasswordHandler)}>
    //       <div className="mb-4">
    //         <label className="mb-2.5 block font-medium text-black dark:text-white">
    //           Enter Email Address
    //         </label>
    //         <div className="relative">
    //           <input
    //             type="email"
    //             placeholder="Please Enter your email id"
    //             className="w-full rounded-lg border border-stroke bg-white text-black py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    //             {...register('email', {
    //               required: {
    //                 value: true,
    //                 message: 'Email Address is required',
    //               },
    //               pattern: {
    //                 value: emailRegex,
    //                 message: 'Email Address is invalid',
    //               },
    //             })}
    //             id="email"
    //           />
    //           {errors?.email && (
    //             <div className="text-danger pt-1">
    //               {errors?.email?.message || 'Email is required'}
    //             </div>
    //           )}
    //           <span className="absolute right-4 top-4">
    //             <svg
    //               className="fill-current"
    //               width="22"
    //               height="22"
    //               viewBox="0 0 22 22"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <g opacity="0.5">
    //                 <path
    //                   d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
    //                   fill=""
    //                 />
    //               </g>
    //             </svg>
    //           </span>
    //         </div>
    //       </div>

    //       <div className="mb-5">
    //         <button
    //           type="submit"
    //           className="flex justify-center items-center w-full cursor-pointer rounded-lg border border-meta-5 bg-meta-5 p-4 text-white transition hover:bg-opacity-90"
    //         >
    //           Reset Password
    //           {isLoading && getValues('email') > 0 && (
    //             <div
    //               className="inline-block ml-2 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    //               role="status"
    //             >
    //               <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
    //                 Loading...
    //               </span>
    //             </div>
    //           )}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="container mx-auto grid place-items-center h-screen">
      <div className="flex justify-center px-6 my-12 lg:w-[70%]">
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
              <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p className="mb-4 text-sm text-gray-700">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
            </div>
            <form
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              onSubmit={handleSubmit(resetPasswordHandler)}
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  type="email"
                  placeholder="Enter Email Address..."
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: emailRegex,
                      message: 'Email is invalid',
                    },
                  })}
                />
              </div>
              <div className="mb-6 text-center">
                <button
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  type="submit"
                >
                  Reset Password
                  {isLoading && (
                    <div
                      className="inline-block ml-2 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetLoginPassword;
