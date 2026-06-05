#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/nxtjs"

echo ":: Building Next.js..."
bun run build

echo ":: Deploying to s9..."
scp -r out/* s9:/var/www/fevidcloud/html/

echo ":: Done"
