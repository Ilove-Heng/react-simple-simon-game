import React, { useState, useEffect, useRef } from "react";

// App Imports...
import Heading from "./components/Heading";
import wrong from "./assets/sounds/wrong.mp3";
import StartButton from "./components/StartButton";
import GameInfo from "./components/GameInfoBox";
import BoxContainer from "./components/BoxContainer";
import InfoIcon from "./components/InfoIcon";

// Define types for complex types
type ButtonColour = "red" | "blue" | "green" | "yellow";

interface ButtonColourMap {
  [key: string]: ButtonColour;
}

interface AudioObject {
  play(): Promise<void>;
}

// App component
function App(): React.ReactElement {
  // States, Reference and constants
  const ref = useRef<HTMLButtonElement>(null);
  const [gamePattern, setGamePattern] = useState<string[]>([]);
  const [userClickedPattern, setUserClickedPattern] = useState<string[]>([]);
  const [level, setLevel] = useState<number>(0);
  const [heading, setHeading] = useState<string | null>(`Press Start to start the Game`);
  const [randomChosenColour, setRandomChosenColour] = useState<string | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const buttonColour: ButtonColourMap = { red: "red", blue: "blue", green: "green", yellow: "yellow" };
  const wrongSound = new Audio(wrong) satisfies AudioObject;

  // Functions
  const handleInfoClick = () => {
    ref.current?.click();
  };

  const userClick: (color: string) => void = (color) => {
    setUserClickedPattern([...userClickedPattern, color]);
  };

  const nextSequence: () => void = () => {
    setHeading(null);
    setLevel(level + 1);
    setUserClickedPattern([]);

    const colors = Object.keys(buttonColour);
    const randomColorName = colors[Math.floor(Math.random() * colors.length)];
    setRandomChosenColour(buttonColour[randomColorName]);
  };

  const checkAnswer: (i: number) => void = (i) => {
    if (userClickedPattern[i] !== gamePattern[i]) {
      setWrongAnswer(true);
      setIsStarted(false);
      setHeading("Game-Over Start Again");
      wrongSound.play();
      setTimeout(() => {
        setWrongAnswer(false);
      }, 200);
      setGamePattern([]);
      setLevel(0);
    } else if (i + 1 === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 700);
    }
  };

  useEffect(() => {
    if (userClickedPattern.length !== 0) {
      checkAnswer(userClickedPattern.length - 1);
    }
  }, [userClickedPattern]);

  useEffect(() => {
    if (randomChosenColour) {
      setGamePattern((gamepattern) => [...gamepattern, randomChosenColour]);
      setRandomChosenColour(null);
    }
  }, [randomChosenColour]);

  useEffect(() => {
    // To re-render component after the level changes or the new color choosed or the user selects a wrong answer
  }, [wrongAnswer, level, gamePattern]);

  useEffect(() => {
    if (isStarted) {
      setHeading("Starting...");
    }
  }, [isStarted]);

  return (
    <>
      {/* Info menu for the game */}
      <GameInfo reference={ref} showInfo={showInfo} setShowInfo={setShowInfo} />

      {/* Main container for the game */}
      <div className={`w-full h-[100vh] ${wrongAnswer ? "bg-[#ff0000] opacity-80" : "bg-[#011F3F]"} text-center ${showInfo && "blur-sm"}`}>

        {/* Info Icon component */}
        {!showInfo && !isStarted && <InfoIcon handleInfoClick={handleInfoClick} />}

        {/* Heading Component */}
        <Heading level={level} heading={heading} />

        {/* Box Container Component */}
        <BoxContainer randomChosenColour={randomChosenColour} userClick={userClick} />

        {/* Start Button Component */}
        <StartButton nextSequence={nextSequence} isStarted={isStarted} setIsStarted={setIsStarted} />
      </div>
    </>
  );
}

// Exporting the App
export default App;
