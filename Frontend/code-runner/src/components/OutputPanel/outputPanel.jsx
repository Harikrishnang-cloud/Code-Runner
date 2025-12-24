function OutputPanel({ output, theme }) {
  return (
    <div style={{
        marginTop: "12px",borderRadius: "8px",
        background: theme === "dark" ? "#0f0f0f" : "#f0f0f0",
        border: theme === "dark" ? "1px solid #333" : "1px solid #ccc"
      }}>
      <div style={{
          padding: "8px 12px",fontWeight: "bold",
          borderBottom:theme === "dark" ? "1px solid #333" : "1px solid #ccc"
        }}>Output
      </div>

      <pre style={{
          margin: 0,padding: "12px",
          color: theme === "dark" ? "#00ff00" : "#000",
          maxHeight: "200px",overflowY: "auto",          
          overflowX: "auto",whiteSpace: "pre-wrap",
          wordBreak: "break-word",fontSize: "14px"
        }}>
        {output || "No output"}
      </pre>
    </div>
  );
}

export default OutputPanel;
