#!/usr/bin/env python3
import os
import subprocess
import sys
import time

PROJECT = os.path.dirname(os.path.abspath(__file__))


def load_env():
    env_path = os.path.join(PROJECT, ".env")
    env = {}
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, val = line.partition("=")
            env[key.strip()] = val.strip()
    return env


def main():
    env = load_env()
    db_url = env.get("PROD_DATABASE_URL") # or env.get("DATABASE_URL")
    if not db_url:
        print("ERROR: PROD_DATABASE_URL or DATABASE_URL not found in .env")
        sys.exit(1)

    print(":: Starting SSH tunnel to s9:5432 ...")
    tunnel = subprocess.Popen(
        ["ssh", "-L", "7432:localhost:5432", "-N", "s9"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(2)

    try:
        print(":: Running migrations ...")
        result = subprocess.run(
            ["sea-orm-cli", "migrate", "up", "-u", db_url],
            # cwd=os.path.join(PROJECT, "migration"),
        )

        if result.returncode != 0:
            sys.exit(result.returncode)

        print(":: Migrations applied")
    finally:
        print(":: Closing SSH tunnel ...")
        tunnel.terminate()
        try:
            tunnel.wait(timeout=5)
        except subprocess.TimeoutExpired:
            tunnel.kill()
            tunnel.wait()


if __name__ == "__main__":
    main()
