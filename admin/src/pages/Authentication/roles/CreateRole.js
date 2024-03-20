import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { customFieldregex } from '../../../utils/regex';
import { addNewRole } from '../../../features/actions/auth/roleActions';
import { fetchPermissionsList } from '../../../features/actions/auth/permissionActions';
import Select from 'react-select';

// -------------------------------------------------------------------------------------------

const CreateRole = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, rolesList } = useSelector((state) => state?.roles);
  const { permissionsList } = useSelector((state) => state?.permissions);
  const [roleData, setRoleData] = useState({});
  const [modifiedPermissionsList, setModifiedPermissionsList] = useState([]);

  // This method is used to add new Role
  const addRoleHandler = (data) => {
    try {
      console.log('data:: ', data);
      data && setRoleData(data);
      const reqPayload = {
        payload: {
          roleName: data?.roleName,
          permissions: [...data?.permissions?.map((per) => per?.value)],
        },
      };
      dispatch(addNewRole(reqPayload));
    } catch (error) {
      console.log(error?.message);
    }
  };

  // Redirection to Roles Listing Page after role created.
  useEffect(() => {
    if (rolesList[0]?.success) {
      navigate('/roles/viewRoles');
    }
  }, [rolesList]);

  useEffect(() => {
    dispatch(fetchPermissionsList({ limit: Infinity }));
  }, []);

  useEffect(() => {
    if (Array.isArray(permissionsList) && permissionsList?.length > 0) {
      setModifiedPermissionsList(
        permissionsList.map((permission) => {
          return {
            label: permission?.permissionName,
            value: permission?._id,
          };
        })
      );
    }
  }, [permissionsList]);

  return (
    <div className="p-4 lg:w-[70%] w-screen mx-auto">
      <div className="flex flex-col gap-9 ">
        <form onSubmit={handleSubmit(addRoleHandler)}>
          <div
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-[450px]
"
          >
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white text-center">
                Add New Role
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Role Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Role Name"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  {...register('roleName', {
                    required: {
                      value: true,
                      message: 'Role Name is required',
                    },
                    minLength: {
                      value: 3,
                      message: 'Role Name cannot be less than 3 characters.',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Role Name cannot be more than 50 characters.',
                    },
                    pattern: {
                      value: customFieldregex,
                      message: 'Role Name is invalid',
                    },
                  })}
                />
                {errors?.roleName && (
                  <div className="dark:text-white text-danger pt-1">
                    {errors?.roleName?.message || 'Role Name is required'}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white ">
                  Select Permissions
                </label>
                <Controller
                  name="permissions"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      options={modifiedPermissionsList}
                      onChange={(val) => {
                        onChange(val);
                      }}
                      isMulti
                      isClearable
                      isSearchable
                    />
                  )}
                  rules={{
                    required: {
                      message: 'Permission is required',
                      value: true,
                    },
                  }}
                />
                <span className="fw-normal fs-6 text-danger dark:text-white">
                  {errors?.permissions?.message}
                </span>
              </div>
              <button
                to="#"
                className="inline-flex lg:w-[30%] mx-auto items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 "
              >
                Add Role
                {isLoading && Object.keys(roleData).length > 0 && (
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

export default CreateRole;
