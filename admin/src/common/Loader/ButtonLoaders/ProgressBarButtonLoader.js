// ---------------------------------------------Imports------------------------------------------------
import React from 'react';
import { ProgressBar } from 'react-loader-spinner';
// -----------------------------------------------------------------------------------------------------

export const ProgressBarButtonLoader = () => {
  return (
    <div className="w-[100%] h-[100%] ">
      <ProgressBar
        visible={true}
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        className=""
      />
    </div>
  );
};
