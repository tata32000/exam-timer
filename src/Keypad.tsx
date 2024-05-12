import { useEffect } from "react";

const pad = (num: number, size: number): string => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

const Keypad = ({
  hour,
  minute,
  second,
  setHour,
  setMinute,
  setSecond,
  curPos,
  setCurPos,
  setTimeSet,
  setPrevHour,
  setPrevMinute,
  setPrevSecond,
}: {
  hour: number;
  minute: number;
  second: number;
  setHour: (hour: number) => void;
  setMinute: (minute: number) => void;
  setSecond: (second: number) => void;
  curPos: string;
  setCurPos: (curPos: string) => void;
  setTimeSet: (timeSet: boolean) => void;
  setPrevHour: (prevHour: number) => void;
  setPrevMinute: (prevMinute: number) => void;
  setPrevSecond: (prevSecond: number) => void;
}) => {
  const handleSetClick = () => {
    let prevHour = hour;
    let prevMinute = minute;
    let prevSecond = second;
    if (second >= 60) {
      prevMinute = minute + Math.floor(second / 60);
      setMinute(prevMinute);
      prevSecond = second % 60;
      setSecond(prevSecond);
    }
    if (minute >= 60) {
      prevHour = hour + Math.floor(minute / 60);
      setHour(prevHour);
      prevMinute = minute % 60;
      setMinute(prevMinute);
    }
    setPrevHour(prevHour);
    setPrevMinute(prevMinute);
    setPrevSecond(prevSecond);
    setCurPos("None");
    setTimeSet(true);
    document.title = `${pad(hour, 2)}:${pad(minute, 2)}:${pad(second, 2)}`;
  };
  const clearTimer = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setCurPos("None");
  };
  const handleNumberClick = (num: number) => {
    if (curPos === "hour") {
      if (hour * 10 + num < 100) {
        setHour(hour * 10 + num);
      } else {
        setHour(num);
      }
    } else if (curPos === "minute") {
      if (minute * 10 + num < 60) {
        setMinute(minute * 10 + num);
      } else {
        setMinute(num);
      }
    } else if (curPos === "second") {
      if (second * 10 + num < 60) {
        setSecond(second * 10 + num);
      } else {
        setSecond(num);
      }
    } else {
      if (hour * 10 + Math.floor(minute / 10) < 100) {
        setHour(hour * 10 + Math.floor(minute / 10));
        setMinute((minute % 10) * 10 + Math.floor(second / 10));
        setSecond((second % 10) * 10 + num);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCurPos("None");
      } else if (e.key >= "0" && e.key <= "9") {
        handleNumberClick(parseInt(e.key));
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (e.target.id === "hour") {
          setCurPos("hour");
        } else if (e.target.id === "minute") {
          setCurPos("minute");
        } else if (e.target.id === "second") {
          setCurPos("second");
        } else {
          setCurPos("None");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  });
  return (
    <>
      <div className="flex justify-center mt-4">
        <div className="flex flex-wrap">
          {[...Array(5).keys()].map((num) => (
            <button
              key={num}
              className="m-1 p-4 bg-gray-200 text-lg md:text-xl lg:text-2xl xl:text-3xl rounded-md"
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex flex-wrap">
          {[...Array(5).keys()].map((num) => (
            <button
              key={num + 5}
              className="m-1 p-4 bg-gray-200 text-lg md:text-xl lg:text-2xl xl:text-3xl rounded-md"
              onClick={() => handleNumberClick(num + 5)}
            >
              {num + 5}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <button
          className="mx-1 p-4 md:p-6 lg:p-6 xl:p-6 bg-blue-500 text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl rounded-md"
          onClick={handleSetClick}
        >
          Set
        </button>
        <button
          className="mx-1 p-4 md:p-6 lg:p-6 xl:p-6 bg-red-500 text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl rounded-md"
          onClick={clearTimer}
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default Keypad;
