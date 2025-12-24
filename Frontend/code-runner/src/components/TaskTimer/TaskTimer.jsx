import { useRef, useState } from "react";

function TaskTimer({ onTimeUp ,theme}) {
  const [minutes, setMinutes] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);



  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };


  function startTimer() {
    if (intervalRef.current) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          onTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }


  function pauseTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }


  // function restartTimer(){
  //   clearInterval(intervalRef.current)
  //   intervalRef.current = null;
  //   setTimeLeft(minutes*60)
  //   setIsRunning(false)
  //   onTimeUp(false)
  // }

  function changeMinutes(value) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setMinutes(value);
    setTimeLeft(value * 60);
    setIsRunning(false);
    onTimeUp(false);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ fontWeight: "bold" }}>
        ⏱️ {formatTime(timeLeft)}
      </div>

      <select
        value={minutes}
        onChange={(e) => changeMinutes(Number(e.target.value))}
        style={{background: theme === "dark" ? "#1e1e1e" : "#ffffff",color: theme === "dark" ? "#ffffff" : "#000000",
        border: theme === "dark" ? "1px solid #555" : "1px solid #ccc",padding: "4px 8px",borderRadius: "4px",cursor: "pointer"}}>
        <option value={1}>1 min</option>
        <option value={5}>5 min</option>
        <option value={10}>10 min</option>
        <option value={15}>15 min</option>
        <option value={30}>30 min</option>
        <option value={45}>45 min</option>
        <option value={60}>1 hour</option>
        <option>Custom Time</option>
      </select>

      <button
        onClick={isRunning ? pauseTimer : startTimer}
        style={{padding: "6px 12px",borderRadius: "6px",cursor: "pointer",border: theme === "dark" ? "1px solid #555" : "1px solid #ccc",
          background: theme === "dark" ? "#1e1e1e" : "#ffffff",color: theme === "dark" ? "#ffffff" : "#000000",
        }}>
        {isRunning ? "Pause" : "Start"}
      </button>
      {/* <button onClick={restartTimer}>
        Restart
      </button> */}
    </div>
  );
}

export default TaskTimer;
