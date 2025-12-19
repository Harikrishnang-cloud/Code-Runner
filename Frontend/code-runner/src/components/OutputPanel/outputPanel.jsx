function OutputPanel({ output }) {
  return (
    <pre
      style={{
        background: "#111",
        color: "#0f0",
        padding: 20,
        marginTop: 15,
        minHeight: "140px",
        minWidth:"1450px"
      }}>
      {output || "No output"}
    </pre>
  );
}

export default OutputPanel;

