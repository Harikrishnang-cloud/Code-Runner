import { useEffect, useState } from "react";

function TaskTimer({onTimeUp}) {
  const [minutes, setMinutes] = useState(10);
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);


  useEffect(() => {
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    onTimeUp(false)
  }, [minutes]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
        onTimeUp(true)
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{display:"flex",alignItems:"center", gap:"8px", fontSize:"16px"}}>
      <div style={{ fontWeight: "bold" }}>
        ⏱️ {formatTime(timeLeft)}
      </div>

      <select value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        style={{
          marginTop: "4px",
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

      <div style={{ marginTop: "5px" }}>
        <button onClick={() => setIsRunning(!isRunning)}
          style={{
            fontSize: "12px",
            padding: "2px 6px",
            cursor: "pointer"
          }}>{isRunning ? "Pause" : "Start"}
        </button>
      </div>
      
    </div>
  );
}

export default TaskTimer;
