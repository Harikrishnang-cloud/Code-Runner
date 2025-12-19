import { useState } from "react";
import { runCodeApi } from "../services/CodeRunnerApi";

export function useCodeRunner() {
  const [code, setCode] = useState(`console.log("Hello World")`);
  const [output, setOutput] = useState("");

  async function runCode(language) {
    setOutput("")
  const data = await runCodeApi(code, language);
  if (data.output) {
    setOutput(data.output); 
    return true;       
  }

  if (data.error) {
    setOutput(data.error);
    return false;         
  }
  setOutput("No output");
    return false;
}
  return {
    code,
    setCode,
    output,
    runCode
  };
}
