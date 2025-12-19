import { useRef, useState } from "react";

function TaskTimer({ onTimeUp }) {
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
        style={{
          background: "#1e1e1e",
          color: "white",
          border: "1px solid #555",
          padding: "2px 4px"
        }}>
        <option value={0.25}>15 sec</option>
        <option value={0.5}>30 sec</option>
        <option value={1}>1 min</option>
        <option value={5}>5 min</option>
        <option value={10}>10 min</option>
        <option value={25}>25 min</option>
        <option value={45}>45 min</option>
        <option value={60}>1 hour</option>
      </select>

      <button
        onClick={isRunning ? pauseTimer : startTimer}
        style={{
          fontSize: "12px",
          padding: "2px 6px",
          cursor: "pointer"
        }}>
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}

export default TaskTimer;
