import Editor from "@monaco-editor/react";



function CodeEditor({ code, setCode,language="javascript",autoSuggest={autoSuggest} }) {
  return (
    <Editor
      key={language}
      height="400px"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value || "")}
      options={{
        automaticLayout:true,
        suggestOnTriggerCharacters:autoSuggest,
        quickSuggestions:autoSuggest ? {other:true,comments:false,strings:true} : false,
        parameterHints:{
          enabled:autoSuggest
        }
      }}
    />
  );
}

export default CodeEditor;
