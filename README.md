# Boilerplate Monorepo

Actix + Next.js monorepo template with PostgreSQL and nginx.

## Quick start

```sh
# Install uv (Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install tmuxp via uv
uv tool install tmuxp

# Start the workspace (3-pane tmux session)
tmuxp load tmuxp-workspace.yaml
```

## tmuxp workspace panes

| Pane | Command | Description |
|------|---------|-------------|
| 1 | `docker compose up` | Starts PostgreSQL and nginx containers |
| 2 | `cd nxtjs && bun dev -p 1929 -H 0.0.0.0` | Next.js dev server on port 1929 |
| 3 | `bacon run-long` | Runs the Actix backend on port 9291 |

The nginx proxy on port `80` routes `/` to Next.js and `/api/` to the Actix backend.
