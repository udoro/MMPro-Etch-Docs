// Run a JS file inside the connected Etch builder tab via the AI Connector.
// Usage: node etch.mjs <file.js>
import { readFileSync } from "node:fs";

const code = readFileSync(process.argv[2], "utf8");

const port = process.env.ETCH_PORT || "7332";
const res = await fetch(`http://127.0.0.1:${port}/eval`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  // The default is 30s. A full tree/style snapshot of a large build exceeds it,
  // and a timed-out eval keeps running in the page, so raise it rather than retry.
  body: JSON.stringify({ code, timeoutMs: Number(process.env.ETCH_TIMEOUT || 120000) }),
});

const json = await res.json();
if (json.logs?.length) for (const l of json.logs) console.error("[log]", typeof l === "string" ? l : JSON.stringify(l));
if (!json.ok) {
  console.error("ERROR:", JSON.stringify(json.error ?? json, null, 2));
  process.exitCode = 1;
} else {
  console.log(typeof json.value === "string" ? json.value : JSON.stringify(json.value, null, 2));
}
