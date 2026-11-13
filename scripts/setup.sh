
#!/usr/bin/env bash

set -Eeuo pipefail

# Locate the project root
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Vector store download details
RELEASE_URL="https://github.com/Gibitoleon/airline-support-bot/releases/download/v1.0.0/vector_store.zip"

VECTOR_STORE_DIR="$PROJECT_ROOT/backend/rag-service/data/processed/vector_store"

# Create a temporary directory
TEMP_DIR="$(mktemp -d)"
ZIP_PATH="$TEMP_DIR/vector_store.zip"
EXTRACT_DIR="$TEMP_DIR/extracted"

# Clean up temporary files when the script exits
trap 'rm -rf "$TEMP_DIR"' EXIT

echo
echo "=== Checking prerequisites ==="

# Check required commands
for command in docker curl unzip; do
    if ! command -v "$command" >/dev/null 2>&1; then
        echo "Error: $command is not installed or is not available in PATH."
        exit 1
    fi
done

# Check Docker Compose
if ! docker compose version >/dev/null 2>&1; then
    echo "Error: Docker Compose is not available."
    exit 1
fi

# Check whether Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Error: Docker is not running. Start Docker and try again."
    exit 1
fi

# Check required environment files
REQUIRED_ENV_FILES=(
    ".env"
    "frontend/.env"
    "backend/application-backend/.env"
    "backend/rag-service/.env"
)

for file in "${REQUIRED_ENV_FILES[@]}"; do
    if [[ ! -f "$file" ]]; then
        echo "Error: Missing environment file: $file"
        exit 1
    fi
done

echo "Prerequisites passed."

# Prepare temporary directories
mkdir -p "$EXTRACT_DIR"

echo
echo "=== Downloading vector store ==="

curl -fL "$RELEASE_URL" -o "$ZIP_PATH"

echo "Vector store downloaded."

# Extract the ZIP archive
echo
echo "=== Extracting vector store ==="

unzip -q "$ZIP_PATH" -d "$EXTRACT_DIR"

# Locate the Chroma database file
CHROMA_DATABASE="$(find "$EXTRACT_DIR" -type f -name "chroma.sqlite3" -print -quit)"

if [[ -z "$CHROMA_DATABASE" ]]; then
    echo "Error: Could not find chroma.sqlite3 in the downloaded archive."
    exit 1
fi

# Get the directory containing the Chroma database
SOURCE_DIR="$(dirname "$CHROMA_DATABASE")"

# Create the destination directory
mkdir -p "$VECTOR_STORE_DIR"

# Prevent accidental overwriting of an existing vector store
EXISTING_FILES="$(find "$VECTOR_STORE_DIR" -mindepth 1 ! -name ".gitkeep" -print -quit)"

if [[ -n "$EXISTING_FILES" ]]; then
    echo "Error: The vector store destination is not empty."
    echo "Back it up or clear it before continuing."
    exit 1
fi

# Copy vector store files and directories
cp -a "$SOURCE_DIR"/. "$VECTOR_STORE_DIR"/

echo "Vector store extracted successfully."

# Build Docker images
echo
echo "=== Building Docker images ==="

docker compose build

# Run database migrations
echo
echo "=== Running database migrations ==="

docker compose run --rm --no-deps application-backend npx sequelize-cli db:migrate

# Start application services
echo
echo "=== Starting application services ==="

docker compose up -d

# Display running containers
docker compose ps

echo
echo "Deployment completed successfully!"
echo "Access your application through its configured frontend URL."

echo
echo "Remember to run database seeders manually on a fresh installation."
