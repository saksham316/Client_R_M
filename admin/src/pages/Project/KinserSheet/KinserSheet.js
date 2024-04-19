// -------------------------------------------------Imports------------------------------------------------
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import papaParser from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCoderTask } from '../../../features/actions/project/task/coder/coderActions';
import { ProgressBarButtonLoader } from '../../../common/Loader/ButtonLoaders/ProgressBarButtonLoader';
import './KinserSheet.css';
import { resetCoderTaskStatus } from '../../../features/slices/project/task/coder/coderSlice';
import { adminRoles } from '../../../utils';
import { useForm } from 'react-hook-form';
import { createNoteTakerTask } from '../../../features/actions/project/task/noteTaker/noteTakerActions';
import { resetNoteTakerTaskStatus } from '../../../features/slices/project/task/noteTaker/noteTakerSlice';
// --------------------------------------------------------------------------------------------------------

const KinserSheet = () => {
  // -------------------------------------------------States-------------------------------------------------

  const [coderSheetData, setCoderSheetData] = useState({});
  const [noteTakerSheetData, setNoteTakerSheetData] = useState([]);

  const allowedExtensions = ['csv', 'xlsx'];

  // --------------------------------------------------------------------------------------------------------
  // --------------------------------------------------Hooks-------------------------------------------------

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isCoderTaskLoading, isCoderTaskCreated } = useSelector(
    (state) => state?.coderTask
  );
  const { isNoteTakerTaskLoading, isNoteTakerTaskCreated } = useSelector(
    (state) => state?.noteTakerTask
  );

  const { reset, register } = useForm();

  const { loggedInUserData } = useSelector((state) => state?.authentication);
  const inputFileRef1 = useRef();
  const inputFileRef2 = useRef();

  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------Functions-----------------------------------------------
  // coderSheetHandler -- handler to handle the sheet data
  const coderSheetHandler = (e) => {
    try {
      if (allowedExtensions.includes(e.target.files[0].type.split('/')[1])) {
        papaParser.parse(e.target.files[0], {
          complete: (result) => {
            let arr = [...result.data];
            let resultArr = [];
            for (let i = 1; i < arr.length; i++) {
              if (arr[0].length === arr[i].length) {
                let obj = {};
                let l = 0;
                let m = 1;
                let count = 0;
                while (count < arr[0].length) {
                  let key = arr[l][count].toString().toLowerCase().split(' ');

                  // Logic to create the camel case of the keys
                  for (let g = 1; g < key.length; g++) {
                    let str = key[g].split('');
                    str[0] = str[0].toString().toUpperCase();
                    key[g] = str.join('');
                  }

                  let value = arr[m][count++].toString().trim();

                  obj[key.join('').toString()] = value;
                }

                setCoderSheetData(obj);
              }
              // else {
              //   toast.error('Data Fields Length Does Not Match');
              // }
            }
          },
        });
      } else {
        setCoderSheetData({});
        toast.error('Invalid File');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // noteTakerSheetHandler -- handler to handle the note taker sheet data
  const noteTakerSheetHandler = (e) => {
    try {
      if (allowedExtensions.includes(e.target.files[0]?.type.split('/')[1])) {
        papaParser.parse(e.target.files[0], {
          complete: (result) => {
            let arr = [...result.data];

            if (arr.length > 1) {
              let resultArr = [];
              for (let i = 1; i < arr.length; i++) {
                if (arr[0].length === arr[i].length) {
                  let obj = {};
                  let count = 0;
                  while (count < arr[0].length) {
                    let key = arr[0][count]
                      .toString()
                      .trim()
                      .toLowerCase()
                      .split(' '); // ["task", "name"]

                    let str = `${key[0].toLowerCase()}`;
                    // logic to convert the key name to the camelCase
                    for (let g = 1; g < key.length; g++) {
                      let char = key[g].split('');
                      char[0] = char[0].toUpperCase();
                      let c = char.join('');
                      str += c;
                    }
                    obj[str.toString()] = arr[i][count++];
                  }
                  resultArr.push(obj);
                }
              }
              setNoteTakerSheetData(resultArr);
            } else {
              toast.error('Select a file with some data in it');
            }
          },
        });
      } else {
        setNoteTakerSheetData({});
        toast.error('Invalid File');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // coderSheetUploadHandler -- handler to call the create task api for coder
  const coderSheetUploadHandler = (e, item) => {
    try {
      if (coderSheetData && Object.keys(coderSheetData).length > 0) {
        dispatch(createCoderTask(coderSheetData));
        item?.inputFileRef?.current && (item.inputFileRef.current.value = null);
      } else {
        toast.error('Please Select a Valid File before Uploading');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // noteTakerSheetUploadHandler -- handler to call the create task api for note taker
  const noteTakerSheetUploadHandler = (e, item) => {
    try {
      if (noteTakerSheetData && noteTakerSheetData.length > 0) {
        dispatch(createNoteTakerTask(noteTakerSheetData));
        item?.inputFileRef?.current && (item.inputFileRef.current.value = null);
      } else {
        toast.error('Please Select a Valid File before Uploading');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------useEffect-----------------------------------------------

  useEffect(() => {
    if (isCoderTaskCreated) {
      toast.success('Task Created Successfully');
      dispatch(resetCoderTaskStatus(false));
      setCoderSheetData({});
    }

    if (isNoteTakerTaskCreated) {
      toast.success('Note Taker Task Created Successfully');
      dispatch(resetNoteTakerTaskStatus(false));
      setNoteTakerSheetData({});
    }
  }, [isCoderTaskCreated, isNoteTakerTaskCreated]);

  // --------------------------------------------------------------------------------------------------------
  const disableButtons = (item) => {
    return item.loading
      ? true
      : adminRoles.includes(loggedInUserData?.data?.role)
      ? false
      : loggedInUserData?.data?.role === '2' &&
        `${loggedInUserData?.data?.subRole}` === `${item?.allowedSubRole}`
      ? false
      : true;
  };

  const disableStyles = (item) => {
    return item.loading
      ? `opacity-50`
      : adminRoles.includes(loggedInUserData?.data?.role)
      ? 'cursor-pointer'
      : loggedInUserData?.data?.role === '2' &&
        `${loggedInUserData?.data?.subRole}` === `${item?.allowedSubRole}`
      ? 'cursor-pointer'
      : 'opacity-50 cursor-not-allowed';
  };

  const sheet = [
    {
      title: 'Users Sheet',
      allowedSubRole: '0',
      inputFileRef: inputFileRef1,
      sheetData: coderSheetData,
      uploadHandler: (e, item) => {
        coderSheetUploadHandler(e, item);
      },
      sheetHandler: coderSheetHandler,
      loading: isCoderTaskLoading,
    },
    {
      title: 'Notes Sheet',
      allowedSubRole: '1',
      inputFileRef: inputFileRef2,
      sheetData: noteTakerSheetData,
      uploadHandler: (e, item) => {
        noteTakerSheetUploadHandler(e, item);
      },
      sheetHandler: noteTakerSheetHandler,
      loading: isNoteTakerTaskLoading,
    },
  ];
  // --------------------------------------------------------------------------------------------------------

  return (
    <div className="kinserSheetContainer flex flex-col w-[100%]  gap-8">
      {sheet.map((item, index) => {
        return (
          <div
            key={index}
            className="kinserSheetWrapper w-[100%]  flex flex-col items-center md:flex md:flex-row p-6"
          >
            <div className="uploadFile  w-[30%] p-3 flex flex-col items-center">
              <div
                className={`uploadBox border border-dotted border-grey-500 w-[100px] md:w-[120px] flex flex-col justify-center items-center p-7 ${disableStyles(
                  item
                )}`}
                onClick={() => {
                  item?.inputFileRef?.current.click();
                }}
              >
                <FaPlus size={25} />
                <p className="text-center pt-3 text-sm md:text-lg font-bold">
                  Upload
                </p>
                {item?.sheetData &&
                  (Object.keys(item?.sheetData).length > 0 ||
                    item?.sheetData?.length > 0) && (
                    <h6 className="text-center pt-1 text-[15px] font-bold text-red-500">
                      One File Selected
                    </h6>
                  )}
                <input
                  type="file"
                  className="hidden"
                  ref={item.inputFileRef}
                  accept=".csv,.xlsx"
                  onChange={item.sheetHandler}
                  disabled={
                    item.loading
                      ? true
                      : adminRoles.includes(loggedInUserData?.data?.role)
                      ? false
                      : loggedInUserData?.data?.role === '2' &&
                        `${loggedInUserData?.data?.subRole}` ===
                          `${item?.allowedSubRole}`
                      ? false
                      : true
                  }
                />
              </div>
              <p className="font-bold text-black mt-1 text-center">
                {item.title}
              </p>
            </div>
            <div className="actionButtons flex w-[100%] md:w-[50%] gap-8 justify-center items-center">
              {item.loading ? (
                <button className="kinserSubmitBtn bg-blue-600 h-[50px] w-[70px] md:h-[50px] md:w-[100px] p-2 text-white font-bold text-md md:text-xl rounded-md">
                  <ProgressBarButtonLoader />
                </button>
              ) : (
                <button
                  className={`bg-blue-900 h-[50px] w-[70px] md:h-[50px] md:w-[100px] p-2 text-white font-bold text-md md:text-xl rounded-md ${disableStyles(
                    item
                  )}`}
                  onClick={(e) => {
                    item?.uploadHandler(e, item);
                  }}
                  disabled={disableButtons(item)}
                >
                  Submit
                </button>
              )}
              <button
                className={`${
                  item.loading ? 'bg-red-400' : 'bg-red-500'
                } h-[50px] w-[70px] md:h-[50px] md:w-[100px] p-2 text-white font-bold text-md md:text-xl rounded-md ${disableStyles(
                  item
                )}`}
                disabled={disableButtons(item)}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KinserSheet;
