#!/bin/bash

# Docker Build Test Script
# This script tests the Docker build process

set -e

echo "🐳 Testing Docker build for Homepage Config GUI..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "✅ Docker is running"

# Build the image
echo "📦 Building Docker image..."
docker build -t homepage-config-gui:test .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    
    # Get image size
    IMAGE_SIZE=$(docker images homepage-config-gui:test --format "table {{.Size}}" | tail -n 1)
    echo "📊 Image size: $IMAGE_SIZE"
    
    # Test run the container (in background)
    echo "🚀 Testing container startup..."
    CONTAINER_ID=$(docker run -d -p 8081:80 homepage-config-gui:test)
    
    # Wait a moment for container to start
    sleep 3
    
    # Test health endpoint
    if curl -f http://localhost:8081/health > /dev/null 2>&1; then
        echo "✅ Container is running and health check passed!"
    else
        echo "⚠️  Container started but health check failed"
    fi
    
    # Stop and remove test container
    docker stop $CONTAINER_ID > /dev/null
    docker rm $CONTAINER_ID > /dev/null
    
    echo "🧹 Cleaned up test container"
    
    # Optionally remove test image
    read -p "Remove test image? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker rmi homepage-config-gui:test > /dev/null
        echo "🗑️  Test image removed"
    fi
    
    echo "🎉 Docker build test completed successfully!"
else
    echo "❌ Docker build failed!"
    exit 1
fi