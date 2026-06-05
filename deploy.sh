#!/usr/bin/env bash
set -euo pipefail

PROJECT="$(dirname "$0")"

echo ":: Building Next.js..."
(cd "$PROJECT/nxtjs" && bun run build)

echo ":: Deploying frontend to s9..."
scp -r "$PROJECT/nxtjs/out/"* s9:/var/www/fevidcloud/html/

echo ":: Building backend (release)..."
(cd "$PROJECT" && cargo build --release)

echo ":: Deploying backend to s9..."
ssh s9 "systemctl stop fevid"
scp "$PROJECT/target/release/fevidc" s9:/var/www/fevidcloud/fevidc
ssh s9 "systemctl start fevid"

echo ":: Done"
