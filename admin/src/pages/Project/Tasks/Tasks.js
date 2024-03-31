// -----------------------------------------------Imports---------------------------------------------------
import React, { memo, useCallback, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import TaskTrackerFieldTag from '../../../components/Tasks/TaskTrackerFieldTag/TaskTrackerFieldTag';
import WorkFlow from '../../../components/Tasks/WorkFlow/WorkFlow';
import Submissions from '../../../components/Tasks/Submissions/Submissions';
import Hold from '../../../components/Tasks/Hold/Hold';
import Communications from '../../../components/Tasks/Communications/Communications';
import UnderQA from '../../../components/Tasks/UnderQA/UnderQA';

// -------------------------------------------------------------------------------------------------------------

const Tasks = () => {
  // ------------------------------------------------States-----------------------------------------------------

  const status1Options = [
    { value: 'SUBMITTED_TO_CASE_MANAGER', label: 'Submitted to Case Manager' },
    { value: 'SUBMITTED_WITH_SIGNATURE', label: 'Submitted with Signature' },
    { value: 'REOPENED', label: 'Reopened' },
  ];

  const taskTrackerFields = [
    { title: 'Workflow', comp: <WorkFlow /> },
    { title: 'Submissions', comp: <Submissions /> },
    { title: 'Hold', comp: <Hold /> },
    { title: 'Under QA', comp: <UnderQA /> },
    { title: 'Communications', comp: <Communications /> },
    { title: 'Others', comp: 'others' },
  ];

  const taskTrackerComp = {
    workflow: <WorkFlow status1Options={status1Options} />,
    submissions: <Submissions status1Options={status1Options} />,
    hold: <Hold status1Options={status1Options} />,
    under_qa: <UnderQA status1Options={status1Options} />,
    communications: <Communications />,
    others: 'others',
  };

  const [index, setIndex] = useState(0);

  // ----------------------------------------------------------------------------------------------------------
  // ------------------------------------------------Hooks-----------------------------------------------------
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
