// ---------------------------------------------Imports--------------------------------------------------
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateCoderTask } from '../../../../features/actions/project/task/coder/coderActions';
import toast from 'react-hot-toast';
import { resetCoderTaskStatus } from '../../../../features/slices/project/task/coder/coderSlice';
import { useSearchParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { updateQATask } from '../../../../features/actions/project/task/qa/qaActions';
import { resetQATaskStatus } from '../../../../features/slices/project/task/qa/qaSlice';
// -------------------------------------------------------------------------------------------------------
export function QACommunicationModal({
  showCommunicationModal,
  closeCommunicationModal,
  currentTask,
  fetchCoderTasks,
  fetchQATasks,
}) {
  // -------------------------------------------States---------------------------------------------------
  const commonStyles = {
    border: '1px solid black',
    width: '80%',
    borderRadius: '10px',
    resize: 'none',
  };

  const [isShowing, setIsShowing] = useState(false);

  // -------------------------------------------------------------------------------------------------------
  // -------------------------------------------Hooks---------------------------------------------------
  const wrapperRef = useRef(null);

  const closeModalRef = useRef();

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { isCoderTaskUpdated } = useSelector((state) => state?.coderTask);

  const { isQATaskUpdated } = useSelector((state) => state?.qaTask);

  const { role, subRole } = useAuth();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // -------------------------------------------------------------------------------------------------------
  // -------------------------------------------Functions---------------------------------------------------

  // communicationDetailsHandler -- handler to submit the communication details form
  const communicationDetailsHandler = (data) => {
    if (currentTask?._id) {
      const { title, description } = data;
      let payload = {
        communicationComments: { title, description },
        communicationDetailsFlag: true,
      };

      dispatch(
        role === '2' && subRole === '5'
          ? updateQATask({
              payload,
              coderTaskId: currentTask?._id,
            })
          : updateCoderTask({
              payload,
              coderTaskId: currentTask?._id,
            })
      );
    } else {
      toast.error('Task Id is required');
    }
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
    if (isCoderTaskUpdated) {
      let query = (() => {
        let field = searchParams.get('trackerField');
        return `trackerField=${field}`;
      })();
      fetchCoderTasks(query);
      dispatch(resetCoderTaskStatus(false));
      reset();
      closeModalRef?.current?.click();
    }

    if (isQATaskUpdated) {
      let query = (() => {
        let field = searchParams.get('trackerField');
        return `trackerField=${field}`;
      })();
      fetchQATasks(query);
      dispatch(resetQATaskStatus(false));
      reset();
      closeModalRef?.current?.click();
    }
  }, [isCoderTaskUpdated, isQATaskUpdated]);

  useEffect(() => {
    if (showCommunicationModal) {
      setIsShowing(!isShowing);
    }
  }, [showCommunicationModal]);
  // -------------------------------------------------------------------------------------------------------
  const recordElements = [
    {
      ele: (
        <input
          className="p-2"
          style={{ ...commonStyles }}
          {...register('title')}
        />
      ),
      title: 'Title',
    },
    {
      ele: (
        <textarea
          className="p-2"
          rows={3}
          cols={3}
          style={{ ...commonStyles }}
          {...register('description')}
        />
      ),
      title: 'Description',
    },
  ];

  const recordButtons = [
    {
      title: 'Submit',
      handler: () => {},
    },
    {
      title: 'Cancel',
      handler: () => {
        closeModalRef.current.click();
      },
    },
  ];
  // -------------------------------------------------------------------------------------------------------

  return (
    <>
      {isShowing && typeof document !== 'undefined'
        ? ReactDOM.createPortal(
            <div
              className="absolute top-0 left-0 z-99 flex pt-2 pb-2 w-full h-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm overflow-y-auto"
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
                    Communication Details
                  </h3>
                  <button
                    ref={closeModalRef}
                    onClick={() => {
                      setIsShowing(false);
                      closeCommunicationModal();
                    }}
                    className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-md font-medium tracking-wide  text-black transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                    aria-label="close dialog"
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
                <form
                  className="contentForm"
                  onSubmit={handleSubmit(communicationDetailsHandler)}
                >
                  <div className="contentElements flex flex-col items-center">
                    {recordElements.map((rec) => {
                      return (
                        <div className="w-[80%] flex flex-col items-center p-2">
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
                  <div className="recordButtons flex gap-3 justify-center mt-2">
                    {recordButtons.map((btn, idx) => {
                      return (
                        <button
                          className="p-2 sm:p-4 rounded-full bg-blue-950 font-bold text-white text-[13px] sm:text-sm md:text-lg"
                          type={`${idx === 0 ? 'submit' : 'button'}`}
                          onClick={btn.handler}
                        >
                          {btn.title}
                        </button>
                      );
                    })}
                  </div>
                </form>
                {/*        <!-- Modal actions --> */}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
