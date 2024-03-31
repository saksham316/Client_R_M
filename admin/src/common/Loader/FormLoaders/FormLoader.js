// ----------------------------------------------Imports---------------------------------------------------
import { ThreeCircles } from 'react-loader-spinner';
// --------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------
export const FormLoader = () => {
  return (
    <div className="h-[50vh] flex justify-center items-center">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="blue"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
