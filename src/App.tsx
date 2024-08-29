import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { IoMdClose } from "react-icons/io";

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "Hi!",
    "I'm Losík Bot, here to assist with any questions about my work.",
    "How can I help you today?"
  ]);

  const options = [
    "Just saying Hello!",
    "How can I reach out to you?",
    "Daily Reminder",
    "What tech stack do you use?"
  ];

  const handleOptionClick = (option: string) => {
    setMessages([...messages, option]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <div className="w-[400px] bg-white rounded-xl shadow-lg">
        <div className='w-full flex flex-row rounded-t-xl items-center justify-between bg-gradient-to-r from-rose-400 via-violet-400 to-purple-500 p-4'>
            <div className=''>
               <h2 className='text-white font-semibold text-xl'> Losík bot </h2>
               <p className='text-gray-100 font-light'> Zeptejte se na cokoliv </p>
            </div>
            <IoMdClose className='w-5 h-5 fill-white cursor-pointer hover:scale-110 duration-200'/>
        </div>
        <div className='p-4'> 
          {messages.map((msg, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2 bg-neutral-100 p-2 rounded-md shadow-sm text-gray-700"
            >
              {msg}
            </motion.div>
          ))}
          <div className="mt-4">
            {options.map((option, index) => (
              <motion.button 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full text-left mb-2 p-2 border border-blue-500 text-blue-500 rounded"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </motion.button>
            ))}
          </div>                 
        </div>
      </div>
    </div>
  );
}

export default App;
