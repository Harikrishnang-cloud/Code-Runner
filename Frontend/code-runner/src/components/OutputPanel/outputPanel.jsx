function OutputPanel({ output, theme }) {
  return (
    <pre
      style={{
        background: theme === "dark" ? "#000000" : "#f5f5f5",
        color: theme === "dark" ? "#00ff00" : "#006400",
        padding: 20,
        marginTop: 15,
        minHeight: "140px",
        borderRadius: "6px",
        overflow: "auto"
      }}
    >
      {output || "No output"}
    </pre>
  );
}

export default OutputPanel;
    
