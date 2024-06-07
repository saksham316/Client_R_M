import React, { memo, useEffect, useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ReactSkeletonLoading from '../../../common/Skeleton-Loading/ReactSkeletonLoading';
import Select from 'react-select';
import {
  assignCoderTasks,
  getAllCoderTasks,
} from '../../../features/actions/project/task/coder/coderActions';
import {
  getAllCoders,
  getAllNoteTakers,
  getAllQAs,
} from '../../../features/actions/auth/employeeActions';
import { resetCoderTaskStatus } from '../../../features/slices/project/task/coder/coderSlice';
import { getBucketData } from '../../../features/actions/project/task/bucket/bucketActions';
import {
  assignNoteTakerTasks,
  getAllNoteTakerTasks,
} from '../../../features/actions/project/task/noteTaker/noteTakerActions';
import { useForm } from 'react-hook-form';
import { resetNoteTakerTaskStatus } from '../../../features/slices/project/task/noteTaker/noteTakerSlice';
import { getAllQATasks } from '../../../features/actions/project/task/qa/qaActions';

// -----------------------------------------------------------------------------------------------------------------

const TasksAssignment = () => {
  // ------------------------------------------------States-----------------------------------------------------
  const styles = {
    tableHeading: {
      fontWeight: 'bolder',
      fontSize: 'medium',
      color: 'black',
      textAlign: 'center',
    },
  };

  const [coderTasksData, setCoderTasksData] = useState([]);
  const [noteTakerTasksData, setNoteTakerTasksData] = useState([]);
  const [coderQATasksData, setCoderQATasksData] = useState([]);
  const [noteTakerQATasksData, setNoteTakerQATasksData] = useState([]);
  const [codersData, setCodersData] = useState([]);
  const [noteTakersData, setNoteTakersData] = useState([]);
  const [qasData, setQASData] = useState([]);
  const [codersSelectOption, setCodersSelectOption] = useState([]);
  const [noteTakersSelectOption, setNoteTakersSelectOption] = useState([]);
  const [qasSelectOption, setQASSelectOption] = useState([]);
  const [selectedCoder, setSelectedCoder] = useState('');
  const [selectedNoteTaker, setSelectedNoteTaker] = useState('');
  const [selectedQA, setSelectedQA] = useState('');
  const [checkAllBoxes, setCheckAllBoxes] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedNoteTakerTasks, setSelectedNoteTakerTasks] = useState({});
  const [enabledQATable, setEnabledQATable] = useState(0);

  const status1Options = [
    { value: 'SUBMITTED_TO_CASE_MANAGER', label: 'Submitted to Case Manager' },
    { value: 'SUBMITTED_WITH_SIGNATURE', label: 'Submitted with Signature' },
    { value: 'REOPENED', label: 'Reopened' },
  ];
  // -----------------------------------------------------------------------------------------------------------

  // ------------------------------------------------Hooks-----------------------------------------------------
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, resetField, reset } = useForm();

  const { isCoderTaskLoading, isCoderTasksAssigned, coderTasks } = useSelector(
    (state) => state?.coderTask
  );

  const { isNoteTakerTaskLoading, isNoteTakerTasksAssigned, noteTakerTasks } =
    useSelector((state) => state?.noteTakerTask);

  const { isQATaskLoading, qaTasks } = useSelector((state) => state?.qaTask);

  const { loggedInUserData } = useSelector((state) => state?.authentication);

  const { coders, noteTakers, qas } = useSelector((state) => state.employees);
  // -----------------------------------------------------------------------------------------------------------

  // ----------------------------------------------Functions----------------------------------------------------

  // fetchCoderTasks
  const fetchCoderTasks = () => {
    dispatch(getAllCoderTasks());
  };

  // fetchNoteTakerTasks
  const fetchNoteTakerTasks = () => {
    dispatch(getAllNoteTakerTasks());
  };

  // fetchQATasks
  const fetchQATasks = () => {
    dispatch(getAllQATasks());
  };

  // fetchCoders
  const fetchCoders = () => {
    dispatch(getAllCoders());
  };

  // fetchNoteTakers
  const fetchNoteTakers = () => {
    dispatch(getAllNoteTakers());
  };

  // fetchQAs
  const fetchQAs = () => {
    dispatch(getAllQAs());
  };

  // fetchBucketData
  const fetchBucketData = () => {
    dispatch(getBucketData());
  };

  // selectionHandler -- handler to set the selected coder
  const selectionHandler = (e) => {
    try {
      if (
        loggedInUserData?.data?.role === '0' ||
        loggedInUserData?.data?.role === '1'
      ) {
        setSelectedCoder(e.value);
      } else if (
        loggedInUserData?.data?.role === '2' &&
        loggedInUserData?.data?.subRole === '0'
      ) {
        setSelectedCoder(e.value);
      } else if (
        loggedInUserData?.data?.role === '2' &&
        loggedInUserData?.data?.subRole === '1'
      ) {
        setSelectedNoteTaker(e.value);
      } else if (
        loggedInUserData?.data?.role === '2' &&
        loggedInUserData?.data?.subRole === '2'
      ) {
        setSelectedQA(e.value);
      } else {
        toast.error('Please select a user for assignment of the task');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // checkBoxChangeHandler -- handler to handle the changes of the checkbox
  const checkBoxChangeHandler = (e, coderTaskIndex, taskId) => {
    if (e.target.checked) {
      setSelectedIndexes([...selectedIndexes, coderTaskIndex]);
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      let arr = [];
      for (let i = 0; i < selectedIndexes.length; i++) {
        if (selectedIndexes[i] !== coderTaskIndex) {
          arr.push(selectedIndexes[i]);
        }
      }
      setSelectedIndexes(arr);

      arr = [];
      for (let i = 0; i < selectedTasks.length; i++) {
        if (selectedTasks[i] !== taskId) {
          arr.push(selectedTasks[i]);
        }
      }
      setSelectedTasks(arr);
    }
  };

  // taskAssignmentHandler -- handler to assign the tasks to the particular coder/notetaker/qa
  const taskAssignmentHandler = () => {
    try {
      if (
        loggedInUserData?.data?.role === '0' ||
        loggedInUserData?.data?.role === '1'
      ) {
        if (selectedCoder) {
          if (selectedTasks.length > 0) {
            dispatch(
              assignCoderTasks({
                coderId: selectedCoder,
                payload: { tasks: selectedTasks },
              })
            );
          } else {
            toast.error('Please select the task/tasks first');
          }
        } else {
          toast.error('Please select a user for assignment of the task');
        }
      } else if (
        loggedInUserData?.data?.role === '2' &&
        loggedInUserData?.data?.subRole === '0'
      ) {
        if (selectedCoder) {
          if (selectedTasks.length > 0) {
            dispatch(
              assignCoderTasks({
                coderId: selectedCoder,
                payload: { tasks: selectedTasks },
              })
            );
          } else {
            toast.error('Please select the task/tasks first');
          }
        } else {
          toast.error('Please select a user for assignment of the task');
        }
      } else if (
        loggedInUserData?.data?.role === '2' &&
        loggedInUserData?.data?.subRole === '1'
      ) {
        if (selectedNoteTaker) {
          if (
            selectedNoteTakerTasks &&
            Object.keys(selectedNoteTakerTasks).length > 0
          ) {
            dispatch(
              assignNoteTakerTasks({
                noteTakerId: selectedNoteTaker,
                payload: { tasks: selectedNoteTakerTasks },
              })
            );
          } else {
            toast.error('Please select the task/tasks first');
          }
        } else {
          toast.error('Please select a user for assignment of the task');
        }
      }
    } catch (error) {
      return toast.error(error.message);
    }
  };

  // taskCapacityHandler -- handler to handle the input of the task to be assigned
  const taskCapacityHandler = (e, index, currentCapacity, noteTakerTaskId) => {
    let { value } = e.target;
    let obj = JSON.parse(JSON.stringify(selectedNoteTakerTasks));
    if (parseInt(value) > parseInt(currentCapacity)) {
      delete obj[noteTakerTaskId];
      setSelectedNoteTakerTasks(obj);
      resetField(`taskCapacity${index}`);
      toast.error('Capacity should not exceed the current capacity');
    } else if (parseInt(value) < 0) {
      delete obj[noteTakerTaskId];
      setSelectedNoteTakerTasks(obj);
      resetField(`taskCapacity${index}`);
      toast.error('Capacity should not subceed 0');
    } else {
      if (parseInt(value) > 0) {
        obj[noteTakerTaskId] = value;
        setSelectedNoteTakerTasks(obj);
      }
    }
  };

  // -----------------------------------------------------------------------------------------------------------

  // ------------------------------------------------useEffects-------------------------------------------------
  useEffect(() => {
    if (coderTasks?.data?.coderTasks) {
      setCoderTasksData(coderTasks?.data?.coderTasks);
    }
    if (noteTakerTasks?.data?.noteTakerTasks) {
      setNoteTakerTasksData(noteTakerTasks?.data?.noteTakerTasks);
    }

    if (qaTasks?.data?.noteTakerQATasks || qaTasks?.data?.coderQATasks) {
      setNoteTakerQATasksData(qaTasks?.data?.noteTakerQATasks);
      setCoderQATasksData(qaTasks?.data?.coderQATasks);
    }

    if (coders?.data?.coders?.length > 0) {
      setCodersData(coders?.data?.coders);
      let arr = [];
      coders?.data?.coders.forEach((coder) => {
        arr.push({
          value: coder?._id,
          label: `${coder.firstName} ${coder.lastName}`,
        });
      });
      setCodersSelectOption(arr);
    }

    if (noteTakers?.data?.noteTakers?.length > 0) {
      setNoteTakersData(noteTakers?.data?.noteTakers);
      let arr = [];
      noteTakers?.data?.noteTakers.forEach((noteTaker) => {
        arr.push({
          value: noteTaker?._id,
          label: `${noteTaker.firstName} ${noteTaker.lastName}`,
        });
      });
      setNoteTakersSelectOption(arr);
    }

    if (qas?.data?.qas?.length > 0) {
      setQASData(qas?.data?.qas);
      let arr = [];
      qas?.data?.qas.forEach((qa) => {
        arr.push({
          value: qa?._id,
          label: `${qa.firstName} ${qa.lastName}`,
        });
      });
      setQASSelectOption(arr);
    }
  }, [coderTasks, coders, noteTakerTasks, noteTakers, qaTasks, qas]);

  useEffect(() => {
    if (isCoderTasksAssigned) {
      fetchCoderTasks();
      fetchBucketData();
      dispatch(resetCoderTaskStatus(false));
    }

    if (isNoteTakerTasksAssigned) {
      fetchNoteTakerTasks();
      // fetchBucketData();
      dispatch(resetNoteTakerTaskStatus(false));
      reset();
      setSelectedNoteTakerTasks({});
    }
  }, [isCoderTasksAssigned, isNoteTakerTasksAssigned]);

  useEffect(() => {
    if (
      loggedInUserData?.data?.role === '0' ||
      loggedInUserData?.data?.role === '1'
    ) {
      fetchCoderTasks();
      fetchCoders();
    } else if (
      loggedInUserData?.data?.role === '2' &&
      loggedInUserData?.data?.subRole === '0'
    ) {
      fetchCoderTasks();
      fetchCoders();
    } else if (
      loggedInUserData?.data?.role === '2' &&
      loggedInUserData?.data?.subRole === '1'
    ) {
      fetchNoteTakerTasks();
      fetchNoteTakers();
    } else if (
      loggedInUserData?.data?.role === '2' &&
      loggedInUserData?.data?.subRole === '2'
    ) {
      fetchQATasks();
      fetchQAs();
    }
  }, []);
  //------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------
  const selectOptions = () => {
    if (
      loggedInUserData?.data?.role === '0' ||
      loggedInUserData?.data?.role === '1'
    ) {
      return codersSelectOption;
    } else if (
      loggedInUserData?.data?.role === '2' &&
      loggedInUserData?.data?.subRole === '0'
    ) {
      return codersSelectOption;
    } else if (
      loggedInUserData?.data?.role === '2' &&
      loggedInUserData?.data?.subRole === '1'
    ) {
      return noteTakersSelectOption;
    } else if (
      loggedInUserData?.data?.role === '2' &&
      loggedInUserData?.data?.subRole === '2'
    ) {
      return qasSelectOption;
    }
  };
  //------------------------------------------------------------------------------------------------------------

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className={`text-lg font-semibold  dark:text-white`}>
              Tasks List
            </h2>
            <p className="mt-1 text-sm text-gray-700 text-black dark:text-white">
              This is a list of all the tasks. You can assign the tasks to the
              employee.
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-start items-center w-[100%]">
          <div className="employeesList w-[50%] flex justify-start gap-5">
            <Select
              className="w-[30%] "
              options={selectOptions()}
              onChange={selectionHandler}
            />
            <button
              className="bg-blue-900 pr-3 pl-3 text-white font-bold rounded-3xl tracking-widest"
              onClick={taskAssignmentHandler}
              disabled={isCoderTaskLoading}
            >
              Assign
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col w-[100%]">
          {loggedInUserData?.data?.role === '2' &&
            loggedInUserData?.data?.subRole === '2' && (
              <div className="flex gap-2 p-4">
                <button
                  className={`border rounded p-2 font-bold ${
                    enabledQATable === 0 ? 'bg-blue-900 text-white' : ''
                  }`}
                  onClick={() => {
                    setEnabledQATable(0);
                  }}
                >
                  Coders QA Tasks
                </button>
                <button
                  className={`border rounded p-2 font-bold ${
                    enabledQATable === 1 ? 'bg-blue-900 text-white' : ''
                  }`}
                  onClick={() => {
                    setEnabledQATable(1);
                  }}
                >
                  Note Takers QA Tasks
                </button>
              </div>
            )}
          <div className="relative w-[100%] shadow-lg sm:rounded-lg border overflow-x-auto">
            {loggedInUserData?.data?.role === '2' &&
            loggedInUserData?.data?.subRole === '0' ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            if (e.target.checked) {
                              let arr = [];
                              setCheckAllBoxes(true);
                              setSelectedIndexes([]);
                              coderTasksData.forEach((task) => {
                                arr.push(task?._id);
                              });
                              setSelectedTasks(arr);
                            } else {
                              setCheckAllBoxes(false);
                              setSelectedTasks([]);
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
                  {isCoderTaskLoading ? (
                    <ReactSkeletonLoading thCount={12} />
                  ) : (
                    Array.isArray(coderTasksData) &&
                    coderTasksData.length > 0 &&
                    coderTasksData.map((coderTask, coderTaskIndex) => {
                      return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={(e) => {
                                  checkBoxChangeHandler(
                                    e,
                                    coderTaskIndex,
                                    coderTask?._id
                                  );
                                }}
                                checked={
                                  (checkAllBoxes && true) ||
                                  selectedIndexes.includes(coderTaskIndex)
                                }
                                disabled={checkAllBoxes ? true : false}
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
                            {coderTask?.taskName || 'N/A'}
                          </th>
                          <td className="px-6 py-4">
                            {coderTask?.patientFirstName || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            {coderTask?.patientLastName || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            {coderTask?.targetDate || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            {coderTask?.mrnNumber || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            {coderTask?.providerFirst || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            {coderTask?.providerLast || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <Select
                              className="w-[100%] "
                              options={status1Options}
                              defaultValue={{ value: 'ss', label: 'label' }}
                            />

                            {/* {coderTask?.status1 || 'N/A'} */}
                          </td>
                          <td className="px-6 py-4">
                            {coderTask?.insurance || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            {coderTask?.priority || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            {`${coderTask?.ageOfRecord} days` || 'N/A'}
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
              loggedInUserData?.data?.subRole === '1' ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      style={styles.tableHeading}
                    >
                      Task name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 "
                      style={styles.tableHeading}
                    >
                      Current Capacity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 "
                      style={styles.tableHeading}
                    >
                      No. of Tasks to be assigned
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isNoteTakerTaskLoading ? (
                    <ReactSkeletonLoading thCount={3} />
                  ) : (
                    Array.isArray(noteTakerTasksData) &&
                    noteTakerTasksData.length > 0 &&
                    noteTakerTasksData.map(
                      (noteTakerTask, noteTakerTaskIndex) => {
                        return (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {noteTakerTask?.taskName || 'N/A'}
                            </th>
                            <td className="px-6 py-4 text-center">
                              {noteTakerTask?.currentCapacity || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {noteTakerTask?.taskName ? (
                                <input
                                  type="number"
                                  className="border rounded-lg w-[50%] text-center p-2 font-bold text-lg"
                                  {...register(
                                    `taskCapacity${noteTakerTaskIndex}`,
                                    {
                                      onChange: (e) => {
                                        taskCapacityHandler(
                                          e,
                                          noteTakerTaskIndex,
                                          noteTakerTask?.currentCapacity,
                                          noteTakerTask?._id
                                        );
                                      },
                                    }
                                  )}
                                />
                              ) : (
                                'N/A'
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )
                  )}
                </tbody>
              </table>
            ) : loggedInUserData?.data?.role === '2' &&
              loggedInUserData?.data?.subRole === '2' ? (
              enabledQATable === 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => {
                              if (e.target.checked) {
                                let arr = [];
                                setCheckAllBoxes(true);
                                setSelectedIndexes([]);
                                coderTasksData.forEach((task) => {
                                  arr.push(task?._id);
                                });
                                setSelectedTasks(arr);
                              } else {
                                setCheckAllBoxes(false);
                                setSelectedTasks([]);
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
                    {isCoderTaskLoading ? (
                      <ReactSkeletonLoading thCount={12} />
                    ) : (
                      Array.isArray(coderQATasksData) &&
                      coderQATasksData.length > 0 &&
                      coderQATasksData.map((coderTask, coderTaskIndex) => {
                        return (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-search-1"
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  onChange={(e) => {
                                    checkBoxChangeHandler(
                                      e,
                                      coderTaskIndex,
                                      coderTask?._id
                                    );
                                  }}
                                  checked={
                                    (checkAllBoxes && true) ||
                                    selectedIndexes.includes(coderTaskIndex)
                                  }
                                  disabled={checkAllBoxes ? true : false}
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
                              {coderTask?.taskName || 'N/A'}
                            </th>
                            <td className="px-6 py-4">
                              {coderTask?.patientFirstName || 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              {coderTask?.patientLastName || 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              {coderTask?.targetDate || 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              {coderTask?.mrnNumber || 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              {coderTask?.providerFirst || 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              {coderTask?.providerLast || 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              <Select
                                className="w-[100%] "
                                options={status1Options}
                                defaultValue={{ value: 'ss', label: 'label' }}
                              />

                              {/* {coderTask?.status1 || 'N/A'} */}
                            </td>
                            <td className="px-6 py-4">
                              {coderTask?.insurance || 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              {coderTask?.priority || 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              {`${coderTask?.ageOfRecord} days` || 'N/A'}
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
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => {
                              if (e.target.checked) {
                                let arr = [];
                                setCheckAllBoxes(true);
                                setSelectedIndexes([]);
                                coderTasksData.forEach((task) => {
                                  arr.push(task?._id);
                                });
                                setSelectedTasks(arr);
                              } else {
                                setCheckAllBoxes(false);
                                setSelectedTasks([]);
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
                        className="px-6 py-3"
                        style={styles.tableHeading}
                      >
                        Task name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 "
                        style={styles.tableHeading}
                      >
                        Assigned Capacity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isNoteTakerTaskLoading ? (
                      <ReactSkeletonLoading thCount={3} />
                    ) : (
                      Array.isArray(noteTakerQATasksData) &&
                      noteTakerQATasksData.length > 0 &&
                      noteTakerQATasksData.map(
                        (noteTakerTask, noteTakerTaskIndex) => {
                          return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="w-4 p-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={(e) => {
                                      checkBoxChangeHandler(
                                        e,
                                        noteTakerTaskIndex,
                                        noteTakerTask?._id
                                      );
                                    }}
                                    // checked={
                                    //   (checkAllBoxes && true) ||
                                    //   selectedIndexes.includes(coderTaskIndex)
                                    // }
                                    // disabled={checkAllBoxes ? true : false}
                                  />
                                  <label
                                    for="checkbox-table-search-1"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {noteTakerTask?.taskName || 'N/A'}
                              </td>
                              <td className="px-6 py-4 text-center">
                                {noteTakerTask?.assignedCapacity?.capacity ||
                                  'N/A'}
                              </td>
                            </tr>
                          );
                        }
                      )
                    )}
                  </tbody>
                </table>
              )
            ) : (
              'Invalid User'
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(TasksAssignment);
