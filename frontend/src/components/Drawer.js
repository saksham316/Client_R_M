import React from 'react';
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export function DrawerPlacement() {
  //   accountNumber
  // :
  // 15616512225
  // avatar
  // :
  // "https://storage.googleapis.com/project-crm/Avatars/54892751111 december 2024.PNG"
  // bank
  // :
  // "sbi"
  // createdAt
  // :
  // "2024-01-29T09:01:27.948Z"
  // ctc
  // :
  // 1000000
  // department
  // :
  // "php"
  // disabled
  // :
  // false
  // dob
  // :
  // "2024-01-29T08:59:02.183Z"
  // doj
  // :
  // "2024-01-29T08:59:02.183Z"
  // email
  // :
  // "manoj@pearlorganisation.com"
  // employeeCode
  // :
  // "12"
  // gender
  // :
  // "male"
  // ifsc
  // :
  // "SBIN0001114"
  // isAllDocumentsVerified
  // :
  // false
  // name
  // :
  // "Notme"
  // number
  // :
  // 9389753824
  // permanentAddress
  // :
  // "dsadsadas"
  // permissions
  // :
  // ['65b7657bb520c2d05ba8df70']
  // phone
  // :
  // 9389753824
  // processManager
  // :
  // "ajay"
  // reportingManager
  // :
  // "arif"
  // role
  // :
  // "65b767e2b520c2d05ba8dfa7"
  // updatedAt
  // :
  // "2024-01-30T10:56:56.303Z"
  // userName
  // :
  // "hams316"
  // __v
  // :
  // 0
  // _id
  // :
  // "65b78cf45da1b60cd765f30e"
  const [openRight, setOpenRight] = React.useState(false);

  const { isLoading, loggedInUserData } = useSelector((state) => state.auth);
  console.log('profile::', loggedInUserData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: loggedInUserData?.email,
      department: loggedInUserData?.department?.toString().toUpperCase(),
      processManager: loggedInUserData?.processManager
        ?.toString()
        .toUpperCase(),
      reportingManager: loggedInUserData?.reportingManager
        ?.toString()
        .toUpperCase(),
    },
  });

  const profileUpdate = (data) => console.log(data);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  return (
    <React.Fragment>
      <div className="flex flex-wrap justify-center mt-2">
        <Button onClick={openDrawerRight} className="bg-black">
          View More
        </Button>
      </div>

      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
        size={500}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Profile Info
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="profile_form">
          <form onSubmit={handleSubmit(profileUpdate)} className="mt-8">
            <div className="space-y-5">
              <div>
                <div className="flex flex-col gap-2 text-start">
                  <label htmlFor="">Your Email</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2 text-start">
                  <label htmlFor="">Department</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Department"
                    {...register('department')}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2 text-start">
                  <label htmlFor="">Process Manager</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Process Manager"
                    {...register('processManager')}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2 text-start">
                  <label htmlFor="">Reporting Manager</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Reporting Manager"
                    {...register('reportingManager')}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2 text-start">
                  <label htmlFor="">Department</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Department"
                    {...register('department')}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2 text-start">
                  <label htmlFor="">Department</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Department"
                    {...register('department')}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2 text-start">
                  <label htmlFor="">Department</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Department"
                    {...register('department')}
                  ></input>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get Started
                  {/* Get started <ArrowRight className="ml-2" size={16} /> */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
