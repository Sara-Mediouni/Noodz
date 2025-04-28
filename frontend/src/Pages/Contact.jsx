import React from 'react';

const Contact = () => {
  return (
    <section className="py-20 mt-50 px-6 md:px-20 text-black">
      <div className="max-w-6xl mx-auto bg-orange-200 text-black rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-orange-300 mb-10"> Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            
            <div className='grid grid-cols-2 gap-5'>
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet700"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet700"
            /></div>
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet700"
            />
             <input
              type="email"
              placeholder="Phone"
              className="border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet700"
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet700"
            />
          </div>

          <div>
            <textarea
              rows="10"
              placeholder="Your Message..."
              className="w-full border border-gray-500 rounded-lg px-4 py-3 h-full resize-none focus:outline-none focus:ring-2 focus:ring-violet700"
            ></textarea>
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="border-gray-500 hover:bg-black bg-black text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
