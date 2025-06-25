import React, { use } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext) 
    if (loading) {
        return (
            <div className='flex justify-center  my-36'>

                <span  className="loading loading-bars loading-xl"></span>
            </div>
        )
    }
    
    if (user && user.email) {
        return children
    }

    else {
      return  <Navigate to="/login"></Navigate>
    }
   
};

export default PrivateRoute;