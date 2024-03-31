import React, { memo, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactSkeletonLoading from '../../../common/Skeleton-Loading/ReactSkeletonLoading';
import Select from 'react-select';
import {
  assignCoderTasks,
  getAllCoderTasks,
} from '../../../features/actions/project/task/coder/coderActions';
import { getAllCoders } from '../../../features/actions/auth/employeeActions';
import { resetCoderTaskStatus } from '../../../features/slices/project/task/coder/coderSlice';
import { getBucketData } from '../../../features/actions/project/task/bucket/bucketActions';

// -----------------------------------------------------------------------------------------------------------------

const MyBucket = () => {
  // ------------------------------------------------States-----------------------------------------------------
  const styles = {
    tableHeading: {
      fontWeight: 'bolder',
      fontSize: 'medium',
      color: 'black',
      textAlign: 'center',
    },
  };

  const status1Options = [
    { value: 'SUBMITTED_TO_CASE_MANAGER', label: 'Submitted to Case Manager' },
    { value: 'SUBMITTED_WITH_SIGNATURE', label: 'Submitted with Signature' },
    { value: 'REOPENED', label: 'Reopened' },
  ];
  // -----------------------------------------------------------------------------------------------------------

  // ------------------------------------------------Hooks-----------------------------------------------------
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isBucketLoading, bucketData } = useSelector((state) => state?.bucket);

  // -----------------------------------------------------------------------------------------------------------

  // ----------------------------------------------Functions----------------------------------------------------

  // fetchBucketData
  const fetchBucketData = () => {
    dispatch(getBucketData());
  };

  // -----------------------------------------------------------------------------------------------------------

  // ------------------------------------------------useEffects-------------------------------------------------
  useEffect(() => {
    fetchBucketData();
  }, []);
  //------------------------------------------------------------------------------------------------------------

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className={`text-lg font-semibold  dark:text-white`}>
              My Bucket
            </h2>
            <p className="mt-1 text-sm text-gray-700 text-black dark:text-white">
              This is a list of all the assigned tasks.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col w-[100%]">
          <div className="relative w-full shadow-lg sm:rounded-lg border overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Task name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Patient First name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Patient Last name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Target Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    MRN Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Provider First
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Provider Last
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Status 1
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Insurance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 "
                    style={styles.tableHeading}
                  >
                    Age of Record
                  </th>
                </tr>
              </thead>
              <tbody>
                {isBucketLoading ? (
                  <ReactSkeletonLoading thCount={12} />
                ) : (
                  Array.isArray(bucketData?.data?.bucket) &&
                  bucketData?.data?.bucket.length > 0 &&
                  bucketData?.data?.bucket.map((task, taskIndex) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {task?.taskName || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          {task?.patientFirstName || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          {task?.patientLastName || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          {task?.targetDate || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          {task?.mrnNumber || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          {task?.providerFirst || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          {task?.providerLast || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <Select
                            className="w-[100%] "
                            options={status1Options}
                            defaultValue={{ value: 'ss', label: 'label' }}
                          />

                          {/* {task?.status1 || 'N/A'} */}
                        </td>
                        <td className="px-6 py-4">
                          {task?.insurance || 'N/A'}
                        </td>
                        <td className="px-6 py-4">{task?.priority || 'N/A'}</td>
                        <td className="px-6 py-4">
                          {`${task?.ageOfRecord} days` || 'N/A'}
                        </td>
                        {/* <td className="flex items-center px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                      Remove
                    </a>
                  </td> */}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(MyBucket);
