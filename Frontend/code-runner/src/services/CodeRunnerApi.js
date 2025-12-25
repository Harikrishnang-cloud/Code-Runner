export async function runCodeApi(code, language) {
  const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language })
  });

  return res.json();
}
