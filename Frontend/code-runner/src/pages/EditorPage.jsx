import {useState } from "react";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import RunButton from "../components/RunButton/RunButton";
import OutputPanel from "../components/OutputPanel/OutputPanel";
import LanguageSelector from "../components/LanguageSelector/languageList";
import TaskTimer from "../components/TaskTimer/TaskTimer";
import { useCodeRunner } from "../hooks/useCodeRunner";
// import { toast } from "react-toastify";

function EditorPage() {
  const { code, setCode, output, runCode} = useCodeRunner();
  const [language, setLanguage] = useState("javascript");
  const [timeUp, setTimeUp] = useState(false);          
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [autoSuggest,setautoSuggest] = useState(true)
  const Default_Languages = { 
    javascript : `console.log("Hello World")`,
    typescript : `console.log("Hello World-ts")`,
    python : `print("Hello World")`,
    php : `<?php echo "Hello World"`
  }

  
  // useEffect(() => {
  //   setTaskCompleted(false);
  // }, [code, timeUp]);

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10
        }}>
        <div>
          <h2 style={{ margin: 0 }}>🧑‍💻 Code Runner</h2>
        </div>
        <p style={{ margin: 0, fontSize: "15px" }}>
          ❤️From a single idea to a running world of code❤️
        </p>
        <button onClick={() => setautoSuggest(prev => !prev)}
          style={{padding: "4px 8px",borderRadius: "6px",cursor: "pointer",border: "1px solid #555",background: autoSuggest ? "#2e7d32" : "#444",color: "#fff"}}>
          {autoSuggest ? "Suggestions ON" : "Suggestions OFF"}
        </button>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <TaskTimer onTimeUp={setTimeUp} />  
          <LanguageSelector language={language} onChange={(lang)=>{
            setLanguage(lang)
            setCode(Default_Languages[lang] || "")
          }}/>
        </div>
      </div>
      <CodeEditor code={code} 
      setCode={(value)=>{
        setCode(value);
        setTaskCompleted(false)
      }} language={language} autoSuggest={autoSuggest}/>
 
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginTop: "10px"
        }}>
        <RunButton onRun={async () => {
          const success = await runCode(language);
          setTaskCompleted(success);
          // if(success){
          //   toast.success("Task Completed")
          // }
        }} disabled={timeUp}/>

        {!timeUp && taskCompleted && (
          <span style={{ color: "#4caf50", fontWeight: "bold" }}>
             Task completed
          </span>
        )}
        {timeUp && (
          <span style={{ color: "#ffcc00", fontWeight: "bold" }}>
             Time’s up! Please stop and review your solution.
          </span>
        )}
      </div>
      <OutputPanel output={output} />

      <div style={{position: "fixed",bottom: "12px",right: "16px",fontSize: "12px",opacity: 0.50,userSelect: "none",color: "#ffffff"}}>
        <a href="https://www.linkedin.com/in/harikrishnan-g-1315721b7/" style={{color:"inherit", textDecoration:"none"}}> ~ Developed By HARIKRISHNAN_G</a>
      </div>
    </div>
  );
}

export default EditorPage;
