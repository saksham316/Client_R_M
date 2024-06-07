// ---------------------------------------------Imports------------------------------------------------
import React, { memo, useCallback, useEffect, useState } from 'react';
import ReactSkeletonLoading from '../../../../common/Skeleton-Loading/ReactSkeletonLoading';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';
import {
  getAllCoderTasks,
  updateCoderTask,
} from '../../../../features/actions/project/task/coder/coderActions';
import { useDispatch, useSelector } from 'react-redux';
import { GrHistory } from 'react-icons/gr';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import { HistoryTableModal } from '../../../Modals/Tasks/HistoryTableModal/HistoryTableModal';
import {
  getAllNoteTakerTasks,
  updateNoteTakerTask,
} from '../../../../features/actions/project/task/noteTaker/noteTakerActions';
import useAuth from '../../../../hooks/useAuth';
import { resetNoteTakerTaskStatus } from '../../../../features/slices/project/task/noteTaker/noteTakerSlice';

// -----------------------------------------------------------------------------------------------------

const Pending = ({ status1Options }) => {
  // ----------------------------------------------States-------------------------------------------------

  const [showEditModal, setShowEditModal] = useState(false);

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [checkedState, setCheckedState] = useState({});

  const [coderTaskId, setCoderTaskId] = useState('');

  const [currentTask, setCurrentTask] = useState({});

  const { loggedInUserData } = useAuth();

  const commonStyles = {
    cursor: 'pointer',
    color: 'black',
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

  const { coderTasks, isCoderTaskLoading, isCoderTaskUpdated } = useSelector(
    (state) => state?.coderTask
  );
  const { noteTakerTasks, isNoteTakerTaskLoading, isNoteTakerTaskUpdated } =
    useSelector((state) => state?.noteTakerTask);

  const { role, subRole } = useAuth();

  // -----------------------------------------------------------------------------------------------------
  // ----------------------------------------------Functions-----------------------------------------------

  // noteTakerTaskUpdater -- function to dispatch the updateNoteTakerTask Action
  const noteTakerTaskUpdater = (payload, noteTakerTaskId) => {
    dispatch(updateNoteTakerTask({ payload, noteTakerTaskId }));
  };

  // fetchNoteTakerTasks
  const fetchNoteTakerTasks = (query) => {
    dispatch(getAllNoteTakerTasks(query));
  };

  // closeEditModal -- function to close the edit modal
  const closeEditModal = useCallback(() => {
    setShowEditModal(!showEditModal);
  }, [showEditModal]);

  // closeHistoryModal -- function to close the history modal
  const closeHistoryModal = useCallback(() => {
    setShowHistoryModal(!showHistoryModal);
  }, [showHistoryModal]);

  // -----------------------------------------------------------------------------------------------------
  // ----------------------------------------------useEffect-----------------------------------------------


  useEffect(() => {
    const url = (() => {
      return `trackerField=pending`;
    })();
    if (role === '0' || role === '1') {
      fetchNoteTakerTasks(url);
    } else if (role === '2' && subRole === '4') {
      fetchNoteTakerTasks(url);
    }
  }, []);
  // -----------------------------------------------------------------------------------------------------
  const noteTakerActionButtons = [
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
        {loggedInUserData?.data?.role === '2' &&
        loggedInUserData?.data?.subRole === '4' ? (
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => {
                        if (noteTakerTasks?.data?.noteTakerTasks.length > 0) {
                          let obj = {};
                          noteTakerTasks?.data?.noteTakerTasks.forEach(
                            (task, index) => {
                              obj[index] = e.target.checked;
                            }
                          );
                          setCheckedState(obj);
                        }
                      }}
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
                  MRN Number
                </th>
                <th
                  scope="col"
                  className="px-13 py-3 "
                  style={styles.tableHeading}
                >
                  Status 1
                </th>
                <th
                  scope="col"
                  className="px-13 py-3 "
                  style={styles.tableHeading}
                >
                  Status 2
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
                  Capacity
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
              {isNoteTakerTaskLoading ? (
                <ReactSkeletonLoading thCount={12} />
              ) : (
                Array.isArray(noteTakerTasks?.data?.noteTakerTasks) &&
                noteTakerTasks?.data?.noteTakerTasks.length > 0 &&
                noteTakerTasks?.data?.noteTakerTasks?.map((task, index) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={index}
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={checkedState[index]}
                            onChange={(e) => {
                              setCheckedState({
                                ...checkedState,
                                [index]: e.target.checked,
                              });
                            }}
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
                      <td className="px-6 py-4">{task?.mrnNumber || `NA`}</td>
                      <td className="px-6 py-4">
                        <Select
                          className="w-[100%] "
                          options={status1Options}
                          defaultValue={{ value: 'ss', label: 'label' }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Select
                          className="w-[100%] "
                          options={status1Options}
                          defaultValue={{ value: 'ss', label: 'label' }}
                        />
                      </td>
                      <td className="px-6 py-4">{task?.insurance || `NA`}</td>
                      <td className="px-6 py-4">
                        {task?.assignedCapacity[0].capacity || `NA`}
                      </td>
                      <td className="px-6 py-7 flex gap-5 items-center justify-center">
                        {noteTakerActionButtons.map((btn, idx) => {
                          let icon = btn.icon;
                          return icon(task?._id, idx, task);
                        })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        ) : (
          'Invalid User'
        )}
      </div>
      <HistoryTableModal
        showHistoryModal={showHistoryModal}
        closeHistoryModal={closeHistoryModal}
        currentTask={currentTask}
      />
    </div>
  );
};

export default memo(Pending);
