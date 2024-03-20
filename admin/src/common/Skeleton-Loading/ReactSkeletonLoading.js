import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// -------------------------------------------------------------------------------

const ReactSkeletonLoading = ({ thCount }) => {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((item) => {
          return (
            <tr>
              {Array(thCount)
                .fill(0)
                .map((item) => {
                  return (
                    <td style={{ padding: '8px' }}>
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
