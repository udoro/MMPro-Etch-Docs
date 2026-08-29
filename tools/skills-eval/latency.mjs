// Measure connector round-trip latency, so "the network was slow" or "the tab
// was unresponsive" becomes a number instead of a suspicion.
//
// Run immediately BEFORE and AFTER each arm. A trivial eval isolates transport
// and tab responsiveness from anything the arm does. Results append to
// latency.log next to this script.
//
// Usage: node latency.mjs <label> [samples]

import { appendFileSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const label = process.argv[2] || 'unlabelled';
const n = Number(process.argv[3] || 7);
const port = process.env.ETCH_PORT || '7332';
const url = `http://127.0.0.1:${port}/eval`;
const code = 'return String(etch.blocks.getTree().length);';

const ms = [];
for (let i = 0; i < n; i++) {
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code, timeoutMs: 30000 }),
    });
    const json = await res.json();
    // A structured failure is still a completed round trip, but it is not a
    // latency sample: record it as failed so ok/n shows something is wrong.
    ms.push(json.ok ? Date.now() - t0 : -1);
  } catch {
    ms.push(-1);
  }
}

const ok = ms.filter((x) => x > 0).sort((a, b) => a - b);
const med = ok.length ? ok[Math.floor(ok.length / 2)] : -1;
const line =
  `${new Date().toISOString()}  ${label.padEnd(16)} n=${n} ok=${ok.length} ` +
  `min=${ok[0] ?? '-'} median=${med} max=${ok[ok.length - 1] ?? '-'}  raw=[${ms.join(',')}]`;

console.log(line);

const log = join(here, 'latency.log');
if (!existsSync(log)) writeFileSync(log, 'connector round-trip latency (ms)\n');
appendFileSync(log, line + '\n');
