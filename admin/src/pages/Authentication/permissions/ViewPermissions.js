import React, { memo, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  deletePermission,
  fetchPermissionsList,
} from '../../../features/actions/auth/permissionActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ReactSkeletonLoading from '../../../common/Skeleton-Loading/ReactSkeletonLoading';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { TfiViewListAlt } from 'react-icons/tfi';
import { FaSearch } from 'react-icons/fa';
import Highlighter from 'react-highlight-words';

// -----------------------------------------------------------------------------------------------------------------

const ViewPermissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { permissionsList, isLoading } = useSelector(
    (state) => state?.permissions
  );

  const [searchedValue, setSearchedValue] = useState('');
  const [permissionsData, setPermissionsData] = useState([]);

  // This method is used to show confirm alert during permissions delete.
  const handlePermissionDelete = (pId) => {
    try {
      confirmAlert({
        title: 'Permission Delete Confirmation!',
        message: 'Are you sure you want to delete this permission?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              dispatch(
                deletePermission({
                  permissionId: pId,
                })
              );
            },
          },
          {
            label: 'No',
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      toast.error(error?.message);
    }
  };

  // This method is used to search permissions on the basis of permission's id or permission's name
  const handleSearch = () => {
    if (searchedValue === '' || permissionsList?.length === 0) {
      setPermissionsData(permissionsList);
      return;
    } else {
      const filterData = permissionsList?.filter((permission) => {
        if (
          permission?._id
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchedValue?.toString()?.toLowerCase())
        )
          return permission;
        else if (
          permission?.permissionName
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchedValue?.toString()?.toLowerCase())
        )
          return permission;
      });

      setPermissionsData(filterData);
    }
  };

  useEffect(() => {
    if (permissionsList?.length > 0) {
      setPermissionsData(permissionsList);
    }
  }, [permissionsList]);

  useEffect(() => {
    dispatch(fetchPermissionsList({ limit: Infinity }));
  }, []);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className={`text-lg font-semibold  dark:text-white`}>
              Permissions List
            </h2>
            <p className="mt-1 text-sm text-gray-700 text-black dark:text-white">
              This is a list of all permissions. You can add new permission,
              edit or delete existing ones.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/permissions/createPermission')}
            className="rounded-md dark:bg-white dark:text-black bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add new Permission
          </button>
        </div>
        <div className="mt-5 flex justify-center items-center w-full">
          <label
            htmlFor="search"
            className="font-bold text-black dark:text-white w-[175px] "
          >
            Search Permission:
          </label>
          <input
            type="search"
            name="search-permission"
            id="search"
            className="bg-meta-2 text-black w-[80%] h-[40px]  shadow p-4  rounded"
            placeholder="Search your Permissions by permission name or permission id"
            value={searchedValue}
            onChange={(e) => setSearchedValue(e?.target?.value)}
            onKeyUp={handleSearch}
            onBlur={handleSearch}
          />
          <div className="ml-4">
            <FaSearch onClick={handleSearch} size={20} />
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                      >
                        <span className="text-black dark:text-white">
                          S.No.
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Permission Id
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Permission's Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Created By (Id with Name)
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Last Updated At
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:bg-black  text-black dark:text-white">
                    {isLoading ? (
                      <ReactSkeletonLoading thCount={7} />
                    ) : (
                      Array.isArray(permissionsData) &&
                      permissionsData?.length > 0 &&
                      permissionsData.map((permission, i) => (
                        <tr key={permission?._id}>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {/* {permission?._id || 'N.A'} */}

                            <Highlighter
                              highlightClassName="text-meta-1"
                              searchWords={[searchedValue]}
                              autoEscape={true}
                              textToHighlight={permission?._id}
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {/* {permission?.permissionName || 'N.A'} */}

                            <Highlighter
                              highlightClassName="text-meta-1"
                              searchWords={[searchedValue]}
                              autoEscape={true}
                              textToHighlight={permission?.permissionName}
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {Object.keys(permission?.createdBy).length > 0
                              ? `${permission?.createdBy?._id} -
                                ${permission?.createdBy?.empFullName}`
                              : 'N.A'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {permission?.createdAt
                              ? moment(permission?.createdAt).format('LLLL')
                              : 'N.A'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {permission?.updatedAt
                              ? moment(permission?.updatedAt).format('LLLL')
                              : 'N.A'}
                          </td>
                          <tr>
                            <td
                              className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium"
                              title="Edit Permission"
                            >
                              <p
                                className="text-gray-700"
                                onClick={() =>
                                  navigate(
                                    `/permissions/updatePermission/${permission?._id}`,
                                    { state: permission }
                                  )
                                }
                              >
                                <FaEdit size={20} />
                              </p>
                            </td>
                            <td
                              className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium"
                              title="Delete Permission"
                            >
                              <p
                                className="text-gray-700"
                                onClick={() =>
                                  handlePermissionDelete(permission?._id)
                                }
                              >
                                <MdDelete size={20} />
                              </p>
                            </td>
                            <td
                              className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium"
                              title="View Permission's Details"
                            >
                              <p
                                className="text-gray-700"
                                onClick={() =>
                                  handlePermissionDelete(permission?._id)
                                }
                              >
                                <TfiViewListAlt size={20} />
                              </p>
                            </td>
                          </tr>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {!Array.isArray(permissionsData) ||
                (Array.isArray(permissionsData) &&
                  permissionsData?.length === 0 && (
                    <p className="m-4 text-black">No Permission Found</p>
                  ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(ViewPermissions);
