export async function runCodeApi(code,language) {
  const res = await fetch("http://localhost:1729/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code,language })
  });

  return res.json();
}
