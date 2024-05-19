import { useState, useEffect } from "react";
import Keypad from "./Keypad";

const pad = (num: number, size: number): string => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

const Timer = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [curPos, setCurPos] = useState("None");
  const [timeSet, setTimeSet] = useState(false);
  const [prevHour, setPrevHour] = useState(0);
  const [prevMinute, setPrevMinute] = useState(0);
  const [prevSecond, setPrevSecond] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [bgRed, setBgRed] = useState(false);
  const [isNotified, setIsNotified] = useState(false);

  if (("Notification" in window)) {
    Notification.requestPermission();
  }

  const buttonStyle = (position: string) => {
    return `text-4xl md:text-6xl lg:text-8xl xl:text-9xl bg-transparent border-none outline-none cursor-pointer ${
      curPos === position ? "text-blue-500" : "text-black-600"
    }`;
  };

  const handleStartStop = () => {
    if (hour === 0 && minute === 0 && second === 0) {
      return;
    }
    if (isDone) {
      return;
    }
    if (isRunning) {
      setIsRunning(false);
      return;
    }
    setIsRunning(true);
    setIsNotified(false);
  };

  const handleHome = () => {
    setIsRunning(false);
    setIsDone(false);
    setBgRed(false);
    setTimeSet(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
  }

  const handleClear = () => {
    if (isRunning) {
      return;
    }
    setHour(prevHour);
    setMinute(prevMinute);
    setSecond(prevSecond);
    setBgRed(false);
    setIsDone(false);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isRunning) {
      timer = setInterval(() => {
        if (second > 0) {
          setSecond(second - 1);
        } else if (minute > 0) {
          setSecond(59);
          setMinute(minute - 1);
        } else if (hour > 0) {
          setSecond(59);
          setMinute(59);
          setHour(hour - 1);
        } else {
          setIsRunning(false);
          setIsDone(true);
        }
      }, 1000);
      document.title = `${pad(hour, 2)}:${pad(minute, 2)}:${pad(second, 2)}`;
      return () => clearInterval(timer);
    }
    if (isDone) {
      if (!isNotified) {
        const audio = new Audio("/alarm.mp3");
        audio.play();
        if (("Notification" in window) && Notification.permission === "granted") {
          new Notification("Timer Done");
        }
        setIsNotified(true);
      }
      timer = setInterval(() => {
        setBgRed(!bgRed);
      }, 500);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isRunning, hour, minute, second, isDone, bgRed, isNotified]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <button
          className="block mx-auto text-center text-4xl md:text-6xl lg:text-8xl xl:text-9xl bg-transparent border-none outline-none cursor-pointer"
          onClick={handleHome}
        >
          Timer
        </button>
        <div
          className={`flex items-center justify-center box-border border-2 p-4 border-black rounded-lg ${
            bgRed ? "bg-red-400" : "bg-slate-100"
          }`}
        >
          <div className="flex">
            <button
              className={buttonStyle("hour")}
              id="hour"
              onClick={() => setCurPos("hour")}
            >
              {pad(hour, 2)}
            </button>
            <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl mx-1">
              :
            </span>
            <button
              className={buttonStyle("minute")}
              id="minute"
              onClick={() => setCurPos("minute")}
            >
              {pad(minute, 2)}
            </button>
            <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl mx-1">
              :
            </span>
            <button
              className={buttonStyle("second")}
              id="second"
              onClick={() => setCurPos("second")}
            >
              {pad(second, 2)}
            </button>
          </div>
        </div>
        {!timeSet ? (
          <Keypad
            hour={hour}
            minute={minute}
            second={second}
            setHour={setHour}
            setMinute={setMinute}
            setSecond={setSecond}
            curPos={curPos}
            setCurPos={setCurPos}
            setTimeSet={setTimeSet}
            setPrevHour={setPrevHour}
            setPrevMinute={setPrevMinute}
            setPrevSecond={setPrevSecond}
          />
        ) : (
          <div className="flex justify-center mt-4">
            <button
              className={`p-4 md:p-6 lg:p-6 xl:p-6 ${
                isRunning ? "bg-blue-500" : "bg-green-500"
              } text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl rounded-md mx-1`}
              onClick={handleStartStop}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button
              className="p-4 md:p-6 lg:p-6 xl:p-6 bg-red-500 text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl rounded-md mx-1"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
