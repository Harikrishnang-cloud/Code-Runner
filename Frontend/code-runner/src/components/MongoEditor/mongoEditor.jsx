import Editor from "@monaco-editor/react";

function MongoEditor({query,setQuery,theme}){
    return(
        <Editor height={"300px"} language="javascript" theme={theme=="dark"?"vs-dark":"light"} value={query}
        onChange={(v)=>setQuery(v||"")} options={{minimap:{
            enabled:false
        }}}/>
    )
}
export default MongoEditor