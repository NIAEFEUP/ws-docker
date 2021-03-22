import fetch from "node-fetch";

export default async function handler(req, res) {
  let { path = [] } = req.query;
  const body = req.body;
  const method = req.method;
  const response = await fetch(`${process.env.API_URL}/${path.join("/")}`, {
    method,
    body:
      method != "GET" && method != "DELETE" ? JSON.stringify(body) : undefined,
    headers:
      method != "GET" && method != "DELETE"
        ? { "Content-Type": "application/json" }
        : undefined,
  });
  if (method != "DELETE") {
    const json = await response.json();
    res.status(response.status).json(json);
  } else {
    res.status(response.status).send("");
  }
}
