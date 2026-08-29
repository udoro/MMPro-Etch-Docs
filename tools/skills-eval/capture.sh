#!/bin/sh
# capture.sh <outdir> — snapshot full Etch state for A/B grading.
#
# Runs from anywhere: paths resolve from this script's own location.
# Set ETCH_PORT if the connector daemon is not on 7332.
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
OUT="$1"
if [ -z "$OUT" ]; then echo "usage: capture.sh <outdir>" >&2; exit 1; fi
mkdir -p "$OUT"

node "$HERE/etch.mjs" "$HERE/snapshot/snap-blocks.js" > "$OUT/blocks.json"
for i in 0 1 2 3; do
  node "$HERE/etch.mjs" "$HERE/snapshot/snap-styles-$i.js" > "$OUT/styles-$i.json"
done
node "$HERE/etch.mjs" "$HERE/snapshot/snap-sheets.js" > "$OUT/sheets.json"

echo "captured -> $OUT"
