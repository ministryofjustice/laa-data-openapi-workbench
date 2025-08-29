#!/usr/bin/env bash
set -e  # exit immediately on error

echo "🚀 Building swagger-docs image..."
docker compose build swagger

echo "✅ Build complete. Starting container..."
docker compose up swagger
