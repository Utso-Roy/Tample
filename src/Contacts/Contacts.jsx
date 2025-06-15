import React from 'react';

const Contacts = () => {
    return (
        <section className="p-6 bg-[#f3f4f6] dark:bg-gray-900 dark:text-gray-200 min-h-screen flex items-center justify-center">
          <form noValidate className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow-2xl bg-white dark:bg-gray-800 dark:text-gray-200">
            <h2 className="w-full text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100">Contact us</h2>
            
            <div>
              <label htmlFor="name" className="block mb-1 ml-1 text-gray-700 dark:text-gray-300">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                required
                className="block w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 ml-1 text-gray-700 dark:text-gray-300">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Your email"
                required
                className="block w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-1 ml-1 text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                id="message"
                placeholder="Message..."
                className="block w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 resize-none"
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold rounded bg-orange-700 text-white shadow
                  hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500
                  dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-400"
              >
                Send
              </button>
            </div>
          </form>
        </section>
    );
};

export default Contacts;
