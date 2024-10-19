import React from 'react';

// Define interface for props
interface StartButtonProps {
  nextSequence: () => void;
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const StartButton: React.FC<StartButtonProps> = ({ nextSequence, isStarted, setIsStarted }) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsStarted(true);
    setTimeout(() => {
      nextSequence();
    }, 1000);
  };

  return (
    <div className="absolute bottom-20 sm:bottom-14 md:bottom-8 lg:bottom-4 left-1/2 -translate-x-[50%]">
      {!isStarted && (
        <button
          className={`px-5 py-3 mt-5 text-[#fef2bf] bg-black rounded-full items-center`}
          onClick={handleClick}
        >
          start
        </button>
      )}
    </div>
  );
};

export default StartButton;
