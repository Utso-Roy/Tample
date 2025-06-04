import React, { use } from 'react';
import { Link } from 'react-router'; 
import animation from '../assets/Animation - 1748973901908.json';
import Lottie from 'lottie-react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Login = () => {
  const { setUser,loginUser} = use(AuthContext)

  const handleLoginBtn = (e) => {
    e.preventDefault()
    const from = e.target 
    const email = from.email.value
    const password = from.password.value
    
    console.log({ email, password })
    
    loginUser(email, password)
      .then(result => 
        setUser(result.user)
        
    )
      .catch(error => {
      alert(error.message)
    })

  }



  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4'>
      <div className='flex flex-col md:flex-row gap-10 items-center max-w-6xl w-full'>

        <div className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-xl bg-white dark:bg-gray-800">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Welcome Back</h1>
          <p className="text-center text-gray-600 dark:text-gray-300">Sign in your account</p>
          
          <form onSubmit={handleLoginBtn}  className="space-y-6">
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
              <a href="#" className="text-xs text-[#da3d00] hover:underline">Forgot password?</a>
            </div>
            
            <button 
              type="submit"
              className="w-full px-4 py-3 text-white bg-[#da3d00] rounded-md hover:bg-[#c03600] transition duration-200"
            >
              Sign In
            </button>
          </form>
          
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          
          <div className="flex justify-center">
            <button 
              aria-label="Log in with Google" 
              className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current text-gray-700 dark:text-gray-300">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
          </div>
          
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-[#da3d00] hover:underline">Sign up</Link>
          </p>
        </div>

        
        <div className='w-full max-w-lg'>
          <Lottie animationData={animation} loop={true} />
        </div>

      </div>
    </div>
  );
};

export default Login;
