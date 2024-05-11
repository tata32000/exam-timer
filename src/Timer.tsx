import { useState } from "react";

function pad(num: number, size: number): string {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

const Timer = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-center text-4xl md:text-6xl lg:text-8xl xl:text-9xl">
          Timer
        </h1>
        <div className="flex items-center justify-center box-border border-2 p-4 border-black rounded-lg">
          <p className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl">
            {pad(hour, 2)}:{pad(minute, 2)}:{pad(second, 2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
