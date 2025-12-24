import { useState } from "react";
import MongoEditor from "../components/MongoEditor/mongoEditor";
import OutputPanel from "../components/OutputPanel/OutputPanel";
import { runMongoQuery } from "../services/mongoRunnerApi";

function DatabasePage({ theme }) {
  const [query, setQuery] = useState(
    `{"age": {"$gt": 25}}`
  );
  const [output, setOutput] = useState("");

  async function runQuery() {
    const res = await runMongoQuery(query);
    setOutput(JSON.stringify(res.output || res.error, null, 2));
  }

  return (
    <>
      <MongoEditor query={query} setQuery={setQuery} theme={theme} />
      <button onClick={runQuery}>Run Query</button>
      <OutputPanel output={output} theme={theme} />
    </>
  );
}

export default DatabasePage;
