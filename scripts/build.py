#!/usr/bin/env python3

import os
import subprocess

# Define the directory path
dir_path = "../dist/shared/lib/doc_parser"

# Create the nested directory (and parent directories if they don't exist)
try:
    os.makedirs(dir_path, exist_ok=True)
    print(f"Directory '{dir_path}' created successfully.")
except OSError as e:
    print(f"Failed to create directory '{dir_path}': {e}")
    exit(1)

# Execute the "yarn build" command
try:
    print("Running 'yarn build'...")
    subprocess.run(["yarn", "build"], check=True)
    print("'yarn build' completed successfully.")
except subprocess.CalledProcessError as e:
    print(f"Failed to execute 'yarn build': {e}")
    exit(1)
except FileNotFoundError:
    print("Error: 'yarn' command not found. Make sure Yarn is installed.")
    exit(1)