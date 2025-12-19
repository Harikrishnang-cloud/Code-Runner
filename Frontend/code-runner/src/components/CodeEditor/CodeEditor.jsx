import Editor from "@monaco-editor/react";



function CodeEditor({ code, setCode,language="javascript" }) {
  return (
    <Editor
      key={language}
      height="400px"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value || "")}
      options={{
        automaticLayout:true
      }}
    />
  );
}

export default CodeEditor;
