import React, { memo, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ReactSkeletonLoading from '../../../common/Skeleton-Loading/ReactSkeletonLoading';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { TfiViewListAlt } from 'react-icons/tfi';
import {
  deleteEmployee,
  fetchCompleteEmployeesList,
  getAllCoders,
} from '../../../features/actions/auth/employeeActions';
import Highlighter from 'react-highlight-words';

// -----------------------------------------------------------------------------------------------------------------

const ViewEmployees = () => {
  // --------------------------------------------------States---------------------------------------------------
  const [searchedValue, setSearchedValue] = useState('');
  const [employeesData, setEmployeesData] = useState([]);
  const [codersData, setCodersData] = useState([]);
  // -----------------------------------------------------------------------------------------------------------
  // --------------------------------------------------Hooks----------------------------------------------------
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { employeesList, isLoading, coders } = useSelector(
    (state) => state?.employees
  );
  // ------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------Functions-------------------------------------------------
  // This method is used to show confirm alert during employee delete.
  const handleEmployeeDelete = (employeeId) => {
    try {
      confirmAlert({
        title: 'Employee Delete Confirmation!',
        message: 'Are you sure you want to delete this employee?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              dispatch(
                deleteEmployee({
                  employeeId: employeeId,
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

  // This method is used to search employees on the basis of employee's id or employee's name
  const handleSearch = () => {
    if (searchedValue === '' || employeesList?.length === 0) {
      setEmployeesData(employeesList);
      return;
    } else {
      const filterData = employeesList?.filter((employee) => {
        if (
          employee?._id
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchedValue?.toString()?.toLowerCase())
        )
          return employee;
        else if (
          employee?.name
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchedValue?.toString()?.toLowerCase())
        )
          return employee;
        else if (
          employee?.userName
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchedValue?.toString()?.toLowerCase())
        )
          return employee;
      });

      setEmployeesData(filterData);
    }
  };
  // -----------------------------------------------------------------------------------------------------------
  // -------------------------------------------------useEffect-------------------------------------------------
  useEffect(() => {
    if (employeesList?.length > 0) {
      setEmployeesData(employeesList);
    }
  }, [employeesList]);

  useEffect(() => {
    dispatch(fetchCompleteEmployeesList({ limit: Infinity }));
  }, []);
  // -----------------------------------------------------------------------------------------------------------

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className={`text-lg font-semibold  dark:text-white`}>
              Employees List
            </h2>
            <p className="mt-1 text-sm text-gray-700 text-black dark:text-white">
              This is a list of all employees. You can add new user, edit or
              delete existing ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate('/employees/addEmployee')}
              className="rounded-md dark:bg-white dark:text-black bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new Employee
            </button>
          </div>
        </div>
        <div className="mt-5 flex justify-center items-center w-full">
          <label
            htmlFor="search"
            className="font-bold text-black dark:text-white w-[175px] "
          >
            Search Employee:
          </label>
          <input
            type="search"
            name=""
            id="search"
            className="bg-meta-2 text-black w-full h-[40px]  shadow p-4 border rounded  "
            placeholder="Search your Employees by employee id, employee name or employee username "
            value={searchedValue}
            onChange={(e) => setSearchedValue(e?.target?.value)}
            onKeyUp={handleSearch}
            onBlur={handleSearch}
          />
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
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 "
                      >
                        <span className="text-black dark:text-white">
                          S.No.
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Employee Profile Image
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Employee Id
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Employee's User Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Employee's Full Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Email Address
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Sub Role
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-700 dark:text-white"
                      >
                        Is Disabled
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
                      <ReactSkeletonLoading thCount={12} />
                    ) : (
                      Array.isArray(employeesData) &&
                      employeesData?.length > 0 &&
                      employeesData.map((employee, i) => (
                        <tr key={employee?._id}>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            <img
                              src={
                                'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg' ||
                                employee?.avatar
                              }
                              height={70}
                              width={70}
                              alt="user-icon"
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {/* {employee?._id || 'N.A'} */}
                            <Highlighter
                              highlightClassName="text-meta-1"
                              searchWords={[searchedValue]}
                              autoEscape={true}
                              textToHighlight={employee?._id}
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {/* {employee?.userName || 'N.A'} */}
                            <Highlighter
                              highlightClassName="text-meta-1"
                              searchWords={[searchedValue]}
                              autoEscape={true}
                              textToHighlight={employee?.userName}
                            />
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {/* {employee?.name || 'N.A'} */}
                            <Highlighter
                              highlightClassName="text-meta-1"
                              searchWords={[searchedValue]}
                              autoEscape={true}
                              textToHighlight={`${employee?.firstName} ${employee?.lastName}`}
                            />
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {employee?.email || 'N.A'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {employee?.role || 'N.A'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {employee?.subRole || 'N.A'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {(employee?.disabled === true ? 'YES' : 'NO') ||
                              'N.A'}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {employee?.createdAt
                              ? moment(employee?.createdAt).format('LLLL')
                              : 'N.A'}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            {employee?.updatedAt
                              ? moment(employee?.updatedAt).format('LLLL')
                              : 'N.A'}
                          </td>
                          <tr>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium align-baseline">
                              <p
                                className="text-gray-700"
                                onClick={() =>
                                  navigate(
                                    `/employees/updateEmployee/${employee?._id}`,
                                    {
                                      state: employee,
                                    }
                                  )
                                }
                              >
                                <FaEdit size={20} />
                              </p>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium align-baseline">
                              <p
                                className="text-gray-700"
                                onClick={() =>
                                  handleEmployeeDelete(employee?._id)
                                }
                              >
                                <MdDelete size={20} />
                              </p>
                            </td>
                            <td
                              className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium"
                              title="View User's Details"
                            >
                              <p
                                className="text-gray-700"
                                onClick={() =>
                                  handleEmployeeDelete(employee?._id)
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
              {!Array.isArray(employeesData) ||
                (Array.isArray(employeesData) &&
                  employeesData?.length === 0 && (
                    <p className="m-4 text-black">No Employee Found</p>
                  ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(ViewEmployees);
