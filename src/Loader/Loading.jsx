import React from 'react';
import { ScaleLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className='mx-auto text-center my-10'>
            <ScaleLoader color="#ea580c" />
        </div>
    );
};

export default Loading;
