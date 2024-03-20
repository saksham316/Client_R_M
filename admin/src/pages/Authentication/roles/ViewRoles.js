import React, { memo, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  deleteRole,
  fetchRolesList,
} from '../../../features/actions/auth/roleActions';
import ReactSkeletonLoading from '../../../common/Skeleton-Loading/ReactSkeletonLoading';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { TfiViewListAlt } from 'react-icons/tfi';
import { FaSearch } from 'react-icons/fa';
import Highlighter from 'react-highlight-words';
// -----------------------------------------------------------------------------------------------------------------

const ViewRoles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rolesList, isLoading } = useSelector((state) => state?.roles);

  const [searchedValue, setSearchedValue] = useState('');
  const [rolesData, setRolesData] = useState([]);

  // This method is used to show confirm alert during roles delete.
  const handleRoleDelete = (rId) => {
    try {
      confirmAlert({
        title: 'Role Delete Confirmation!',
        message: 'Are you sure you want to delete this role?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              dispatch(
                deleteRole({
                  roleId: rId,
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

  // This method is used to search roles on the basis of role's id or role's name
  const handleSearch = () => {
    if (searchedValue === '' || rolesList?.length === 0) {
      setRolesData(rolesList);
      return;
    } else {
      const filterData = rolesList?.filter((role) => {
        if (
          role?._id
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchedValue?.toString()?.toLowerCase())
        )
          return role;
        else if (
          role?.roleName
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchedValue?.toString()?.toLowerCase())
        )
          return role;
      });

      setRolesData(filterData);
    }
  };

  useEffect(() => {
    if (rolesList?.length > 0) {
      setRolesData(rolesList);
    }
  }, [rolesList]);

  useEffect(() => {
    dispatch(fetchRolesList({ limit: Infinity }));
  }, []);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className={`text-lg font-semibold  dark:text-white`}>
              Roles List
            </h2>
            <p className="mt-1 text-sm text-gray-700 text-black dark:text-white">
              This is a list of all roles. You can add new role, edit or delete
              existing ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate('/roles/createRole')}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold dark:bg-white dark:text-black text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new Role
            </button>
          </div>
        </div>
        <div className="mt-5 flex justify-center items-center w-full">
          <label
            htmlFor="search"
            className="font-bold text-black dark:text-white w-[175px] "
          >
            Search Role:
          </label>
          <input
            type="search"
            name="search-roles"
            id="search"
            className="bg-meta-2 text-black w-[80%] h-[40px]  shadow p-4  rounded"
            placeholder="Search your Roles by role name or role id"
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
                        Role Id
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Role's Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Created By (Name with ID)
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
                      Array.isArray(rolesData) &&
                      rolesData?.length > 0 &&
                      rolesData.map((role, i) => (
                        <tr key={role?._id}>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {/* {role?._id || 'N.A'} */}
                            <Highlighter
                              highlightClassName="text-meta-1"
                              searchWords={[searchedValue]}
                              autoEscape={true}
                              textToHighlight={role?._id}
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {/* {role?.roleName || 'N.A'} */}
                            <Highlighter
                              highlightClassName="text-meta-1"
                              searchWords={[searchedValue]}
                              autoEscape={true}
                              textToHighlight={role?.roleName}
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {Object.keys(role?.createdBy).length > 0
                              ? `${role?.createdBy?._id} -
                                ${role?.createdBy?.empFullName}`
                              : 'N.A'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {role?.createdAt
                              ? moment(role?.createdAt).format('LLLL')
                              : 'N.A'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {role?.updatedAt
                              ? moment(role?.updatedAt).format('LLLL')
                              : 'N.A'}
                          </td>
                          <tr>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              <p
                                className="text-gray-700"
                                onClick={() =>
                                  navigate(`/roles/updateRole/${role?._id}`, {
                                    state: role,
                                  })
                                }
                              >
                                <FaEdit size={20} />
                              </p>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              <p
                                className="text-gray-700"
                                onClick={() => handleRoleDelete(role?._id)}
                              >
                                <MdDelete size={20} />
                              </p>
                            </td>
                            <td
                              className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium"
                              title="View Role's Details"
                            >
                              <p
                                className="text-gray-700"
                                onClick={() => handleRoleDelete(role?._id)}
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
              {!Array.isArray(rolesData) ||
                (Array.isArray(rolesData) && rolesData?.length === 0 && (
                  <p className="m-4 text-black">No Role Found</p>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(ViewRoles);
