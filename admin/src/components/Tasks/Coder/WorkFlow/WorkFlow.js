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
import { FaPencilAlt, FaRegPauseCircle } from 'react-icons/fa';
import { IoReloadOutline } from 'react-icons/io5';
import { TiTick } from 'react-icons/ti';
import { GrHistory } from 'react-icons/gr';
import { GiSandsOfTime } from 'react-icons/gi';
import { WorkFlowEditModal } from '../../../Modals/Tasks/WorkFlowEditModal/WorkFlowEditModal';
import { useForm } from 'react-hook-form';
import { resetCoderTaskStatus } from '../../../../features/slices/project/task/coder/coderSlice';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import { HistoryTableModal } from '../../../Modals/Tasks/HistoryTableModal/HistoryTableModal';
import {
  getAllNoteTakerTasks,
  updateNoteTakerTask,
} from '../../../../features/actions/project/task/noteTaker/noteTakerActions';
import useAuth from '../../../../hooks/useAuth';
import { BsChatLeftDots } from 'react-icons/bs';
import qaSvg from '../../../../assets/Icons/QA.svg';
import { resetNoteTakerTaskStatus } from '../../../../features/slices/project/task/noteTaker/noteTakerSlice';
import {
  getAllQATasks,
  updateQATask,
} from '../../../../features/actions/project/task/qa/qaActions';
import { RiLoopLeftLine } from 'react-icons/ri';
import { QACommunicationModal } from '../../../Modals/Tasks/QAModal/QACommunicationModal';
import { resetQATaskStatus } from '../../../../features/slices/project/task/qa/qaSlice';

// -----------------------------------------------------------------------------------------------------

