// ------------------------------------------------Imports----------------------------------------------
import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addNewEmployee } from '../../../features/actions/auth/employeeActions';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { resetEmployeeStatus } from '../../../features/slices/auth/employeeSlice';
// ------------------------------------------------------------------------------------------------------

const AddEmployee = () => {
  // -----------------------------------------------States------------------------------------------------
  const roleOptions = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Employee' },
  ];

  const subRoleOptions = [
    { value: '0', label: 'Coder Manager' },
    { value: '1', label: 'Note Taker Manager' },
    { value: '2', label: 'QA Manager' },
    { value: '3', label: 'Coder' },
    { value: '4', label: 'Note Taker' },
    { value: '5', label: 'QA' },
  ];

  const [role, setRole] = useState();
  const [subRole, setSubRole] = useState();
  // -----------------------------------------------------------------------------------------------------
  // -----------------------------------------------Hooks------------------------------------------------
  const submitBtnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isUserCreated } = useSelector((state) => state?.employees);
  // -----------------------------------------------------------------------------------------------------
  // -----------------------------------------------Functions------------------------------------------------
  // submitHandler -- handler to submit the create employee form
  const submitHandler = (data) => {
    try {
      confirmAlert({
        title: 'Create Employee Confirmation!',
        message:
          'Are you sure you want to Create the Employee with the mentioned details?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              let payload = {};
              if (subRole) {
                payload = { ...data, role, subRole };
              } else {
                payload = { ...data, role };
              }
              let formData = new FormData();
              formData.append('payload', JSON.stringify(payload));
              formData.append('avatar', '');
              dispatch(addNewEmployee(formData));
            },
          },
          {
            label: 'No',
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  // -----------------------------------------------useEffect--------------------------------------------
  useEffect(() => {
    if (isUserCreated) {
      navigate('/employees/viewEmployees');
      dispatch(resetEmployeeStatus(false));
    }
  }, [isUserCreated]);
  // -----------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------
  return (
    <>
      <Breadcrumb pageName="Add Employee" />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid grid-cols-1 gap-9 sm:grid-cols-2"
      >
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Basic Details
              </h3>
            </div>
            <div>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name
                    </label>
                    <input
                      {...register('firstName', {
                        required: {
                          value: true,
                          message: 'First Name is a required field',
                        },
                      })}
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.firstName &&
                      errors.firstName.type === 'required' && (
                        <p className={`w-full text-red-600`}>
                          First Name is a required field
                        </p>
                      )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      {...register('lastName', {
                        required: {
                          value: true,
                          message: 'Last Name is a required field',
                        },
                      })}
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.lastName && errors.lastName.type === 'required' && (
                      <p className={`w-full text-red-600`}>
                        Last Name is a required field
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email Address <span className="text-meta-1">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Email is a required field',
                      },
                    })}
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.email && errors.email.type === 'required' && (
                    <p className={`w-full text-red-600`}>
                      Email is a required field
                    </p>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Role <span className="text-meta-1">*</span>
                  </label>
                  <Select
                    placeholder="Select Role"
                    options={roleOptions}
                    onChange={(role) => {
                      if (role.value == 1) {
                        setSubRole('');
                        setRole(role.value);
                      } else {
                        setRole(role.value);
                      }
                    }}
                  />
                </div>
                {role && role == 2 && (
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sub Role <span className="text-meta-1">*</span>
                    </label>
                    <Select
                      placeholder="Select Sub Role"
                      options={subRoleOptions}
                      onChange={(role) => {
                        setSubRole(role.value);
                      }}
                    />
                  </div>
                )}

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Employee's Username
                    </label>
                    <input
                      {...register('userName', {
                        required: {
                          value: true,
                          message: 'User Name is a required field',
                        },
                      })}
                      type="text"
                      placeholder="Enter user name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.userName && errors.userName.type === 'required' && (
                      <p className={`w-full text-red-600`}>
                        User Name is a required field
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Temporary Login Password
                    </label>
                    <input
                      {...register('password', {
                        required: {
                          value: true,
                          message: 'Password is a required field',
                        },
                      })}
                      type="password"
                      placeholder="Enter password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.password && errors.password.type === 'required' && (
                      <p className={`w-full text-red-600`}>
                        Password is a required field
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Mobile Number <span className="text-meta-1">*</span>
                  </label>
                  <input
                    {...register('mobileNumber', {
                      required: {
                        value: true,
                        message: 'Mobile Number is a required field',
                      },
                    })}
                    type="number"
                    placeholder="Enter your mobile number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.mobileNumber &&
                    errors.mobileNumber.type === 'required' && (
                      <p className={`w-full text-red-600`}>
                        Mobile Number is a required field
                      </p>
                    )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Current Residential Address
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="mt-5 mb-5.5 flex items-center justify-between">
                  <label htmlFor="formCheckbox" className="flex cursor-pointer">
                    <div className="relative pt-0.5">
                      <input
                        type="checkbox"
                        id="formCheckbox"
                        className="taskCheckbox sr-only"
                      />
                      <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                        <span className="text-white opacity-0">
                          <svg
                            className="fill-current"
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <p>Is Permanent Address same as Current Address</p>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Permanent Residential Address
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                {/* <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Send Message
                </button> */}
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Identification's Details
              </h3>
            </div>
            <div>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Aadhaar Card Number
                  </label>
                  <input
                    {...register('aadhaarNumber', {
                      required: {
                        value: true,
                        message: 'Aadhaar Number is a required field',
                      },
                    })}
                    type="text"
                    placeholder="Enter your aadhaar number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.aadhaarNumber &&
                    errors.aadhaarNumber.type === 'required' && (
                      <p className={`w-full text-red-600`}>
                        Aadhaar Number is a required field
                      </p>
                    )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    PAN Card Number
                  </label>
                  <input
                    {...register('panNumber', {
                      required: {
                        value: true,
                        message: 'PAN Number is a required field',
                      },
                    })}
                    type="text"
                    placeholder="Enter your PAN address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.panNumber && errors.panNumber.type === 'required' && (
                    <p className={`w-full text-red-600`}>
                      PAN Number is a required field
                    </p>
                  )}
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      UAN Number
                    </label>
                    <input
                      {...register('uanNumber', {
                        required: {
                          value: true,
                          message: 'UAN Number is a required field',
                        },
                      })}
                      type="text"
                      placeholder="Enter your UAN Number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.uanNumber &&
                      errors.uanNumber.type === 'required' && (
                        <p className={`w-full text-red-600`}>
                          UAN Number is a required field
                        </p>
                      )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      ESI Number
                    </label>
                    <input
                      {...register('esiNumber', {
                        required: {
                          value: true,
                          message: 'ESI Number is a required field',
                        },
                      })}
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.esiNumber &&
                      errors.esiNumber.type === 'required' && (
                        <p className={`w-full text-red-600`}>
                          ESI Number is a required field
                        </p>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Family Details
              </h3>
            </div>
            <div action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Father's Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Mother's Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Department and Manager's Details
              </h3>
            </div>
            <div>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Department Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Team Leader's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Reporting Manager's Name (Level 1)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Reporting Manager's Name (Level 2)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Reporting Manager's Name (Level 3)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Bank's Details
              </h3>
            </div>
            <div>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Bank's Name
                  </label>
                  <input
                    {...register('bankName', {
                      required: {
                        value: true,
                        message: "Bank's Name is a required field",
                      },
                    })}
                    type="text"
                    placeholder="Enter Bank's name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.bankName && errors.bankName.type === 'required' && (
                    <p className={`w-full text-red-600`}>
                      Bank's Name is a required field
                    </p>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Account Holder's Name
                  </label>
                  <input
                    {...register('accountHolderName', {
                      required: {
                        value: true,
                        message: "Account Holder's Name is a required field",
                      },
                    })}
                    type="text"
                    placeholder="Enter Account Holder Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.accountHolderName &&
                    errors.accountHolderName.type === 'required' && (
                      <p className={`w-full text-red-600`}>
                        Account Holder's Name is a required field
                      </p>
                    )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Account Number
                  </label>
                  <input
                    {...register('accountNumber', {
                      required: {
                        value: true,
                        message: 'Account Number is a required field',
                      },
                    })}
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.accountNumber &&
                    errors.accountNumber.type === 'required' && (
                      <p className={`w-full text-red-600`}>
                        Account Number is a required field
                      </p>
                    )}
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      IFSC Code
                    </label>
                    <input
                      {...register('ifsc', {
                        required: {
                          value: true,
                          message: 'IFSC code is a required field',
                        },
                      })}
                      type="text"
                      placeholder="Enter your IFSC code"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.ifsc && errors.ifsc.type === 'required' && (
                      <p className={`w-full text-red-600`}>
                        IFSC Code is a required field
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Branch Code
                    </label>
                    <input
                      {...register('branchCode', {
                        required: {
                          value: true,
                          message: 'Branch code is a required field',
                        },
                      })}
                      type="text"
                      placeholder="Enter your Branch Code"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.branchCode &&
                      errors.branchCode.type === 'required' && (
                        <p className={`w-full text-red-600`}>
                          Branch Code is a required field
                        </p>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="none" ref={submitBtnRef}></button>
      </form>
      <div className="submitBtn flex justify-center mt-1">
        <button
          onClick={() => {
            submitBtnRef.current.click();
          }}
          className="border border-gray-400 p-4 rounded-full font-bold bg-blue-950 text-white text-xl"
        >
          Create Employee
        </button>
      </div>
    </>
  );
};

export default AddEmployee;
