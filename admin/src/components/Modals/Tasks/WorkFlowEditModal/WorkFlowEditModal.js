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
import useAuth from '../../../../hooks/useAuth';
import {
  getAllQATasks,
  updateQATask,
} from '../../../../features/actions/project/task/qa/qaActions';
import { resetQATaskStatus } from '../../../../features/slices/project/task/qa/qaSlice';
// -------------------------------------------------------------------------------------------------------
export const WorkFlowEditModal = memo(
  ({
    showEditModal,
    closeEditModal,
    btnDisabled,
    disabledTaskSubData,
    coderTaskId,
    currentTask,
    holdHandler,
    submissionHandler,
    underQaHandler,
  }) => {
    // -------------------------------------------States---------------------------------------------------
    const commonStyles = {
      border: '1px solid black',
      width: '80%',
      borderRadius: '10px',
      resize: 'none',
      padding: '5px',
      color: 'blue',
    };

    const [isShowing, setIsShowing] = useState(false);

    const [activeCurrentTask, setActiveCurrentTask] = useState({});
    const [defaultValuesForForm, setDefaultValuesForForm] = useState({});
    // -------------------------------------------------------------------------------------------------------
    // -------------------------------------------Hooks---------------------------------------------------
    const wrapperRef = useRef(null);
    const { role, subRole } = useAuth();

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

    const { isQATaskLoading, isQATaskUpdated } = useSelector(
      (state) => state?.qaTask
    );

    // -------------------------------------------------------------------------------------------------------
    // -------------------------------------------Functions---------------------------------------------------

    // submitHandler -- handler to submit the record data
    const submitHandler = (data) => {
      try {
      } catch (error) {
        console.error(error.message);
      }
    };

    //taskSubDataSavingHandler -- handler to save the task sub data
    const taskSubDataSavingHandler = (data) => {
      try {
        if (coderTaskId) {
          const { coding, oasis, qa, poc } = data;
          const taskSubData =
            role === '2' && subRole === '5'
              ? { coding, oasis, qa, poc }
              : { coding, oasis, poc };
          role === '2' && subRole === '5'
            ? dispatch(
                updateQATask({
                  payload: { taskSubData },
                  coderTaskId,
                })
              )
            : dispatch(
                updateCoderTask({ payload: { taskSubData }, coderTaskId })
              );
        } else {
          toast.error('Task Id not found!');
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    // fetchCoderTasks
    const fetchCoderTasks = (query) => {
      dispatch(getAllCoderTasks(query));
    };

    // fetchQATasks
    const fetchQATasks = (query) => {
      dispatch(getAllQATasks(query));
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
      if (showEditModal) {
        setIsShowing(!isShowing);
      }
    }, [showEditModal]);

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

      if (isQATaskUpdated) {
        let query = (() => {
          let field = searchParams.get('trackerField');
          return `trackerField=${field}`;
        })();
        fetchQATasks(query);
        dispatch(resetQATaskStatus(false));
        closeModalRef?.current?.click();
      }
    }, [isCoderTaskUpdated, isQATaskUpdated]);

    useEffect(() => {
      if (currentTask) {
        reset();
        setActiveCurrentTask(currentTask);
      }
    }, [currentTask]);

    // -------------------------------------------------------------------------------------------------------
    const recordElements = [
      {
        ele: (
          <textarea
            {...register('coding')}
            rows={3}
            cols={3}
            style={{ ...commonStyles }}
            disabled={
              disabledTaskSubData ? disabledTaskSubData === 'CODING' : false
            }
            className={`${
              disabledTaskSubData
                ? disabledTaskSubData === 'CODING'
                  ? 'opacity-25 cursor-not-allowed'
                  : 'cursor-pointer'
                : 'cursor-pointer'
            }`}
            defaultValue={activeCurrentTask?.taskSubData?.coding || ''}
          />
        ),
        title: 'Coding',
      },
      {
        ele: (
          <textarea
            {...register('oasis')}
            rows={3}
            cols={3}
            style={{ ...commonStyles }}
            disabled={
              disabledTaskSubData ? disabledTaskSubData === 'OASIS' : false
            }
            className={`${
              disabledTaskSubData
                ? disabledTaskSubData === 'OASIS'
                  ? 'opacity-25 cursor-not-allowed'
                  : 'cursor-pointer'
                : 'cursor-pointer'
            }`}
            defaultValue={activeCurrentTask?.taskSubData?.oasis || ''}
          />
        ),
        title: 'Oasis',
      },
      {
        ele: (
          <textarea
            {...register('qa')}
            rows={3}
            cols={3}
            style={{ ...commonStyles }}
            disabled={
              disabledTaskSubData ? disabledTaskSubData === 'QA' : false
            }
            className={`${
              disabledTaskSubData
                ? disabledTaskSubData === 'QA'
                  ? 'opacity-25 cursor-not-allowed'
                  : 'cursor-pointer'
                : 'cursor-pointer'
            }`}
            defaultValue={activeCurrentTask?.taskSubData?.qa || ''}
          />
        ),
        title: 'QA',
      },
      {
        ele: (
          <textarea
            {...register('poc')}
            rows={3}
            cols={3}
            style={{ ...commonStyles }}
            disabled={
              disabledTaskSubData ? disabledTaskSubData === 'POC' : false
            }
            className={`${
              disabledTaskSubData
                ? disabledTaskSubData === 'POC'
                  ? 'opacity-25 cursor-not-allowed'
                  : 'cursor-pointer'
                : 'cursor-pointer'
            }`}
            defaultValue={activeCurrentTask?.taskSubData?.poc || ''}
          />
        ),
        title: 'POC',
      },
    ];

    const recordButtons = [
      {
        title: 'Save',
        handler: taskSubDataSavingHandler,
      },
      {
        title: 'Hold',
        handler: () => {
          holdHandler(coderTaskId);
        },
      },
      role === '2' &&
        subRole != '5' && {
          title: 'Under QA',
          handler: () => {
            underQaHandler(coderTaskId);
          },
        },
      role === '2' &&
        subRole != '5' && {
          title: 'Submit',
          handler: () => {
            submissionHandler(coderTaskId);
          },
        },
    ];

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
                  className="flex  w-11/12 max-w-xl flex-col gap-6  rounded-lg bg-white border-2 p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                  id="modal"
                  role="document"
                >
                  {/*        <!-- Modal header --> */}
                  <header id="header-2a" className="flex items-center gap-2">
                    <h3 className="flex-1 text-xl font-medium text-slate-700">
                      Record Details
                    </h3>
                    <button
                      onClick={() => {
                        setIsShowing(false);
                        closeEditModal();
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
                  {isCoderTaskLoading || isQATaskLoading ? (
                    <FormLoader />
                  ) : (
                    <form
                      className="contentForm"
                      onSubmit={handleSubmit(taskSubDataSavingHandler)}
                    >
                      <div className="contentElements flex flex-col items-center">
                        {recordElements.map((rec, index) => {
                          return (
                            <div
                              className="w-[80%] flex flex-col items-center p-2"
                              key={index}
                            >
                              <div className="w-[80%] flex flex-start">
                                <h5 className="font-bold text-black text-sm sm:text-sm md:text-lg">
                                  {rec.title}
                                </h5>
                              </div>
                              {rec.ele}
                            </div>
                          );
                        })}
                      </div>
                      {!btnDisabled && (
                        <div className="recordButtons flex gap-3 justify-center mt-2">
                          {recordButtons.map((btn, index) => {
                            return (
                              btn && (
                                <button
                                  className="p-2 sm:p-4 rounded-full bg-blue-950 font-bold text-white text-[13px] sm:text-sm md:text-lg"
                                  key={index}
                                  type={`${index === 0 ? 'submit' : 'button'}`}
                                  onClick={index != 0 ? btn.handler : null}
                                >
                                  {btn.title}
                                </button>
                              )
                            );
                          })}
                        </div>
                      )}
                    </form>
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
