import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PanicBtn: React.FC = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isHolding) {
      timer = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 30);
    } else {
      setProgress(0);
    }

    return () => clearInterval(timer);
  }, [isHolding]);

  useEffect(() => {
    if (progress === 100) {
      handlePanic();
    }
  }, [progress]);

  const handlePanic = () => {
    Swal.fire({
      title: 'Panic Button Activated!',
      text: 'Your emergency message has been sent to your contact.',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate('/helper/userpage');
    });

    setIsHolding(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute top-0 left-0 right-0 p-4 bg-white shadow-md flex justify-between items-center">
      <button 
          className="flex items-center text-red-700 hover:text-red-500 transition duration-300"
          onClick={() => navigate('/helper/userpage')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2" // Adjust size and margin as needed
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Emergency Button</h1>
        <div className="w-12"></div>
      </div>

      <div className="absolute top-1/4 text-center">
        <h1 className="text-2xl font-extrabold text-red-600 drop-shadow-lg">
          Are you in an emergency?
        </h1>
        <p className="text-md text-gray-700 mt-2">
          Hold the button, and we will send a message to your emergency contact via WhatsApp.
        </p>
      </div>

      <div className="relative flex items-center justify-center mt-16">
        <div
          className="absolute w-52 h-52 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out"
          style={{
            background: `conic-gradient(red ${progress * 3.6}deg, rgba(0, 0, 0, 0.1) ${progress * 3.6}deg)`,
          }}
        >
          <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center">
            <button
              className="relative z-10 w-40 h-40 text-2xl text-white bg-red-700 rounded-full transition-colors duration-200 hover:bg-red-800 active:bg-red-600"
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onMouseLeave={() => setIsHolding(false)}
            >
              Panic Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanicBtn;
