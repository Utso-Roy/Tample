import React, { use } from 'react';
import { Link } from 'react-router';
import register from '../assets/register.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Register = () => {

  const {creatUser,setUser} =use(AuthContext)

  const handleRegisterBtn = (e) => {
    e.preventDefault();
    const from = e.target
    const text = from.text.value
    const email = from.email.value
    const photo = from.photo.value
    const password = from.password.value
    console.log({ text, email, photo, password })

    creatUser(email, password)
      .then(data => {
      
        console.log(data.user)
        setUser(data.user)
    })
  
      .catch(error => {
  alert(error.message)
})

    
}





    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4'>
      <div className='flex flex-col md:flex-row gap-10 items-center max-w-6xl w-full'>

        <div className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-xl bg-white dark:bg-gray-800">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Welcome Back</h1>
          <p className="text-center text-gray-600 dark:text-gray-300">Register your account</p>
          
          <form  onSubmit={handleRegisterBtn} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input 
                type="text" 
                name="text" 
                placeholder="Enter your Name" 
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#da3d00] dark:bg-gray-700 dark:text-white dark:border-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo Url</label>
              <input 
                type="text" 
                name="photo" 
                placeholder="Enter your Photo Url" 
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#da3d00] dark:bg-gray-700 dark:text-white dark:border-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your Email" 
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#da3d00] dark:bg-gray-700 dark:text-white dark:border-gray-600" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Enter your password" 
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#da3d00] dark:bg-gray-700 dark:text-white dark:border-gray-600" 
              />
            </div>
            
            <button 
              type="submit"
              className="w-full px-4 py-3 text-white bg-[#da3d00] rounded-md hover:bg-[#c03600] transition duration-200"
            >
              Sign Up
            </button>
          </form>
          
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          
         
          
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/login" className="font-medium text-[#da3d00] hover:underline">Sign in</Link>
          </p>
        </div>

        
        <div className='w-full max-w-lg'>
          <Lottie animationData={register} loop={true} />
        </div>

      </div>
    </div>
    );
};

export default Register;