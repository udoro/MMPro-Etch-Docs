// Measure connector round-trip latency, so "the network was slow" or "the tab was
// unresponsive" becomes a number instead of a suspicion.
//
// Run immediately BEFORE and AFTER each arm. A trivial eval isolates transport and
// tab responsiveness from anything the arm does.
//
// Usage: node zz-latency.mjs <label> [samples]

import { execFileSync } from 'node:child_process';
import { writeFileSync, appendFileSync, existsSync } from 'node:fs';

const label = process.argv[2] || 'unlabelled';
const n = Number(process.argv[3] || 7);
const TAB = 'etchtuts.designwithcracka.com';

writeFileSync('zz-ping.js', 'return String(etch.blocks.getTree().length);');

const ms = [];
for (let i = 0; i < n; i++) {
  const t0 = Date.now();
  try {
    execFileSync('npx', ['@digital-gravy/etch-connector', 'eval', '-t', TAB, '-f', 'zz-ping.js'],
      { stdio: 'pipe', shell: true });
    ms.push(Date.now() - t0);
  } catch {
    ms.push(-1); // a failed round trip is itself the signal
  }
}

const ok = ms.filter((x) => x > 0).sort((a, b) => a - b);
const med = ok.length ? ok[Math.floor(ok.length / 2)] : -1;
const line = `${new Date().toISOString()}  ${label.padEnd(16)} n=${n} ok=${ok.length} ` +
  `min=${ok[0] ?? '-'} median=${med} max=${ok[ok.length - 1] ?? '-'}  raw=[${ms.join(',')}]`;

console.log(line);
if (!existsSync('zz-latency.log')) writeFileSync('zz-latency.log', 'connector round-trip latency (ms)\n');
appendFileSync('zz-latency.log', line + '\n');
