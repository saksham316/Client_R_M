import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updatePermissionDetails } from '../../../features/actions/auth/permissionActions';
import { customFieldregex } from '../../../utils/regex';
// -------------------------------------------------------------------------------------------

const UpdatePermission = () => {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      permissionName: state?.permissionName,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, permissionsList } = useSelector(
    (state) => state?.permissions
  );

  const [permissionData, setPermissionData] = useState({});

  // This method is used to add new Permission
  const updatePermissionHandler = (data) => {
    try {
      console.log('data:: ', data);
      data && setPermissionData(data);
      const reqPayload = {
        payload: {
          permissionName: data?.permissionName,
        },
        permissionId: state?._id,
      };
      dispatch(updatePermissionDetails(reqPayload));
    } catch (error) {
      console.log(error?.message);
    }
  };

  // Redirection to Permissions Listing Page after permission created.
  useEffect(() => {
    if (permissionsList[0]?.success) {
      navigate('/permissions/viewPermissions');
    }
  }, [permissionsList]);

  return (
    <div className="p-4 lg:w-[70%] w-screen mx-auto">
      <div className="flex flex-col gap-9 ">
        <form onSubmit={handleSubmit(updatePermissionHandler)}>
          <div
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-[350px]
"
          >
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white text-center">
                Update Permission Details
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Permission Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Permission Name"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  {...register('permissionName', {
                    required: {
                      value: true,
                      message: 'Permission Name is required',
                    },
                    minLength: {
                      value: 5,
                      message:
                        'Permission Name cannot be less than 5 characters.',
                    },
                    maxLength: {
                      value: 50,
                      message:
                        'Permission Name cannot be more than 50 characters.',
                    },
                    pattern: {
                      value: customFieldregex,
                      message: 'Permission Name is invalid',
                    },
                  })}
                />
                {errors?.permissionName && (
                  <div className="text-danger  dark:text-white pt-1">
                    {errors?.permissionName?.message ||
                      'Permission Name is required'}
                  </div>
                )}
              </div>
              <button
                to="#"
                className="inline-flex lg:w-[30%] mx-auto items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Update Permission
                {isLoading && Object.keys(permissionData).length > 0 && (
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
        </form>
      </div>
    </div>
  );
};

export default UpdatePermission;
