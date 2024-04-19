// ---------------------------------------------Imports------------------------------------------------
import React, { useCallback, useEffect, useState } from 'react';
import ReactSkeletonLoading from '../../../../common/Skeleton-Loading/ReactSkeletonLoading';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  getAllCoderTasks,
  updateCoderTask,
} from '../../../../features/actions/project/task/coder/coderActions';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { GrHistory } from 'react-icons/gr';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { WorkFlowEditModal } from '../../../Modals/Tasks/WorkFlowEditModal/WorkFlowEditModal';
import { HoldResolveQueryModal } from '../../../Modals/Tasks/HoldResolveQueryModal/HoldResolveQueryModal';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { HistoryTableModal } from '../../../Modals/Tasks/HistoryTableModal/HistoryTableModal';

// -----------------------------------------------------------------------------------------------------

const Hold = ({ status1Options }) => {
  // ----------------------------------------------States-------------------------------------------------
  const [showEditModal, setShowEditModal] = useState(false);

  const [showResolveQueryModal, setShowResolveQueryModal] = useState(false);

  const [coderTaskId, setCoderTaskId] = useState('');

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [currentTask, setCurrentTask] = useState({});

  const commonStyles = {
    cursor: 'pointer',
  };

  const styles = {
    tableHeading: {
      fontWeight: 'bolder',
      fontSize: 'medium',
      color: 'black',
      textAlign: 'center',
    },
  };
  // -----------------------------------------------------------------------------------------------------
  // ----------------------------------------------Hooks-------------------------------------------------
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams('');
  const { coderTasks, isCoderTaskLoading } = useSelector(
    (state) => state?.coderTask
  );
  // -----------------------------------------------------------------------------------------------------
  // ----------------------------------------------Functions-----------------------------------------------

  // taskUpdater -- function to dispatch the updateCoderTask Action
  const taskUpdater = (payload, coderTaskId) => {
    dispatch(updateCoderTask({ payload, coderTaskId }));
  };

  // fetchCoderTasks
  const fetchCoderTasks = (query) => {
    dispatch(getAllCoderTasks(query));
  };

  // closeEditModal -- function to close the edit modal
  const closeEditModal = useCallback(() => {
    setShowEditModal(!showEditModal);
  }, [showEditModal]);

  // closeResolveQueryModal -- function to close the resolve query modal
  const closeResolveQueryModal = useCallback(() => {
    setShowResolveQueryModal(!showResolveQueryModal);
  }, [showResolveQueryModal]);

  // closeHistoryModal -- function to close the history modal
  const closeHistoryModal = useCallback(() => {
    setShowHistoryModal(!showHistoryModal);
  }, [showHistoryModal]);

  // resolveQueryHandler -- function to set the task to the submission tracker field
  const resolveQueryHandler = (trackerField) => {
    try {
      if (trackerField && coderTaskId) {
        confirmAlert({
          title: 'Task Updation Confirmation!',
          message: `Are you sure you want to move the task to ${trackerField}?`,
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                let payload = {
                  taskTrackerField: trackerField
                    ?.toString()
                    .toUpperCase()
                    .trim(),
                  trackerFlag: true,
                  from: 'HOLD',
                };
                taskUpdater(payload, coderTaskId);
              },
            },
            {
              label: 'No',
              onClick: () => {},
            },
          ],
        });
      } else {
        toast.error('Please Select the Field');
      }
    } catch (error) {}
  };

  // -----------------------------------------------------------------------------------------------------
  // ----------------------------------------------useEffect-----------------------------------------------
  useEffect(() => {
    const url = (() => {
      return `trackerField=hold`;
    })();
    fetchCoderTasks(url);
  }, []);
  // -----------------------------------------------------------------------------------------------------
  const actionButtons = [
    {
      icon: () => {
        return (
          <MdOutlineRemoveRedEye
            size={30}
            style={{ ...commonStyles }}
            onClick={() => {
              setShowEditModal(!showEditModal);
            }}
          />
        );
      },
    },
    {
      icon: (taskId) => {
        return (
          <HiOutlineQuestionMarkCircle
            size={25}
            style={{ ...commonStyles }}
            onClick={() => {
              setShowResolveQueryModal(!showResolveQueryModal);
              setCoderTaskId(taskId);
            }}
          />
        );
      },
    },
    {
      icon: (taskId, idx, currentTask) => {
        return (
          <GrHistory
            size={22}
            style={{ ...commonStyles }}
            onClick={() => {
              setShowHistoryModal(!showHistoryModal);
              setCurrentTask(currentTask);
            }}
          />
        );
      },
    },
  ];
  // -----------------------------------------------------------------------------------------------------
  return (
    <div className="mt-6 flex flex-col w-[100%]">
      <div className="relative w-[100%] shadow-lg sm:rounded-lg border overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
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
              <th
                scope="col"
                className="px-6 py-3 "
                style={styles.tableHeading}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isCoderTaskLoading ? (
              <ReactSkeletonLoading thCount={13} />
            ) : (
              Array.isArray(coderTasks?.data?.coderTasks) &&
              coderTasks?.data?.coderTasks.length > 0 &&
              coderTasks?.data?.coderTasks?.map((task) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          for="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {task?.taskName || 'NA'}
                    </th>
                    <td className="px-6 py-4">
                      {task?.patientFirstName || 'NA'}
                    </td>
                    <td className="px-6 py-4">
                      {task?.patientLastName || `NA`}
                    </td>
                    <td className="px-6 py-4">{task?.targetDate || `NA`}</td>
                    <td className="px-6 py-4">{task?.mrnNumber || `NA`}</td>
                    <td className="px-6 py-4">{task?.providerFirst || `NA`}</td>
                    <td className="px-6 py-4">{task?.providerLast || `NA`}</td>
                    <td className="px-6 py-4">
                      <Select
                        className="w-[100%] "
                        options={status1Options}
                        defaultValue={{ value: 'ss', label: 'label' }}
                      />
                    </td>
                    <td className="px-6 py-4">{task?.insurance || `NA`}</td>
                    <td className="px-6 py-4">{task?.priority || `NA`}</td>
                    <td className="px-6 py-4">{task?.ageOfRecord || `NA`}</td>
                    <td className="px-6 py-7 flex gap-5 items-center">
                      {actionButtons.map((btn, idx) => {
                        return btn.icon(task?._id, idx, task);
                      })}
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
      <WorkFlowEditModal
        showEditModal={showEditModal}
        closeEditModal={closeEditModal}
        disabledTaskSubData={'QA'}
      />
      <HoldResolveQueryModal
        closeResolveQueryModal={closeResolveQueryModal}
        showResolveQueryModal={showResolveQueryModal}
        resolveQueryHandler={resolveQueryHandler}
      />
      <HistoryTableModal
        showHistoryModal={showHistoryModal}
        closeHistoryModal={closeHistoryModal}
        currentTask={currentTask}
      />
    </div>
  );
};

export default Hold;
