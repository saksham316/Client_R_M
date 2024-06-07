// ---------------------------------------------Imports--------------------------------------------------
import React, { useState, useRef, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { resetCoderTaskStatus } from '../../../../features/slices/project/task/coder/coderSlice';
import {
  getAllCoderTasks,
  updateCoderTask,
} from '../../../../features/actions/project/task/coder/coderActions';
import { FormLoader } from '../../../../common/Loader/FormLoaders/FormLoader';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment';
import useAuth from '../../../../hooks/useAuth';

// -------------------------------------------------------------------------------------------------------
export const HistoryTableModal = memo(
  ({ showHistoryModal, closeHistoryModal, currentTask }) => {
    // -------------------------------------------States---------------------------------------------------
    const commonStyles = {
      border: '1px solid black',
      width: '100% !important',
      borderRadius: '10px',
      resize: 'none',
      padding: '5px',
      color: 'blue',
    };

    const resolveQuerySelectOptions = [
      {
        value: 'Submissions',
        label: 'Submissions',
      },
      { value: 'Workflow', label: 'Workflow' },
      { value: 'Under_Qa', label: 'Under QA' },
    ];

    const [isShowing, setIsShowing] = useState(false);

    const [trackerField, setTrackerField] = useState('');
    // -------------------------------------------------------------------------------------------------------
    // -------------------------------------------Hooks---------------------------------------------------
    const wrapperRef = useRef(null);

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm();

    const closeModalRef = useRef();

    const { isCoderTaskLoading, isCoderTaskUpdated } = useSelector(
      (state) => state?.coderTask
    );

    const { loggedInUserData } = useAuth();

    // -------------------------------------------------------------------------------------------------------
    // -------------------------------------------Functions---------------------------------------------------

    // fetchCoderTasks
    const fetchCoderTasks = (query) => {
      dispatch(getAllCoderTasks(query));
    };

    // -------------------------------------------------------------------------------------------------------
    // -------------------------------------------useEffects---------------------------------------------------
    useEffect(() => {
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsShowing(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [wrapperRef]);

    useEffect(() => {
      if (showHistoryModal) {
        setIsShowing(!isShowing);
      }
    }, [showHistoryModal]);

    useEffect(() => {
      if (isCoderTaskUpdated) {
        let query = (() => {
          let field = searchParams.get('trackerField');
          return `trackerField=${field}`;
        })();
        fetchCoderTasks(query);
        dispatch(resetCoderTaskStatus(false));
        closeModalRef?.current?.click();
      }
    }, [isCoderTaskUpdated]);

    // -------------------------------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------------------------------

    return (
      <>
        {isShowing && typeof document !== 'undefined'
          ? ReactDOM.createPortal(
              <div
                className="absolute top-0 left-0 z-[71] flex pt-2 pb-2 w-full h-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm overflow-y-auto"
                aria-labelledby="header-2a content-2a"
                aria-modal="true"
                tabindex="-1"
                role="dialog"
              >
                {/*    <!-- Modal --> */}
                <div
                  className="flex  w-[50%] flex-col gap-6 h-[80vh]  rounded-lg bg-white border-2 p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                  id="modal"
                  role="document"
                >
                  {/*        <!-- Modal header --> */}
                  <header id="header-2a" className="flex items-center gap-2">
                    <h3 className="flex-1 md:text-xl sm:text-md text-sm font-medium text-slate-700 ">
                      History of the record
                    </h3>
                    <button
                      onClick={() => {
                        setIsShowing(false);
                        closeHistoryModal();
                      }}
                      className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-md font-medium tracking-wide  text-black transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                      aria-label="close dialog"
                      ref={closeModalRef}
                    >
                      <span className="relative only:-mx-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          role="graphics-symbol"
                          aria-labelledby="title-79 desc-79"
                        >
                          <title id="title-79">Icon title</title>
                          <desc id="desc-79">
                            A more detailed description of the icon
                          </desc>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    </button>
                  </header>
                  {/*        <!-- Modal body --> */}
                  {isCoderTaskLoading ? (
                    <FormLoader />
                  ) : (
                    <>
                      <div className="flex gap-4">
                        <div>
                          <p className="font-bold text-black mt-2">
                            First Name
                          </p>
                          <p className="font-bold text-black mt-2">Last Name</p>
                          <p className="font-bold text-black mt-2">
                            MRN Number
                          </p>
                        </div>
                      </div>

                      <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border">
                            <tr>
                              <th scope="col" class="px-6 py-3">
                                Stage
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Updated Time
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Date
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Coder Name
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Comments
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {loggedInUserData?.data?.role === '2' &&
                            loggedInUserData?.data?.subRole === '3'
                              ? Array.isArray(currentTask?.taskTracker) &&
                                currentTask?.taskTracker.map((taskHistory) => {
                                  return (
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                      <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                      >
                                        {taskHistory?.whereTowhere?.to}
                                      </th>
                                      <td class="px-6 py-4">
                                        {moment(taskHistory?.date).format('LT')}
                                      </td>
                                      <td class="px-6 py-4">
                                        {moment(taskHistory?.date).format('LL')}
                                      </td>
                                      <td class="px-6 py-4">
                                        {taskHistory?.name}
                                      </td>
                                    </tr>
                                  );
                                })
                              : loggedInUserData?.data?.role === '2' &&
                                loggedInUserData?.data?.subRole === '4'
                              ? Array.isArray(
                                  currentTask?.assignedCapacity[0]?.taskTracker
                                ) &&
                                currentTask?.assignedCapacity[0]?.taskTracker.map(
                                  (taskHistory) => {
                                    return (
                                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                          scope="row"
                                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                          {taskHistory?.whereTowhere?.to}
                                        </th>
                                        <td class="px-6 py-4">
                                          {moment(taskHistory?.date).format(
                                            'LT'
                                          )}
                                        </td>
                                        <td class="px-6 py-4">
                                          {moment(taskHistory?.date).format(
                                            'LL'
                                          )}
                                        </td>
                                        <td class="px-6 py-4">
                                          {taskHistory?.name}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )
                              : loggedInUserData?.data?.role === '2' &&
                                loggedInUserData?.data?.subRole === '5'
                              ? Array.isArray(currentTask?.taskTracker) &&
                                currentTask?.taskTracker.map((taskHistory) => {
                                  return (
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                      <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                      >
                                        {taskHistory?.whereTowhere?.to}
                                      </th>
                                      <td class="px-6 py-4">
                                        {moment(taskHistory?.date).format('LT')}
                                      </td>
                                      <td class="px-6 py-4">
                                        {moment(taskHistory?.date).format('LL')}
                                      </td>
                                      <td class="px-6 py-4">
                                        {taskHistory?.name}
                                      </td>
                                    </tr>
                                  );
                                })
                              : 'Invalid User'}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                  {/*        <!-- Modal actions --> */}
                </div>
              </div>,
              document.body
            )
          : null}
      </>
    );
  }
);