const WorkFlow = ({ status1Options }) => {
  // ----------------------------------------------States-------------------------------------------------

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);

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

  const { isQATaskLoading, qaTasks } = useSelector((state) => state?.qaTask);

  const { role, subRole } = useAuth();

  // -----------------------------------------------------------------------------------------------------
  // ----------------------------------------------Functions-----------------------------------------------

  // taskUpdater -- function to dispatch the updateCoderTask Action
  const taskUpdater = (payload, coderTaskId) => {
    role === '2' && subRole === '5'
      ? dispatch(updateQATask({ payload, coderTaskId }))
      : dispatch(updateCoderTask({ payload, coderTaskId }));
  };

  // noteTakerTaskUpdater -- function to dispatch the updateNoteTakerTask Action
  const noteTakerTaskUpdater = (payload, noteTakerTaskId) => {
    dispatch(updateNoteTakerTask({ payload, noteTakerTaskId }));
  };

  // fetchCoderTasks
  const fetchCoderTasks = (query) => {
    dispatch(getAllCoderTasks(query));
  };

  // fetchNoteTakerTasks
  const fetchNoteTakerTasks = (query) => {
    dispatch(getAllNoteTakerTasks(query));
  };

  // fetchQATasks
  const fetchQATasks = (query) => {
    dispatch(getAllQATasks(query));
  };

  // closeEditModal -- function to close the edit modal
  const closeEditModal = useCallback(() => {
    setShowEditModal(!showEditModal);
  }, [showEditModal]);

  // closeCommunicationModal -- function to close the communication modal
  const closeCommunicationModal = useCallback(() => {
    setShowCommunicationModal(!showCommunicationModal);
  }, [showCommunicationModal]);

  // closeHistoryModal -- function to close the history modal
  const closeHistoryModal = useCallback(() => {
    setShowHistoryModal(!showHistoryModal);
  }, [showHistoryModal]);

  // coderTaskIdSetter -- function to set the coder task id
  const coderTaskIdSetter = (id) => {
    setCoderTaskId(id);
  };

  // holdHandler -- function to set the task to the hold tracker field
  const holdHandler = (coderTaskId) => {
    try {
      confirmAlert({
        title: 'Task Updation Confirmation!',
        message: 'Are you sure you want to move the task to Hold?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              let payload = {
                taskTrackerField: 'HOLD',
                trackerFlag: true,
                from: role === '2' && subRole === '5' ? 'UNDER_QA' : 'WORKFLOW',
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
    } catch (error) {}
  };
  // submissionHandler -- function to set the task to the submission tracker field
  const submissionHandler = (coderTaskId) => {
    try {
      confirmAlert({
        title: 'Task Updation Confirmation!',
        message: 'Are you sure you want to move the task to Submission?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              let payload = {
                taskTrackerField: 'SUBMISSIONS',
                trackerFlag: true,
                from: 'WORKFLOW',
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
    } catch (error) {}
  };

  // approvalHandler -- function to set the task to the approvals tracker field
  const approvalHandler = (noteTakerTaskId) => {
    try {
      confirmAlert({
        title: 'Task Updation Confirmation!',
        message: 'Are you sure you want to move the task to Approvals?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              let payload = {
                taskTrackerField: 'APPROVALS',
                trackerFlag: true,
                from: 'WORKFLOW',
              };
              noteTakerTaskUpdater(payload, noteTakerTaskId);
            },
          },
          {
            label: 'No',
            onClick: () => {},
          },
        ],
      });
    } catch (error) {}
  };
  // pendingHandler -- function to set the task to the pending tracker field
  const pendingHandler = (noteTakerTaskId) => {
    try {
      confirmAlert({
        title: 'Task Updation Confirmation!',
        message: 'Are you sure you want to move the task to Pending?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              let payload = {
                taskTrackerField: 'PENDING',
                trackerFlag: true,
                from: 'WORKFLOW',
              };
              noteTakerTaskUpdater(payload, noteTakerTaskId);
            },
          },
          {
            label: 'No',
            onClick: () => {},
          },
        ],
      });
    } catch (error) {}
  };
  // returnedHandler -- function to set the task to the returned tracker field
  const returnedHandler = (noteTakerTaskId) => {
    try {
      confirmAlert({
        title: 'Task Updation Confirmation!',
        message: 'Are you sure you want to move the task to Returned?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              let payload = {
                taskTrackerField: 'RETURNED',
                trackerFlag: true,
                from: 'WORKFLOW',
              };
              noteTakerTaskUpdater(payload, noteTakerTaskId);
            },
          },
          {
            label: 'No',
            onClick: () => {},
          },
        ],
      });
    } catch (error) {}
  };
  // pleaseQaHandler -- function to set the task to the returned tracker field
  const pleaseQaHandler = (noteTakerTaskId) => {
    try {
      confirmAlert({
        title: 'Task Updation Confirmation!',
        message: 'Are you sure you want to move the task to Please QA?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              let payload = {
                taskTrackerField: 'PLEASE_QA',
                trackerFlag: true,
                from: 'WORKFLOW',
              };
              noteTakerTaskUpdater(payload, noteTakerTaskId);
            },
          },
          {
            label: 'No',
            onClick: () => {},
          },
        ],
      });
    } catch (error) {}
  };

  // underQaHandler -- function to set the task to the underqa tracker field
  const underQaHandler = (coderTaskId) => {
    try {
      confirmAlert({
        title: 'Task Updation Confirmation!',
        message: 'Are you sure you want to move the task Under QA?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              let payload = {
                taskTrackerField: 'UNDER_QA',
                trackerFlag: true,
                from: 'WORKFLOW',
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
    } catch (error) {}
  };

  // -----------------------------------------------------------------------------------------------------
  // ----------------------------------------------useEffect-----------------------------------------------

  useEffect(() => {
    if (coderTasks?.data?.coderTasks.length > 0) {
      let obj = {};
      coderTasks?.data?.coderTasks.forEach((task, index) => {
        obj[index] = false;
      });
      setCheckedState(obj);
    }
  }, [coderTasks]);

  useEffect(() => {
    if (isNoteTakerTaskUpdated) {
      fetchNoteTakerTasks(`trackerField=workflow`);
      dispatch(resetNoteTakerTaskStatus(false));
    }
  }, [isNoteTakerTaskUpdated]);

  useEffect(() => {
    const url = (() => {
      return `trackerField=workflow`;
    })();
    if (role === '0' || role === '1') {
      fetchCoderTasks(url);
    } else if (role === '2' && subRole === '3') {
      fetchCoderTasks(url);
    } else if (role === '2' && subRole === '4') {
      fetchNoteTakerTasks(url);
    } else if (role === '2' && subRole === '5') {
      fetchQATasks(url);
    }
  }, []);
  // -----------------------------------------------------------------------------------------------------
  const actionButtons = [
    {
      icon: (taskId, idx, currentTask) => {
        return (
          <FaPencilAlt
            size={22}
            style={{ ...commonStyles }}
            onClick={() => {
              coderTaskIdSetter(taskId);
              setShowEditModal(!showEditModal);
              setCurrentTask(currentTask);
            }}
            key={idx}
          />
        );
      },
    },
    {
      icon: (taskId) => {
        return (
          <FaRegPauseCircle
            size={22}
            style={{ ...commonStyles }}
            onClick={() => {
              holdHandler(taskId);
            }}
          />
        );
      },
    },
    {
      icon: (taskId) => {
        return (
          <TiTick
            size={25}
            style={{ ...commonStyles }}
            onClick={() => {
              submissionHandler(taskId);
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
  const noteTakerActionButtons = [
    {
      icon: (taskId, idx, currentTask) => {
        return (
          <TiTick
            size={22}
            style={{ ...commonStyles }}
            onClick={() => {
              approvalHandler(taskId);
            }}
            key={idx}
          />
        );
      },
    },
    {
      icon: (taskId) => {
        return (
          <GiSandsOfTime
            size={22}
            style={{ ...commonStyles }}
            onClick={() => {
              pendingHandler(taskId);
            }}
          />
        );
      },
    },
    {
      icon: (taskId) => {
        return (
          <IoReloadOutline
            size={25}
            style={{ ...commonStyles }}
            onClick={() => {
              returnedHandler(taskId);
            }}
          />
        );
      },
    },
    {
      icon: (taskId, idx, currentTask) => {
        return (
          <BsChatLeftDots
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
    {
      icon: (taskId, idx, currentTask) => {
        return (
          <img
            src={qaSvg}
            height={'35px'}
            width={'35px'}
            className="cursor-pointer"
            onClick={() => {
              pleaseQaHandler(taskId);
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
  const qaActionButtons = [
    {
      icon: (taskId, idx, currentTask) => {
        return (
          <FaPencilAlt
            size={22}
            style={{ ...commonStyles }}
            onClick={() => {
              setShowEditModal(!showEditModal);
              setCoderTaskId(taskId);
              setCurrentTask(currentTask);
            }}
            key={idx}
          />
        );
      },
    },
    {
      icon: (taskId) => {
        return (
          <FaRegPauseCircle
            size={22}
            style={{ ...commonStyles }}
            onClick={() => {
              holdHandler(taskId);
            }}
          />
        );
      },
    },
    {
      icon: (taskId, idx, currentTask) => {
        return (
          <BsChatLeftDots
            size={22}
            style={{ ...commonStyles }}
            onClick={() => {
              setShowCommunicationModal(!showCommunicationModal);
              setCurrentTask(currentTask);
            }}
          />
        );
      },
    },
    {
      icon: (taskId, idx) => {
        return (
          <RiLoopLeftLine size={25} style={{ ...commonStyles }} key={idx} />
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
      <div className="relative z-[69] w-[100%] shadow-lg sm:rounded-lg border overflow-x-auto">
        {loggedInUserData?.data?.role === '2' &&
        loggedInUserData?.data?.subRole === '3' ? (
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
                        if (coderTasks?.data?.coderTasks.length > 0) {
                          let obj = {};
                          coderTasks?.data?.coderTasks.forEach(
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
                  className="px-13 py-3 "
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
                <ReactSkeletonLoading thCount={12} />
              ) : (
                Array.isArray(coderTasks?.data?.coderTasks) &&
                coderTasks?.data?.coderTasks.length > 0 &&
                coderTasks?.data?.coderTasks?.map((task, index) => {
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
                      <td className="px-6 py-4">
                        {task?.patientFirstName || 'NA'}
                      </td>
                      <td className="px-6 py-4">
                        {task?.patientLastName || `NA`}
                      </td>
                      <td className="px-6 py-4">{task?.targetDate || `NA`}</td>
                      <td className="px-6 py-4">{task?.mrnNumber || `NA`}</td>
                      <td className="px-6 py-4">
                        {task?.providerFirst || `NA`}
                      </td>
                      <td className="px-6 py-4">
                        {task?.providerLast || `NA`}
                      </td>
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
                          let icon = btn.icon;
                          return icon(task?._id, idx, task);
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
        ) : loggedInUserData?.data?.role === '2' &&
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
                      <td className="px-6 py-7 flex gap-5 items-center">
                        {noteTakerActionButtons.map((btn, idx) => {
                          let icon = btn.icon;
                          return icon(task?._id, idx, task);
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
        ) : loggedInUserData?.data?.role === '2' &&
          loggedInUserData?.data?.subRole === '5' ? (
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
                        if (qaTasks?.data?.coderQATasks.length > 0) {
                          let obj = {};
                          qaTasks?.data?.coderQATasks.forEach((task, index) => {
                            obj[index] = e.target.checked;
                          });
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
                  className="px-13 py-3 "
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
              {isQATaskLoading ? (
                <ReactSkeletonLoading thCount={12} />
              ) : (
                Array.isArray(qaTasks?.data?.coderQATasks) &&
                qaTasks?.data?.coderQATasks.length > 0 &&
                qaTasks?.data?.coderQATasks?.map((task, index) => {
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
                      <td className="px-6 py-4">
                        {task?.patientFirstName || 'NA'}
                      </td>
                      <td className="px-6 py-4">
                        {task?.patientLastName || `NA`}
                      </td>
                      <td className="px-6 py-4">{task?.targetDate || `NA`}</td>
                      <td className="px-6 py-4">{task?.mrnNumber || `NA`}</td>
                      <td className="px-6 py-4">
                        {task?.providerFirst || `NA`}
                      </td>
                      <td className="px-6 py-4">
                        {task?.providerLast || `NA`}
                      </td>
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
                        {qaActionButtons.map((btn, idx) => {
                          let icon = btn.icon;
                          return icon(task?._id, idx, task);
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
        ) : (
          'Invalid User'
        )}
      </div>
      <WorkFlowEditModal
        showEditModal={showEditModal}
        closeEditModal={closeEditModal}
        disabledTaskSubData={role === '2' && subRole === '5' ? '' : 'QA'}
        coderTaskId={coderTaskId}
        currentTask={currentTask}
        holdHandler={holdHandler}
        submissionHandler={submissionHandler}
        underQaHandler={underQaHandler}
      />
      <QACommunicationModal
        showCommunicationModal={showCommunicationModal}
        closeCommunicationModal={closeCommunicationModal}
        currentTask={currentTask}
        fetchCoderTasks={fetchCoderTasks}
        fetchQATasks={fetchQATasks}
      />

      <HistoryTableModal
        showHistoryModal={showHistoryModal}
        closeHistoryModal={closeHistoryModal}
        currentTask={currentTask}
      />
    </div>
  );
};

export default memo(WorkFlow);
