#!/bin/bash

# Script to swap React practice drills into src/

DRILLS_DIR="."
SRC_DIR="./src"
AVAILABLE_DRILLS=("todo-list" "autocomplete" "sortable-table" "pagination" "timer" "modal" "grid-toggle" "tabs" "accordion" "fetch-demo")

# Function to show usage
show_usage() {
    echo "Usage: $0 <drill-name>"
    echo ""
    echo "Available drills:"
    for drill in "${AVAILABLE_DRILLS[@]}"; do
        echo "  - $drill"
    done
}

# Check if drill name is provided
if [ -z "$1" ]; then
    echo "Error: No drill name provided"
    echo ""
    show_usage
    exit 1
fi

DRILL_NAME="$1"
DRILL_PATH="$DRILLS_DIR/$DRILL_NAME"

# Validate drill exists
if [ ! -d "$DRILL_PATH" ]; then
    echo "Error: Drill '$DRILL_NAME' not found"
    echo ""
    show_usage
    exit 1
fi

# Ensure src directory exists
mkdir -p "$SRC_DIR"

# Copy files
echo "Swapping to drill: $DRILL_NAME"
cp "$DRILL_PATH/main.tsx" "$SRC_DIR/"
cp "$DRILL_PATH/App.tsx" "$SRC_DIR/"
cp "$DRILL_PATH/index.css" "$SRC_DIR/" 2>/dev/null || echo "Note: No index.css found for $DRILL_NAME"

echo "✓ Swapped to $DRILL_NAME"
echo "Run 'npm run dev' to start the dev server"