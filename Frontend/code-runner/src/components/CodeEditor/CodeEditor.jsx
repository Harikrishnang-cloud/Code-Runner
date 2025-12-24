import Editor from "@monaco-editor/react";



function CodeEditor({ code, setCode,language="javascript",autoSuggest={autoSuggest}, theme={theme} }) {
  return (
    <Editor
      key={language}
      height="50vh"
      language={language}
      theme={ theme ==="dark" ?  "vs-dark" : "light" }
      value={code}
      onChange={(value) => setCode(value || "")}
      options={{
        automaticLayout:true,
        suggestOnTriggerCharacters:autoSuggest,
        quickSuggestions:autoSuggest ? {other:true,comments:false,strings:true} : false,
        parameterHints:{
          enabled:autoSuggest
        }
      }}/>
  );
}

export default CodeEditor;
