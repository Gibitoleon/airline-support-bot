
$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

$ReleaseUrl = "https://github.com/Gibitoleon/airline-support-bot/releases/download/v1.0.0/vector_store.zip"

$VectorStoreDir = Join-Path $ProjectRoot "backend/rag-service/data/processed/vector_store"

$TempDir = Join-Path $env:TEMP ("airline-support-" + [guid]::NewGuid())
$ZipPath = Join-Path $TempDir "vector_store.zip"
$ExtractDir = Join-Path $TempDir "extracted"

try {
    Write-Host "`n=== Checking prerequisites ===" -ForegroundColor Cyan

    # Check whether Docker is installed
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        throw "Docker is not installed or is not available in PATH."
    }

    # Check whether Docker Compose is available
    docker compose version
    if ($LASTEXITCODE -ne 0) {
        throw "Docker Compose is not available."
    }

    # Check whether Docker is running
    docker info | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker is not running. Start Docker Desktop and try again."
    }

    # Check required environment files
    $RequiredEnvFiles = @(
        ".env",
        "frontend/.env",
        "backend/application-backend/.env",
        "backend/rag-service/.env"
    )

    foreach ($File in $RequiredEnvFiles) {
        if (-not (Test-Path $File)) {
            throw "Missing environment file: $File"
        }
    }

    Write-Host "Prerequisites passed." -ForegroundColor Green

    # Prepare temporary directories
    New-Item -ItemType Directory -Path $TempDir -Force | Out-Null
    New-Item -ItemType Directory -Path $ExtractDir -Force | Out-Null

    Write-Host "`n=== Downloading vector store ===" -ForegroundColor Cyan

    Invoke-WebRequest -Uri $ReleaseUrl -OutFile $ZipPath

    Write-Host "Vector store downloaded." -ForegroundColor Green

    # Extract the ZIP archive
    Write-Host "`n=== Extracting vector store ===" -ForegroundColor Cyan

    Expand-Archive -Path $ZipPath -DestinationPath $ExtractDir -Force

    # Locate the Chroma database file
    $ChromaDatabase = Get-ChildItem -Path $ExtractDir -Filter "chroma.sqlite3" -File -Recurse |
        Select-Object -First 1

    if (-not $ChromaDatabase) {
        throw "Could not find chroma.sqlite3 in the downloaded archive."
    }

    # Get the directory containing the Chroma database
    $SourceDir = $ChromaDatabase.Directory.FullName

    # Create the destination directory
    New-Item -ItemType Directory -Path $VectorStoreDir -Force | Out-Null

    # Prevent accidental overwriting of an existing vector store
    $ExistingFiles = Get-ChildItem -Path $VectorStoreDir -Force |
        Where-Object { $_.Name -ne ".gitkeep" }

    if ($ExistingFiles) {
        throw "The vector store destination is not empty. Back it up or clear it before continuing."
    }

    # Copy vector store files and directories
    Get-ChildItem -Path $SourceDir -Force |
        Copy-Item -Destination $VectorStoreDir -Recurse -Force

    Write-Host "Vector store extracted successfully." -ForegroundColor Green

    # Build Docker images
    Write-Host "`n=== Building Docker images ===" -ForegroundColor Cyan

    docker compose build

    if ($LASTEXITCODE -ne 0) {
        throw "Docker image build failed."
    }

    # Run database migrations
    Write-Host "`n=== Running database migrations ===" -ForegroundColor Cyan

    docker compose run --rm --no-deps application-backend npx sequelize-cli db:migrate

    if ($LASTEXITCODE -ne 0) {
        throw "Database migrations failed."
    }

    # Start application services
    Write-Host "`n=== Starting application services ===" -ForegroundColor Cyan

    docker compose up -d

    if ($LASTEXITCODE -ne 0) {
        throw "Failed to start application services."
    }

    # Display running containers
    docker compose ps

    Write-Host "`nDeployment completed successfully!" -ForegroundColor Green
    Write-Host "Access your application through its configured frontend URL."

    Write-Host "`nRemember to run database seeders manually on a fresh installation." -ForegroundColor Yellow
}
finally {
    # Clean up temporary files
    if (Test-Path $TempDir) {
        Remove-Item -Path $TempDir -Recurse -Force
    }
}
