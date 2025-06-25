import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-white to-blue-100 px-4">
            <div className="text-center">
                <h1 className="text-[120px] font-bold text-red-500 animate-bounce">
                    404
                </h1>
                <h2 className="text-4xl font-semibold mb-4">Oops! Page not found</h2>
                <p className="text-gray-600 mb-8">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 text-white font-semibold bg-red-600 hover:bg-red-600 rounded-lg transition duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
