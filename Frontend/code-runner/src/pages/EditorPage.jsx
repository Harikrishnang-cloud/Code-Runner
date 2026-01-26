import {useEffect, useState } from "react";
import Modal from "react-modal";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import RunButton from "../components/RunButton/RunButton";
import OutputPanel from "../components/OutputPanel/outputPanel";
import LanguageSelector from "../components/LanguageSelector/languageList";
import TaskTimer from "../components/TaskTimer/TaskTimer";
import QuestionsLibrary from "../components/QuestionsLibrary/QuestionsLibrary";
import { useCodeRunner } from "../hooks/useCodeRunner";
import { toast } from "react-toastify";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';


function EditorPage() {
  const { code, setCode, output, runCode} = useCodeRunner();
  const [language, setLanguage] = useState("javascript");
  const [timeUp, setTimeUp] = useState(false);          
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [autoSuggest,setautoSuggest] = useState(true)
  const [theme,setTheme] = useState("dark")
  const [qtn,setQtn] = useState(false)
  const Default_Languages = { 
    javascript : `console.log("Hello World")`,
    typescript : `console.log("Hello TypeScript World")`,
    python : `print("Hello World")`,
    php : `<?php 
    echo "Hello World"
    `,
    c:`#include <stdio.h>
    int main(){
    printf("Hello C World \\n");
    return 0;
    }`,
    ruby: `puts "Hello World"`,
  }
  useEffect(()=>{
    const savedTheme = localStorage.getItem("theme")
    if(savedTheme){
      setTheme(savedTheme)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("theme",theme)
  },[theme])

  useEffect(()=>{
    function infoToast(){
      toast.info("This platform is under active development. Some features may add or change without notice. ~ By Development Team",{
        toastId:"dev-info",
      })
    }
    infoToast()
    const interval = setInterval(infoToast,15*60*1000)
    return()=>clearInterval(interval)
  },[])

  useEffect(()=>{
    const ShortCutKey = async(e)=>{
      if((e.ctrlKey || e.metaKey) && e.key === "Enter"){
        if(!timeUp){
          let success = await runCode(language)
          setTaskCompleted(success)
        }
      }
    }
    document.addEventListener("keydown",ShortCutKey)
    return ()=>{
      document.removeEventListener("keydown",ShortCutKey)
    }
  },[timeUp,language,runCode])

  return (
    <div style={{ padding: 20, minHeight:"100vh",background:theme==="dark"?"#121212":"#f5f5f5", color:theme==="dark" ? "#ffffff":"#000000",overflow:"hidden"}}>
     
      {/*  navbar  */}
      <div
        style={{
          display: "flex",flexWrap:"wrap",gap:"10px",
          justifyContent: "space-between",alignItems: "center",marginBottom: 10
        }}>
        {/* logo */}
        <div>
          <h2 style={{ margin: 0 }}>🧑‍💻 Code Runner</h2>
          <p style={{ margin: 0, fontSize: "12px" }}>
          ❤️From a single idea to a running world of code📈
          </p>
        </div>

        
        <div style={{display:"flex",flexWrap:"wrap",gap:"8px",alignItems:"center"}}>
        {/* <div style={{marginTop:"10px", border:"1px solid #333", padding:"10px",borderRadius:"8px", maxWidth:"500px"}}>
          <QuestionsLibrary/>
        </div> */}
        <button onClick={()=>setQtn(true)} style={{padding:"3px 7px",borderRadius:"6px",background:"#1976D2",color:"#fff",cursor:"pointer",transition: "0.92s"}}>
          📚Library
        </button>

      <Modal isOpen={qtn} onRequestClose={() => setQtn(false)}style={{overlay: {backgroundColor: "rgba(0,0,0,0.5)"},
        content: {maxWidth: "500px", maxHeight:"420px",margin: "auto",borderRadius: "8px",
        padding: "20px",background: theme === "dark" ? "#1e1e1e" : "#fff",color: theme === "dark" ? "#fff" : "#000"}
        }}ariaHideApp={false}><h2>📚 Practice Problems</h2>
        <QuestionsLibrary />

        <div style={{ textAlign: "center", marginTop: "15px" }}>
  <button
    onClick={() => setQtn(false)}
    style={{
      padding: "6px 14px",
      borderRadius: "6px",
      background: "#d33",
      color: "#fff",
      border: "none",
      cursor: "pointer"
    }}
  >
    Close
  </button>
</div>

      </Modal>


        <button onClick={() => setautoSuggest(prev => !prev)}
          style={{padding: "4px 8px",borderRadius: "6px",cursor: "pointer",border: "1px solid #555",background: autoSuggest ? "#2e7d32" : "#444",color: "#fff",transition: "all 0.95s ease"}}>
          {autoSuggest ? "Suggestions ON" : "Suggestions OFF"}
        </button>

        <button data-tooltip-id="runTip" data-tooltip-content="Dark/Light"data-tooltip-place="bottom" onClick={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))} 
          style={{padding: "6px 12px",borderRadius: "6px",cursor: "pointer",border: theme === "dark" ? "1px solid #555" : "1px solid #ccc",
          background: theme === "dark" ? "#1e1e1e" : "#ffffff",color: theme === "dark" ? "#ffffff" : "#000000",transition: "all 0.95s ease",
          }}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <TaskTimer data-tooltip-id="runTip" data-tooltip-content="Timer"data-tooltip-place="bottom" onTimeUp={setTimeUp} theme={theme} />  
          <LanguageSelector data-tooltip-id="runTip" data-tooltip-content="Languages"data-tooltip-place="left" language={language} onChange={(lang)=>{
            setLanguage(lang)
            setCode(Default_Languages[lang] || "")
          }} theme={theme}/>
          
        </div>
      </div>
      </div>


      <CodeEditor code={code} 
      setCode={(value)=>{
        setCode(value);
        setTaskCompleted(false)
      }} language={language} autoSuggest={autoSuggest} theme={theme}/>
 
      <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",marginTop: "10px",width: "100%",}}>
  
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {!timeUp && taskCompleted && (
            <span style={{ color: "#4caf50", fontWeight: "bold" }}>
             ✓ Task completed
            </span>
          )}

          {timeUp && (
            <span style={{ color: "#ffcc00", fontWeight: "bold" }}>
             ⚠️ Time’s up! Please stop and review your solution.
            </span>
          )}
        </div>

        <RunButton data-tooltip-id="runTip"data-tooltip-content="Shortcut : Ctrl+Enter"data-tooltip-place="top"
        onRun={async () => {
          const success = await runCode(language);
          if (!timeUp) setTaskCompleted(success);
        }}disabled={timeUp}/> 
      </div>
      <Tooltip id="runTip"/>
      <OutputPanel output={output} theme={theme}/>

    <div style={{
       position: "fixed",bottom: "12px",right: "40px",fontSize: "12px",
       opacity: 0.5,color: theme === "dark" ? "#ffffff" : "#2886c9ff"}}>
      <a href="https://www.linkedin.com/in/harikrishnan-g-1315721b7/" style={{ color: "inherit", textDecoration: "none" }}>
        ~ Developed By HARIKRISHNAN_G
      </a>
    </div>
    </div>
  );
}

export default EditorPage;
