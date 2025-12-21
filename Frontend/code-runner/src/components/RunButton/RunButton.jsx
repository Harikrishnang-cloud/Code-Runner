function RunButton({ onRun }) {
  return (
    <button onClick={onRun} style={{marginTop: 12,marginLeft:"auto", borderRadius:"8px",padding: "9px 18px",cursor: "pointer"}}>
      ▶ Run
    </button>
    
  );
}

export default RunButton;
