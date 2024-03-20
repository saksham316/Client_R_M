import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  customFieldregex,
  emailRegex,
  indianMobileRegex,
  nameRegex,
  passwordRegex,
} from '../../../utils/regex';
import { addNewEmployee } from '../../../features/actions/auth/employeeActions';
// -------------------------------------------------------------------------------------------

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, employeesList } = useSelector((state) => state?.employees);

  const [employeeData, setEmployeeData] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  // This method is used to handle upload profile image.
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setProfileImage(url);
  };

  // This method is used to add new Employee
  const addEmployeeHandler = (data) => {
    try {
      console.log('data:: ', data);
      data && setEmployeeData(data);
      delete data['profileImage'];
      const employeePayload = {
        ...data,
      };
      const formData = new FormData();
      formData.append('payload', JSON.stringify(employeePayload));
      formData.append('avatar', profileImage);
      dispatch(addNewEmployee(formData));
    } catch (error) {
      console.log(error?.message);
    }
  };

  // Redirection to Users Listing Page after user created.
  useEffect(() => {
    if (employeesList[0]?.success) {
      navigate('/employees/viewEmployees');
    }
  }, [employeesList]);

  return (
    <div className="p-4 lg:w-[70%] w-screen mx-auto">
      <div className="flex flex-col gap-9 ">
        <form onSubmit={handleSubmit(addEmployeeHandler)}>
          <div
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-auto
"
          >
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white text-center">
                Add New Employee
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-5.5 p-6.5">
              <div className="md:col-span-2 ">
                <div className="grid place-items-center relative ">
                  <div className="relative z-20 h-35 w-35  rounded-full  overflow-hidden ">
                    <img
                      src={
                        profileImage ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT98DIaWyML_0PGa-FyErqwh_uesZKwezoovw&usqp=CAU'
                      }
                      alt="profile cover"
                      className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                    />
                  </div>
                  <div className="absolute left-[50%] z-30 translate-x-[-50%] translate-y-[-50%] mt-[92px] ml-[34px] md:mt-[140px] md:ml-[56px]">
                    <label
                      htmlFor="cover"
                      className="flex cursor-pointer items-center  justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
                    >
                      <input
                        type="file"
                        name="cover"
                        id="cover"
                        className="sr-only"
                        {...register('profileImage', {
                          required: {
                            value: true,
                            message: 'Profile Image is required',
                          },
                          onChange: (e) => {
                            handleProfileImage(e);
                          },
                        })}
                      />

                      <span>
                        <svg
                          className="fill-current"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  {errors?.profileImage && (
                    <div className="text-danger dark:text-white text-center">
                      {errors?.profileImage?.message ||
                        'Profile Image is required'}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: 'First Name is required',
                    },
                    minLength: {
                      value: 2,
                      message: 'First Name cannot be less than 2 characters.',
                    },
                    maxLength: {
                      value: 50,
                      message: 'First Name cannot be more than 50 characters.',
                    },
                    pattern: {
                      value: nameRegex,
                      message: 'First Name is invalid',
                    },
                  })}
                />
                {errors?.firstName && (
                  <div className="text-danger dark:text-white pt-1">
                    {errors?.firstName?.message || 'First Name is required'}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  {...register('lastName', {
                    required: {
                      value: false,
                      message: 'Last Name is required',
                    },
                    minLength: {
                      value: 2,
                      message: 'Last Name cannot be less than 2 characters.',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Last Name cannot be more than 50 characters.',
                    },
                    pattern: {
                      value: nameRegex,
                      message: 'Last Name is invalid',
                    },
                  })}
                />
                {errors?.lastName && (
                  <div className="text-danger dark:text-white pt-1">
                    {errors?.lastName?.message || 'Last Name is required'}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
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
                />
                {errors?.email && (
                  <div className="text-danger dark:text-white pt-1">
                    {errors?.email?.message || 'Email Address is required'}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Mobile Number
                </label>
                <input
                  type="number"
                  placeholder="Enter Mobile Number"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  {...register('phoneNumber', {
                    required: {
                      value: true,
                      message: 'Mobile Number is required',
                    },

                    pattern: {
                      value: indianMobileRegex,
                      message:
                        'Mobile Number is invalid. Mobile Number must start with 6,7,8 or 9 and must have 10 digits.',
                    },
                  })}
                />
                {errors?.phoneNumber && (
                  <div className="text-danger dark:text-white pt-1">
                    {errors?.phoneNumber?.message ||
                      'Mobile Number is required'}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  {...register('userName', {
                    required: {
                      value: true,
                      message: 'User Name is required',
                    },
                    minLength: {
                      value: 8,
                      message: 'User Name cannot be less than 8 characters.',
                    },
                    maxLength: {
                      value: 30,
                      message: 'User Name cannot be more than 30 characters.',
                    },
                    pattern: {
                      value: customFieldregex,
                      message: 'User Name is invalid',
                    },
                  })}
                />
                {errors?.userName && (
                  <div className="text-danger dark:text-white pt-1">
                    {errors?.userName?.message || 'User Name is required'}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Login Password
                </label>
                <input
                  type="text"
                  placeholder="Enter Login Password"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Login Password is required',
                    },
                    minLength: {
                      value: 10,
                      message:
                        'Login Password cannot be less than 10 characters.',
                    },
                    maxLength: {
                      value: 12,
                      message:
                        'Login Password cannot be more than 10 characters.',
                    },
                    pattern: {
                      value: passwordRegex,
                      message:
                        'Login Password is invalid. Password should contain minimum 1 upper case character, 1 lower case character, 1 special character and 1 number with minimum length of 10 and maximum length of 12.',
                    },
                  })}
                />
                {errors?.password && (
                  <div className="text-danger dark:text-white pt-1">
                    {errors?.password?.message || 'Login Password is required'}
                  </div>
                )}
              </div>
              <div className="md:col-span-2 grid place-items-center">
                <button
                  to="#"
                  className="inline-flex lg:w-[30%] mx-auto items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Add Employee
                  {isLoading && Object.keys(employeeData).length > 0 && (
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
