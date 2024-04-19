// --------------------------------------------------Imports--------------------------------------------
import React, { memo } from 'react';
// -----------------------------------------------------------------------------------------------------

const TaskTrackerFieldTag = ({ title, trackerFieldSetter, selectedField }) => {
  // --------------------------------------------------States--------------------------------------------

  // -------------------------------------------------------------------------------------------------------
  return (
    <div
      className={`border border-black m-2 rounded-3xl p-3 text-center min-w-[80px] text-[10px] sm:text-[15px] md:text-2sm font-bold line-clamp-1 ${
        selectedField.toString() ==
        title.toString().toLowerCase().trim().replaceAll(' ', '_')
          ? 'bg-blue-950 text-white'
          : 'bg-white text-black'
      } cursor-pointer`}
      onClick={() => {
        trackerFieldSetter(title);
      }}
    >
      {title}
    </div>
  );
};

export default memo(TaskTrackerFieldTag);
