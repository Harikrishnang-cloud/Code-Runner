function LanguageSelector({ language, onChange ,theme}) {
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value)}
      style={{background: theme === "dark" ? "#1e1e1e" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000",
      border: theme === "dark" ? "1px solid #555" : "1px solid #ccc",
      padding: "4px 8px",
      borderRadius: "4px",
      cursor: "pointer"}}>
        
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="php">PHP (Work in progress...)</option>
      <option value="ruby">Ruby (Work in progress...)</option>
      <option value="cpp" disabled>C++ (Coming Soon)</option>
      <option value="C" disabled>C (Coming Soon)</option>
      <option value="C#" disabled>C Sharp (Coming Soon)</option>
      <option value="Go" disabled>Go (Coming Soon)</option>
      <option value="Java" disabled>Java (Coming Soon)</option>
      <option value="R" disabled>R (Coming Soon)</option>
      <option value="mongoDB">MongoDB</option>
    </select>
  );
}

export default LanguageSelector;
