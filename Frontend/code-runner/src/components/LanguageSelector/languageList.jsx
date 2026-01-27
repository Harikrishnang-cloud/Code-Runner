import { toast } from "react-toastify";

function LanguageSelector({ language, onChange ,theme,...props}) {
  const handleChange = (e)=>{
        const selectedLanguage = e.target.value
        if(selectedLanguage === "php"){
          toast.info("PHP requires semicolon (;) at the end of statements")
        }
        onChange(selectedLanguage)
      }
  return (
    <select
      value={language}
      onChange={handleChange}
      
      {...props}
      style={{background: theme === "dark" ? "#1e1e1e" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000",
      border: theme === "dark" ? "1px solid #555" : "1px solid #ccc",
      padding: "4px 8px",
      borderRadius: "4px",
      cursor: "pointer"}}>
        
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="dart">Dart</option>
      <option value="php">PHP</option>
      <option value="go">Go-lang(Work in progress...)</option>
      <option value="c">C</option>
      <option value="ruby">Ruby (Work in progress...)</option>
      <option value="cpp">C++ (Work in progress...)</option>
      <option value="r"disabled>R(Coming Soon)</option>
      <option value="C#" disabled>C Sharp (Coming Soon)</option>
      <option value="Java" disabled>Java (Coming Soon)</option>
      

    </select>
  );
}

export default LanguageSelector;
