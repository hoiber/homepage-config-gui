# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Ensure we're using npm, not yarn
RUN rm -f yarn.lock .yarnrc* || true

# Install dependencies
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Ensure we're using npm, not yarn
RUN rm -f yarn.lock .yarnrc* || true

# Install production dependencies only
RUN npm ci --only=production --no-audit --no-fund

# Copy built application and server
COPY --from=builder /app/build ./build
COPY server.js ./

# Create config directory
RUN mkdir -p /config

# Environment variables
ENV NODE_ENV=production
ENV PORT=3001
ENV HOMEPAGE_CONFIG_PATH=/config
ENV SERVICES_FILE=services.yaml
ENV SETTINGS_FILE=settings.yaml
ENV WIDGETS_FILE=widgets.yaml
ENV PROXMOX_FILE=proxmox.yaml
ENV ENABLE_LIVE_UPDATES=false

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]