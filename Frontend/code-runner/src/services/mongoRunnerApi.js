export async function runMongoQuery(query) {
  const res = await fetch("http://localhost:1729/mongo/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  return res.json();
}
