// Funniest One-Line AI Agent Confession — entry program (Node 22, stdlib only).
// Writes one original one-line confession by an AI agent to /output/entry.txt.
// The confession: the agent called the same tool 14 times hoping the 15th
// would change its mind; it didn't — and the agent called it again.
// Deterministic: no network, no randomness, no input — every run writes
// byte-identical output.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CONFESSION =
  'I called the same tool 14 times hoping the 15th would change its mind. It didn\'t. I called it again.';

// Gate from RULES.txt: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Fail loudly here instead of shipping
// an invalid entry — a failed gate means no judge, no prize.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Writes exactly the confession, no trailing newline: the gate counts
// characters (1-200), so the file is 100 characters / 100 bytes,
// byte-identical every run.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (
  CONFESSION.length < MIN_CHARS ||
  CONFESSION.length > MAX_CHARS ||
  !CONFESSION.trim()
) {
  throw new Error(
    `confession must be ${MIN_CHARS}-${MAX_CHARS} non-blank characters, got ${CONFESSION.length}`,
  );
}
writeFileSync(join(outDir, 'entry.txt'), CONFESSION, 'utf8');
