#!/usr/bin/env node
// Usage: node fix-utf8-json.js in.json out.json
// Fixes mojibake like "â" -> "’" and "ð" -> "🌈" across all string fields.

const fs = require('fs');
const path = require('path');

if (process.argv.length < 4) {
  console.error('Usage: node fix-utf8-json.js <in.json> <out.json>');
  process.exit(1);
}

const IN  = process.argv[2];
const OUT = process.argv[3];

// Optional: strip leading "zinsta/" from URIs so "zinsta/media/..." -> "media/..."
// Set STRIP_ZINSTA=1 to enable.
const STRIP_ZINSTA = process.env.STRIP_ZINSTA === '1';

function fixText(s) {
  // Convert from Latin1 to UTF-8 to undo mojibake
  try {
    const fixed = Buffer.from(s, 'latin1').toString('utf8');
    return STRIP_ZINSTA ? fixed.replace(/^zinsta\//, '') : fixed;
  } catch {
    return STRIP_ZINSTA ? s.replace(/^zinsta\//, '') : s;
  }
}

function deepFix(v) {
  if (typeof v === 'string') return fixText(v);
  if (Array.isArray(v)) return v.map(deepFix);
  if (v && typeof v === 'object') {
    const out = {};
    for (const [k, val] of Object.entries(v)) out[k] = deepFix(val);
    return out;
  }
  return v;
}

const raw = fs.readFileSync(IN, 'utf8');
let json;
try {
  json = JSON.parse(raw);
} catch (e) {
  console.error('Invalid JSON input:', e.message);
  process.exit(2);
}

const fixed = deepFix(json);
fs.writeFileSync(OUT, JSON.stringify(fixed, null, 2), 'utf8');

console.log(`✅ Wrote repaired JSON to ${path.resolve(OUT)}`);
