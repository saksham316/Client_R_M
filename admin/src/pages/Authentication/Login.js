import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { generateLoginOTP } from '../../features/actions/auth/authenticationActions';
import { emailRegex, passwordRegex } from '../../utils/regex';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa';

// ----------------------------------------------------------------------------------
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoginOtpGenerated } = useSelector(
    (state) => state?.authentication
  );

  const [toggle, setToggle] = useState(false); // This usestate is used to toggle the password show and hide icons and input type.
  const [loginData, setLoginData] = useState({});

  // This method is used to call Generate Login OTP Api once user click on Login Button.
  const loginHandler = (data) => {
    try {
      setLoginData(data);
      dispatch(generateLoginOTP(data));
    } catch (error) {
      console.log(error?.message);
    }
  };

  // This block of code is used to redirect user to verify otp screen but generate otp api return success.
  useEffect(() => {
    if (isLoginOtpGenerated && Object.keys(loginData).length > 0) {
      navigate('/auth/login/verifyOtp', { state: loginData });
    }
  }, [isLoginOtpGenerated]);

  return (
    <div className="container mx-auto h-[80vh] grid place-items-center px-4">
      <div className="rounded  bg-white shadow-default dark:border-strokedark dark:bg-boxdark grid place-items-center login-container   ">
        <div className="flex flex-wrap items-center justify-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="hidden dark:block"
                  src={
                    'https://img.freepik.com/free-vector/hand-drawn-flat-design-crm-illustration_23-2149379498.jpg'
                  }
                  alt="Logo"
                  width={1200}
                  height={1200}
                />
                <img
                  className="dark:hidden"
                  src={
                    'https://img.freepik.com/free-vector/hand-drawn-flat-design-crm-illustration_23-2149379498.jpg'
                  }
                  alt="Logo"
                  width={1200}
                  height={1200}
                />
              </Link>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-[darkblue] dark:text-white sm:text-title-xl2 text-center">
                Sign in to C.RM Admin Panel
              </h2>

              <form onSubmit={handleSubmit(loginHandler)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Enter Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Please Enter your email id"
                      className="w-full rounded-lg border border-stroke bg-white text-black py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      {...register('email', {
                        required: {
                          value: true,
                          message: 'Email Address is required',
                        },
                        pattern: {
                          value: emailRegex,
                          message: 'Email Address is invalid',
                        },
                      })}
                      id="email"
                    />
                    {errors?.email && (
                      <div className="text-danger pt-1">
                        {errors?.email?.message || 'Email is required'}
                      </div>
                    )}
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Enter Password
                  </label>
                  <div className="relative">
                    <input
                      type={`${toggle ? 'text' : 'password'}`}
                      autoComplete="off"
                      placeholder="Please Enter your Password"
                      className="w-full rounded-lg border bg-white text-black border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      {...register('password', {
                        required: {
                          value: true,
                          message: 'Login Password is required',
                        },
                        pattern: {
                          value: passwordRegex,
                          message:
                            'Login Password is invalid. Password should contain minimum 1 upper case character, 1 lower case character, 1 special character and 1 number with minimum length of 10 and maximum length of 20.',
                        },
                      })}
                    />
                    {errors?.password && (
                      <div className="text-danger pt-1">
                        {errors?.password?.message ||
                          'Login Password is required'}
                      </div>
                    )}

                    <span
                      className="absolute right-4 top-4"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      {toggle ? (
                        <FaRegEye
                          fontSize={22}
                          title="Click to Hide the Login Password"
                        />
                      ) : (
                        <FaRegEyeSlash
                          fontSize={22}
                          title="Click to View the Login Password"
                        />
                      )}
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    className="flex justify-center items-center w-full cursor-pointer rounded-lg border border-meta-5 bg-meta-5 p-4 text-white transition hover:bg-opacity-90"
                  >
                    Login
                    {isLoading && Object.keys(loginData).length > 0 && (
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
                <div>
                  <p className="text-[black] text-right">
                    Are you Forgot your Password? &nbsp;
                    <span
                      className="text-[blue] font-bold underline cursor-pointer "
                      onClick={() => navigate('/auth/resetPassword')}
                    >
                      Reset Password
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
