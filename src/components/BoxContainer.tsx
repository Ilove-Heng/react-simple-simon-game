import React from 'react';
import { HTMLAttributes } from 'react';

// Import sounds
import red from "../assets/sounds/red.mp3";
import green from "../assets/sounds/green.mp3";
import blue from "../assets/sounds/blue.mp3";
import yellow from "../assets/sounds/yellow.mp3";

// Import Box component
import Box from './Box';

// Define interface for props
interface BoxContainerProps extends HTMLAttributes<HTMLDivElement> {
  randomChosenColour: string | null;
  userClick: (color: string) => void;
}

// Define interface for sound object
interface SoundObject {
  play(): Promise<void>;
}

const BoxContainer: React.FC<BoxContainerProps> = ({ randomChosenColour, userClick }) => {
  const redSound = new Audio(red) satisfies SoundObject;
  const greenSound = new Audio(green) satisfies SoundObject;
  const blueSound = new Audio(blue) satisfies SoundObject;
  const yellowSound = new Audio(yellow) satisfies SoundObject;

  return (
    <>
      <div className="block w-fit mx-auto pt-48">
        <div className="flex">
          <Box
            color="red"
            next={randomChosenColour}
            userClick={userClick}
            sound={redSound}
          />
          <Box
            color="blue"
            next={randomChosenColour}
            userClick={userClick}
            sound={blueSound}
          />
        </div>

        <div className="flex">
          <Box
            color="yellow"
            next={randomChosenColour}
            userClick={userClick}
            sound={yellowSound}
          />
          <Box
            color="green"
            sound={greenSound}
            next={randomChosenColour}
            userClick={userClick}
          />
        </div>
      </div>
    </>
  );
};

export default BoxContainer;
