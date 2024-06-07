// ---------------------------------------------Imports------------------------------------------------
import React, { useCallback, useEffect, useState } from 'react';
import ReactSkeletonLoading from '../../../../common/Skeleton-Loading/ReactSkeletonLoading';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAllCoderTasks } from '../../../../features/actions/project/task/coder/coderActions';
import { GrHistory } from 'react-icons/gr';
import { BsChatLeftDots } from 'react-icons/bs';
import { QACommunicationModal } from '../../../Modals/Tasks/QAModal/QACommunicationModal';
import { HistoryTableModal } from '../../../Modals/Tasks/HistoryTableModal/HistoryTableModal';
// -----------------------------------------------------------------------------------------------------

const UnderQA = ({ status1Options }) => {
  // ----------------------------------------------States-------------------------------------------------

  const [showCommunicationModal, setShowCommunicationModal] = useState(false);

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [currentTask, setCurrentTask] = useState({});

  const styles = {
    tableHeading: {
      fontWeight: 'bolder',
      fontSize: 'medium',
      color: 'black',
      textAlign: 'center',
    },
  };

  const commonStyles = {
    cursor: 'pointer',
    color: 'black',
  };
  // ----------------------------------------------Hooks-------------------------------------------------
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams('');
  const { coderTasks, isCoderTaskLoading } = useSelector(
    (state) => state?.coderTask
  );
  // -----------------------------------------------------------------------------------------------------
  // ----------------------------------------------Functions-----------------------------------------------
  // fetchCoderTasks
  const fetchCoderTasks = (query) => {
    dispatch(getAllCoderTasks(query));
  };

  // closeCommunicationModal -- function to close the edit modal
  const closeCommunicationModal = () => {
    setShowCommunicationModal(!showCommunicationModal);
  };

  // closeHistoryModal -- function to close the history modal
  const closeHistoryModal = useCallback(() => {
    setShowHistoryModal(!showHistoryModal);
  }, [showHistoryModal]);
  // -----------------------------------------------------------------------------------------------------
  // ----------------------------------------------useEffect-----------------------------------------------
  useEffect(() => {
    const url = (() => {
      return `trackerField=under_qa`;
    })();
    fetchCoderTasks(url);
  }, []);
  // -----------------------------------------------------------------------------------------------------
  const actionButtons = [
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
              <ReactSkeletonLoading thCount={12} />
            ) : (
              Array.isArray(coderTasks?.data?.coderTasks) &&
              coderTasks?.data?.coderTasks.length > 0 &&
              coderTasks?.data?.coderTasks?.map((task) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
      <QACommunicationModal
        showCommunicationModal={showCommunicationModal}
        closeCommunicationModal={closeCommunicationModal}
        currentTask={currentTask}
        fetchCoderTasks={fetchCoderTasks}
      />
      <HistoryTableModal
        showHistoryModal={showHistoryModal}
        closeHistoryModal={closeHistoryModal}
        currentTask={currentTask}
      />
    </div>
  );
};

export default UnderQA;
