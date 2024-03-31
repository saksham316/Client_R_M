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
// --------------------------------------------------------------------------------------------------------

const KinserSheet = () => {
  // -------------------------------------------------States-------------------------------------------------
  const sheet = [{ title: 'Users Sheet' }, { title: 'Notes Sheet' }];

  const [sheetData, setSheetData] = useState({});

  const allowedExtensions = ['csv', 'xlsx'];

  // --------------------------------------------------------------------------------------------------------
  // --------------------------------------------------Hooks-------------------------------------------------
  const inputFileRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isCoderTaskLoading, isCoderTaskCreated } = useSelector(
    (state) => state?.coderTask
  );
  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------Functions-----------------------------------------------
  // sheetHandler -- handler to handle the sheet data
  const sheetHandler = (e) => {
    try {
      if (allowedExtensions.includes(e.target.files[0].type.split('/')[1])) {
        papaParser.parse(e.target.files[0], {
          complete: (result) => {
            let arr = [...result.data];
            if (arr[0].length === arr[1].length) {
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

              setSheetData(obj);
            } else {
              toast.error('Data Fields Length Does Not Match');
            }
          },
        });
      } else {
        toast.error('Invalid File');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // sheetUploadHandler -- handler to call the create task api
  const sheetUploadHandler = () => {
    try {
      if (sheetData && Object.keys(sheetData).length > 0) {
        dispatch(createCoderTask(sheetData));
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
      setSheetData({});
    }
  }, [isCoderTaskCreated]);

  // --------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------

  return (
    <div className="kinserSheetContainer flex flex-col w-[100%]  gap-8">
      {sheet.map((item, index) => (
        <div
          key={index}
          className="kinserSheetWrapper w-[100%]  flex flex-col items-center md:flex md:flex-row p-6"
        >
          <div className="uploadFile  w-[30%] p-3 flex flex-col items-center">
            <div
              className="uploadBox border border-dotted border-grey-500 w-[100px] md:w-[120px] flex flex-col justify-center items-center p-7 cursor-pointer"
              onClick={() => {
                inputFileRef.current.click();
              }}
            >
              <FaPlus size={25} />
              <p className="text-center pt-3 text-sm md:text-lg font-bold">
                Upload
              </p>
              {sheetData && Object.keys(sheetData).length > 0 && (
                <h6 className="text-center pt-1 text-[15px] font-bold text-red-500">
                  One File Selected
                </h6>
              )}
              <input
                type="file"
                className="hidden"
                ref={inputFileRef}
                accept=".csv,.xlsx"
                onChange={sheetHandler}
                disabled={isCoderTaskLoading ? true : false}
              />
            </div>
            <p className="font-bold text-black mt-1 text-center">
              {item.title}
            </p>
          </div>
          <div className="actionButtons flex w-[100%] md:w-[50%] gap-8 justify-center items-center">
            {isCoderTaskLoading ? (
              <button className="kinserSubmitBtn bg-blue-600 h-[50px] w-[70px] md:h-[50px] md:w-[100px] p-2 text-white font-bold text-md md:text-xl rounded-md">
                <ProgressBarButtonLoader />
              </button>
            ) : (
              <button
                className="bg-blue-900 h-[50px] w-[70px] md:h-[50px] md:w-[100px] p-2 text-white font-bold text-md md:text-xl rounded-md"
                onClick={sheetUploadHandler}
              >
                Submit
              </button>
            )}
            <button
              className={`${
                isCoderTaskLoading ? 'bg-red-400' : 'bg-red-500'
              } h-[50px] w-[70px] md:h-[50px] md:w-[100px] p-2 text-white font-bold text-md md:text-xl rounded-md`}
              disabled={isCoderTaskLoading ? true : false}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KinserSheet;
