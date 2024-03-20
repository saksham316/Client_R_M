import React, { useState } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import TicketModal from './TicketModal';



const IT_Ticket = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 ">
            <div>
              <FaTicketAlt />
            </div>
            <div>
              <h1 className="font-bold">Ticket</h1>
            </div>
          </div>

          <div>
            <div>
              <button
                type="button"
                class="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setModal(!modal);
                }}
              >
                <div className="flex">
                  <div className="p-0.5">
                    <IoIosCreate />
                  </div>
                  <div>Raise A Ticket</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  S.No
                </th>
                <th scope="col" class="px-6 py-3">
                  Ticket Subject
                </th>
                <th scope="col" class="px-6 py-3">
                  Raised By
                </th>
                <th scope="col" class="px-6 py-3">
                  Agent
                </th>
                <th scope="col" class="px-6 py-3">
                  Request On
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <td class="px-6 py-4">
                  Tea/ Coffee/ Snacks Availability Issue
                </td>
                <td class="px-6 py-4">Jholu singh</td>
                <td class="px-6 py-4">cheni Singh</td>
                <td class="px-6 py-4">12-Dec-23, 11:20:57</td>
                <td class="px-6 py-4">
                  <button
                    type="button"
                    class="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-
                  dark:bg-blue-500 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-600"
                  >
                    Closed
                  </button>
                </td>
                <td class="px-6 py-4">
                  <div className="flex">
                    <div>
                      <FaRegEye size={25} />
                    </div>
                    <div>
                      <MdDelete size={25} />
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <td class="px-6 py-4">
                  Tea/ Coffee/ Snacks Availability Issue
                </td>
                <td class="px-6 py-4">Jholu singh</td>
                <td class="px-6 py-4">cheni Singh</td>
                <td class="px-6 py-4">12-Dec-23, 11:20:57</td>
                <td class="px-6 py-4">
                  <button
                    type="button"
                    class="text-white bg-red-500 hover:bg-red-500 focus:ring-4
                 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-
                  dark:bg-red-500 dark:hover:bg-red-500 focus:outline-none dark:focus:ring-red-600"
                  >
                    Active
                  </button>
                </td>
                <td class="px-6 py-4">
                  <div className="flex">
                    <div>
                      <FaRegEye size={25} />
                    </div>
                    <div>
                      <MdDelete size={25} />
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <td class="px-6 py-4">
                  Tea/ Coffee/ Snacks Availability Issue
                </td>
                <td class="px-6 py-4">Jholu singh</td>
                <td class="px-6 py-4">cheni Singh</td>
                <td class="px-6 py-4">12-Dec-23, 11:20:57</td>
                <td class="px-6 py-4">
                  <button
                    type="button"
                    class="text-white bg-green-500 hover:bg-green-500 focus:ring-4
                 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-
                  dark:bg-green-500 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-600"
                  >
                    Reslove
                  </button>
                </td>
                <td class="px-6 py-4">
                  <div className="flex">
                    <div>
                      <FaRegEye size={25} />
                    </div>
                    <div>
                      <MdDelete size={25} />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {modal?<TicketModal/>:null}
    </>
  );
};

export default IT_Ticket;
