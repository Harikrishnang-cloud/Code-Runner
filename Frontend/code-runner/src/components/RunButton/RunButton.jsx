function RunButton({ onRun,disabled }) {
  return (
    <button onClick={onRun} disabled={disabled} style={{marginTop: 12,marginLeft:"auto", borderRadius:"8px",padding: "9px 18px",
    cursor:disabled ? "not-allowed" : "pointer"}}>
      ▶ Run
    </button>
    
  );
}

export default RunButton;
