function LanguageSelector({ language, onChange }) {
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "#1e1e1e",
        color: "white",
        border: "1px solid #555",
        padding: "4px 8px",
        borderRadius: "4px",
        cursor: "pointer"
      }}>
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="php">PHP (Work in progress...)</option>
      <option value="cpp" disabled>C++ (Coming Soon)</option>
      <option value="C" disabled>C (Coming Soon)</option>
      <option value="C#" disabled>C Sharp (Coming Soon)</option>
      <option value="Ruby" disabled>Ruby (Coming Soon)</option>
      <option value="Go" disabled>Go (Coming Soon)</option>
      <option value="Java" disabled>Java (Coming Soon)</option>
      <option value="R" disabled>R (Coming Soon)</option>
    </select>
  );
}

export default LanguageSelector;
