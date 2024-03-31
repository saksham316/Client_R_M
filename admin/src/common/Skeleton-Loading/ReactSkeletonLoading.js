import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// -------------------------------------------------------------------------------

const ReactSkeletonLoading = ({ thCount }) => {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((item, index) => {
          return (
            <tr key={index}>
              {Array(thCount)
                .fill(0)
                .map((item, index) => {
                  return (
                    <td style={{ padding: '8px' }} key={index}>
                      <Skeleton height={20} />
                    </td>
                  );
                })}
            </tr>
          );
        })}
    </>
  );
};

export default ReactSkeletonLoading;
