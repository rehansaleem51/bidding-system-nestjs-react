import React from 'react'
import ClockLoader from "react-spinners/ClockLoader";
import spinnerStore from '../../store/spinnerStore'


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#36d7b7",
  };
export const spinner = () => {
    const isLoading = spinnerStore((state) => state.isLoading);
  return (
        <>
            {isLoading && <div className='loaderContainer'>
                <ClockLoader color="#36d7b7"
                    loading={isLoading}
                    cssOverride={override}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                </div>
            }
        </>
        
  )
}

export default spinner;