// -----------------------------------------------Imports---------------------------------------------------
import React, { memo, useCallback, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import TaskTrackerFieldTag from '../../../components/Tasks/Coder/TaskTrackerFieldTag/TaskTrackerFieldTag';
import WorkFlow from '../../../components/Tasks/Coder/WorkFlow/WorkFlow';
import Submissions from '../../../components/Tasks/Coder/Submissions/Submissions';
import Hold from '../../../components/Tasks/Coder/Hold/Hold';
import Communications from '../../../components/Tasks/Coder/Communications/Communications';
import UnderQA from '../../../components/Tasks/Coder/UnderQA/UnderQA';
import Approvals from '../../../components/Tasks/NoteTaker/Approvals/Approvals';
import Pending from '../../../components/Tasks/NoteTaker/Pending/Pending';
import Returned from '../../../components/Tasks/NoteTaker/Returned/Returned';
import PleaseQA from '../../../components/Tasks/NoteTaker/PleaseQA/PleaseQA';

// -------------------------------------------------------------------------------------------------------------

const Tasks = () => {
  // -----------------------------------------------------------------------------------------------------------
  const { loggedInUserData } = useSelector((state) => state?.authentication);
  // -----------------------------------------------------------------------------------------------------------

  // ------------------------------------------------States-----------------------------------------------------

  const role = loggedInUserData?.data?.role;
  const subRole = loggedInUserData?.data?.subRole;

  const status1Options = [
    { value: 'SUBMITTED_TO_CASE_MANAGER', label: 'Submitted to Case Manager' },
    { value: 'SUBMITTED_WITH_SIGNATURE', label: 'Submitted with Signature' },
    { value: 'REOPENED', label: 'Reopened' },
  ];

  const taskTrackerFields =
    loggedInUserData?.data?.role === '2' &&
    loggedInUserData?.data?.subRole === '3'
      ? [
          { title: 'Workflow' },
          { title: 'Submissions' },
          { title: 'Hold' },
          { title: 'Under QA' },
          { title: 'Communications' },
          { title: 'Others' },
        ]
      : loggedInUserData?.data?.subRole === '4'
      ? [
          { title: 'Workflow' },
          { title: 'Approvals' },
          { title: 'Returned' },
          { title: 'Pending' },
          { title: 'Please QA' },
          { title: 'Communications' },
        ]
      : loggedInUserData?.data?.subRole === '5'
      ? [
          { title: 'Workflow' },
          { title: 'Submissions' },
          { title: 'Hold' },
          { title: 'Communications' },
          { title: 'Others' },
        ]
      : [];

  const taskTrackerComp =
    role === '2' && subRole === '3'
      ? {
          workflow: <WorkFlow status1Options={status1Options} />,
          submissions: <Submissions status1Options={status1Options} />,
          hold: <Hold status1Options={status1Options} />,
          under_qa: <UnderQA status1Options={status1Options} />,
          communications: <Communications />,
          others: 'others',
        }
      : subRole === '4'
      ? {
          workflow: <WorkFlow status1Options={status1Options} />,
          approvals: <Approvals status1Options={status1Options} />,
          returned: <Returned status1Options={status1Options} />,
          pending: <Pending status1Options={status1Options} />,
          please_qa: <PleaseQA status1Options={status1Options} />,
          communications: 'comm',
        }
      : subRole === '5'
      ? {
          workflow: <WorkFlow status1Options={status1Options} />,
          submissions: <Submissions status1Options={status1Options} />,
          hold: <Hold status1Options={status1Options} />,
          communications: <Communications />,
          others: 'others',
        }
      : {};

  // ----------------------------------------------------------------------------------------------------------
  // ------------------------------------------------Hooks-----------------------------------------------------
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedField, setSelectedField] = useState('');

  // -----------------------------------------------------------------------------------------------------------

  // ----------------------------------------------Functions----------------------------------------------------

  //trackerFieldSetter -- function to set the tracker field in the query params
  const trackerFieldSetter = (field) => {
    const fld = field.toString().toLowerCase().trim().replaceAll(' ', '_');
    setSearchParams({ trackerField: fld });
  };

  // -----------------------------------------------------------------------------------------------------------

  // ------------------------------------------------useEffects-------------------------------------------------

  useEffect(() => {
    if (searchParams.get('trackerField') == null) {
      setSelectedField('workflow');
    } else {
      setSelectedField(searchParams.get('trackerField'));
    }
  }, [searchParams]);

  //------------------------------------------------------------------------------------------------------------

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="mt-5 flex flex-wrap justify-start items-center w-[100%]">
          {taskTrackerFields.map((field, idx) => {
            return (
              <TaskTrackerFieldTag
                title={field.title}
                selectedField={selectedField}
                trackerFieldSetter={trackerFieldSetter}
                key={idx}
              />
            );
          })}
        </div>
        {selectedField && taskTrackerComp?.[selectedField]}
      </section>
    </>
  );
};

export default memo(Tasks);
