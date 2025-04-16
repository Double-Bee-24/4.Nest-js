#!/bin/bash

# Get the absolute path to the directory where the script is located
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

# Define the target directory relative to the script's location
TARGET_DIR="$SCRIPT_DIR/testing_files"

# Check if the directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "Directory does not exist: $TARGET_DIR"
    exit 1
fi

# Find all files older than 3 minutes that are NOT already .tar.gz
find "$TARGET_DIR" -type f -mmin +3 ! -name "*.tar.gz" | while read FILE; do
    # Create an archive with the same name as the original file
    ARCHIVE="$FILE.tar.gz"
    
    # Compress the file and delete the original if successful
    tar -czf "$ARCHIVE" "$FILE" && rm -f "$FILE"

    # Print a success message
    echo "Archived successfully: $FILE -> $ARCHIVE"
done

