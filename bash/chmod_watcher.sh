#!/bin/bash

# Set the target directory (change this to your desired directory)
TARGET_DIR="$HOME/4.Nest-js"

# Check if the directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "Directory does not exist: $TARGET_DIR"
    exit 1
fi

# Infinite loop to update permissions every 5 seconds
while true; do
    # Set permissions for directories (770)
    find "$TARGET_DIR" -type d -exec chmod 770 {} \;

    # Set permissions for files (660)
    find "$TARGET_DIR" -type f -exec chmod 660 {} \;

    echo "Permissions updated at $(date)"
    
    # Wait 5 seconds before next iteration
    sleep 5
done
