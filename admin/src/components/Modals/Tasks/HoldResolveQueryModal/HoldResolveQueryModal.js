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

// -------------------------------------------------------------------------------------------------------
export const HoldResolveQueryModal = memo(
  ({ closeResolveQueryModal, showResolveQueryModal, resolveQueryHandler }) => {
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

    // -------------------------------------------------------------------------------------------------------
    // -------------------------------------------Functions---------------------------------------------------

    // submitHandler -- handler to submit the record data
    const submitHandler = (data) => {
      try {
      } catch (error) {
        console.error(error.message);
      }
    };

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
      if (showResolveQueryModal) {
        setIsShowing(!isShowing);
      }
    }, [showResolveQueryModal]);

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
    const recordElements = [
      {
        ele: (
          <Select
            options={resolveQuerySelectOptions}
            style={{ ...commonStyles }}
            onChange={(e) => {
              setTrackerField(e.value);
            }}
          />
        ),
        title: 'Move To',
      },
    ];

    const recordButtons = [
      {
        title: 'Confirm Move',
        handler:()=>{}
      },
      {
        title: 'Cancel',
        handler:()=>{closeModalRef.current.click()}
      },
    ];

    // -------------------------------------------------------------------------------------------------------

    return (
      <>
        {isShowing && typeof document !== 'undefined'
          ? ReactDOM.createPortal(
              <div
                className="absolute top-0 left-0 z-98 flex pt-2 pb-2 w-full h-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm overflow-y-auto"
                aria-labelledby="header-2a content-2a"
                aria-modal="true"
                tabindex="-1"
                role="dialog"
              >
                {/*    <!-- Modal --> */}
                <div
                  className="flex  w-[60%] max-w-xl flex-col gap-6  rounded-lg bg-white border-2 p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                  id="modal"
                  role="document"
                >
                  {/*        <!-- Modal header --> */}
                  <header id="header-2a" className="flex items-center gap-2">
                    <h3 className="flex-1 md:text-xl sm:text-md text-sm font-medium text-slate-700 ">
                      Resolve Query
                    </h3>
                    <button
                      onClick={() => {
                        setIsShowing(false);
                        closeResolveQueryModal();
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
                    <form
                      className="contentForm"
                      onSubmit={handleSubmit(() => {
                        resolveQueryHandler(trackerField);
                      })}
                    >
                      <div className="contentElements flex flex-col items-center">
                        {recordElements.map((rec, index) => {
                          return (
                            <div
                              className="w-[80%] flex flex-col items-center p-2"
                              key={index}
                            >
                              <div className="w-[80%] sm:w-[60%] flex flex-start">
                                <h5 className="font-bold text-black text-sm sm:text-sm md:text-lg">
                                  {rec.title}
                                </h5>
                              </div>
                              <div className="w-[80%] sm:w-[60%] mt-3">
                                {rec.ele}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="recordButtons flex gap-3 justify-center mt-2">
                        {recordButtons.map((btn, index) => {
                          return (
                            <button
                              className="p-2 sm:p-3 rounded-full bg-blue-950 font-bold text-white  md:text-md text-[11px] sm:text-sm"
                              key={index}
                              type={`${index === 0 ? 'submit' : 'button'}`}
                              onClick={index != 0 ? btn.handler : null}
                            >
                              {btn.title}
                            </button>
                          );
                        })}
                      </div>
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
