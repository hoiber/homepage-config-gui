# Docker Deployment Guide

This guide explains how to build and deploy the Homepage Config GUI using Docker.

## Quick Start

### Building the Docker Image

```bash
# Build the Docker image
npm run docker:build

# Or build manually
docker build -t homepage-config-gui .
```

### Running the Container

```bash
# Run the container on port 8080
npm run docker:run

# Or run with a specific name for easier management
npm run docker:run-dev

# Stop the development container
npm run docker:stop

# Remove the development container
npm run docker:clean
```

### Using Docker Compose

```bash
# Start the service
docker-compose up -d

# Stop the service
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

## Configuration

### Environment Variables

The container accepts the following environment variables:

- `NODE_ENV`: Set to `production` for production builds (default)

### Port Configuration

- **Container Port**: 80 (nginx)
- **Host Port**: 8080 (configurable in docker-compose.yml)

### Traefik Integration

The docker-compose.yml includes Traefik labels for automatic SSL and reverse proxy setup:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.homepage-config-gui.rule=Host(`config.yourdomain.com`)"
  - "traefik.http.routers.homepage-config-gui.tls=true"
  - "traefik.http.routers.homepage-config-gui.tls.certresolver=letsencrypt"
```

Update the host rule to match your domain.

## Advanced Usage

### Custom Nginx Configuration

The container uses a custom nginx configuration (`nginx.conf`) that includes:

- Gzip compression
- Security headers
- Static asset caching
- Health check endpoint at `/health`
- Client-side routing support

### Multi-stage Build

The Dockerfile uses a multi-stage build:

1. **Builder stage**: Installs dependencies and builds the React app
2. **Production stage**: Serves the built app with nginx

This results in a smaller final image (~25MB vs ~1GB).

### Health Checks

The container includes a health check endpoint at `/health` that returns `200 OK`.

### Security Features

- Runs as non-root user in nginx
- Security headers included
- Hidden files blocked
- Gzip compression enabled

## Troubleshooting

### Build Issues

If the build fails, try:

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t homepage-config-gui .
```

### Port Conflicts

If port 8080 is in use, change it in docker-compose.yml:

```yaml
ports:
  - "3000:80"  # Use port 3000 instead
```

### Logs

View container logs:

```bash
docker logs homepage-config-gui
```

## Production Deployment

For production, consider:

1. Using a proper domain name in Traefik configuration
2. Setting up SSL certificates
3. Configuring proper backup strategies
4. Using Docker secrets for sensitive data
5. Setting up monitoring and alerting