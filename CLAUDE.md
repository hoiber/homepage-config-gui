# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
- `npm install` - Install dependencies
- `npm run dev` - Start both React frontend (port 3000) and Express backend (port 3001) concurrently
- `npm start` - Start React development server only
- `npm run server` - Start Express server only
- `npm run build` - Build React app for production
- `npm test` - Run Jest tests

### Docker Commands
- `docker build -t homepage-config-gui:live .` - Build live updates version (Node.js backend)
- `docker build -f Dockerfile.static -t homepage-config-gui:static .` - Build static version (Nginx)
- `docker-compose --profile full up -d --build` - Full stack (Homepage + Config GUI)
- `docker-compose --profile live up -d --build` - Config GUI with live updates only
- `docker-compose --profile static up -d --build` - Static Config GUI only
- `docker-compose --profile homepage up -d` - Homepage dashboard only

### Testing & Quality
- `npm test -- --coverage` - Run tests with coverage report
- `npm run build && npm run server` - Test production build locally

### GitHub Actions
- **Docker Build Pipeline**: Automatically builds and pushes multi-architecture images on push to main/develop
- **Multi-platform support**: linux/amd64, linux/arm64, linux/arm/v7
- **Dual image variants**: `latest` (live updates) and `latest-static` (nginx-only)
- **Docker Hub integration**: Requires `DOCKERHUB_TOKEN` secret configured

## Architecture Overview

### Application Structure
This is a **dual-mode web application** that serves as a GUI for creating Homepage dashboard configurations:

1. **Frontend (React)**: Single-page application built with React 19, Tailwind CSS, and Lucide icons
2. **Backend (Express)**: Node.js server providing REST API for file operations (when live updates enabled)
3. **Deployment Modes**: 
   - **Static**: Nginx-served React build (read-only, ~82MB)
   - **Live**: Node.js server with file system access (~763MB)

### Key Components Architecture

**Main Application Component** (`src/App.js`):
- **Single monolithic component** (~4000+ lines) containing all UI logic
- **State management**: Multiple useState hooks for different config types
- **Tab-based interface**: Services, Settings, Information Widgets
- **Live updates integration**: Real-time file sync when backend enabled

**Configuration Types**:
- **Services**: Group-based service definitions with nested subgroups support
- **Settings**: Homepage dashboard settings (theme, search, etc.)
- **Information Widgets**: System monitoring and custom widgets

**Pre-configured Services**: 131+ services with default configurations including:
- Media servers (Plex, Jellyfin, Emby)
- *arr stack (Sonarr, Radarr, Lidarr, Prowlarr, Bazarr)
- Infrastructure (Proxmox, TrueNAS, Portainer, Grafana)
- Download clients (qBittorrent, SABnzbd, Transmission)

### Backend API Architecture

**Server** (`server.js`):
- **File-based configuration**: Reads/writes YAML files to filesystem
- **Security**: Live updates disabled by default, requires `ENABLE_LIVE_UPDATES=true`
- **Automatic backups**: Creates timestamped backups before saves
- **Environment-driven paths**: Configurable via `HOMEPAGE_CONFIG_PATH`

**API Endpoints**:
- `GET /api/health` - System health and live update status
- `GET /api/config/status` - Configuration files status
- `GET /api/config/{type}` - Read configuration (services/settings/widgets)
- `POST /api/config/{type}` - Write configuration with backup creation
- `GET /api/config/{type}/backups` - List backup files
- `DELETE /api/config/{type}/backup/{timestamp}` - Delete specific backup

### Docker Architecture

**Multi-profile Docker Compose**:
- **`full`**: Homepage dashboard + Config GUI with shared volume
- **`live`**: Config GUI with file system access for live updates
- **`static`**: Read-only Config GUI served by Nginx
- **`homepage`**: Homepage dashboard only

**Deployment Patterns**:
- **Development**: Full profile with both services and shared `./config/` volume
- **Production**: Live profile mounted to existing Homepage config directory
- **Secure environments**: Static profile with no file system access

### State Management Pattern

**Configuration State**: Each config type (services/settings/widgets) maintained in separate state objects
**Live Updates**: Real-time sync between UI state and server filesystem when enabled
**Import/Export**: YAML parsing with intelligent format normalization
**Quick-add System**: Predefined service templates with default configurations

### File Structure Pattern

**Generated Configuration Directory**:
```
./config/
├── services.yaml          # Service groups and definitions
├── settings.yaml          # Dashboard settings and theme
├── widgets.yaml           # Information widgets
└── *.yaml.backup.*        # Timestamped backups
```

### Key Environment Variables
- `ENABLE_LIVE_UPDATES`: Enable/disable file system operations (default: false)
- `HOMEPAGE_CONFIG_PATH`: Configuration directory path (default: /config)
- `SERVICES_FILE/SETTINGS_FILE/WIDGETS_FILE`: Filenames for each config type
- `PORT`: Server port for live updates mode (default: 3001)

### Integration Notes

**Homepage Integration**: Generated YAML files are compatible with Homepage dashboard
**Volume Mounting**: Both Homepage and Config GUI containers must share same config volume
**File Watching**: Homepage automatically reloads when config files change
**Security Model**: Live updates require explicit enablement and proper volume permissions