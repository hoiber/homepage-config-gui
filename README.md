# Homepage Config Editor

A comprehensive web-based GUI for creating, editing, and managing [Homepage](https://github.com/gethomepage/homepage) dashboard configurations with live file updates and Docker integration.

![Homepage Config Editor](https://img.shields.io/badge/Homepage-Config%20Editor-blue?style=for-the-badge&logo=react)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)
![Live Updates](https://img.shields.io/badge/Live-Updates-green?style=for-the-badge)

![Docker Hub](https://img.shields.io/docker/pulls/hoiber/homepage-config-editor?style=for-the-badge&logo=docker)
![GitHub Container Registry](https://img.shields.io/badge/GHCR-Available-green?style=for-the-badge&logo=github)
![Multi-Architecture](https://img.shields.io/badge/Multi--Arch-AMD64%20%7C%20ARM64%20%7C%20ARMv7-orange?style=for-the-badge)

![CleanShot 2025-08-07](CleanShot%202025-08-07.png)

## 🌟 Features

### 🎯 **Core Functionality**
- **Visual Configuration Builder**: Drag-and-drop interface for creating Homepage configurations
- **Real-time YAML Preview**: Live preview of generated configuration files
- **Three Configuration Types**: Services, Settings, and Information Widgets
- **131+ Pre-configured Services**: Quick-add popular services with default configurations
- **100+ Widget Types**: Comprehensive widget library organized by category

### 🔄 **Live Updates**
- **File System Integration**: Direct read/write to Homepage config files
- **Automatic Backups**: Timestamped backups created before every save
- **Real-time Sync**: Changes appear instantly in your Homepage dashboard
- **Environment-based Configuration**: Secure, configurable file paths

### 🏗️ **Advanced Features**
- **Nested Groups & Subgroups**: Organize services hierarchically
- **Quick-add Functionality**: One-click service addition with defaults
- **Comprehensive Ping Configuration**: Monitor service availability
- **Import/Export**: Upload existing YAML files or download configurations
- **Flexible YAML Parsing**: Intelligent format detection and normalization

### 🐳 **Docker Integration**
- **Multi-profile Deployment**: Static, live, and full-stack options
- **Pre-built Images**: Available on Docker Hub and GitHub Container Registry
- **Multi-architecture Support**: AMD64, ARM64, ARM/v7 (Raspberry Pi)
- **Homepage Integration**: Seamless container orchestration
- **Production Ready**: Nginx-based static serving or Node.js live updates
- **Volume Mounting**: Persistent configuration storage

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

**Full Stack Deployment (Homepage + Config Editor):**
```bash
git clone https://github.com/hoiber/homepage-config-editor.git
cd homepage-config-editor
docker-compose --profile full up -d --build
```

**Access Your Applications:**
- **Config Editor**: http://localhost:8080
- **Homepage Dashboard**: http://localhost:3000
- **Shared Config**: `./config/` directory

### Option 2: Pre-built Docker Images
```bash
# Full server with live updates
docker run -p 3001:3001 -v ./config:/config -e ENABLE_LIVE_UPDATES=true hoiber/homepage-config-editor:latest

# Static Nginx build (read-only)
docker run -p 8080:80 hoiber/homepage-config-editor:static

# From GitHub Container Registry
docker run -p 3001:3001 ghcr.io/hoiber/homepage-config-editor:latest
```

### Option 3: Standalone Config Editor
```bash
# Live updates version
docker-compose --profile live up -d --build

# Static version (no file system access)
docker-compose --profile static up -d --build
```

### Option 4: Manual Installation
```bash
npm install
npm run build
ENABLE_LIVE_UPDATES=true npm run server
```

## 📋 Available Profiles

| Profile | Services | Ports | Description |
|---------|----------|-------|-------------|
| **`full`** | Homepage + Config GUI | 3000, 8080 | Complete development setup |
| **`live`** | Config GUI (Live Updates) | 8080 | Live file system integration |
| **`homepage`** | Homepage Only | 3000 | Just the dashboard |
| **`static`** | Config GUI (Static) | 8080 | Secure, no file access |

## 🛠️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_LIVE_UPDATES` | `false` | Enable file system operations |
| `HOMEPAGE_CONFIG_PATH` | `/config` | Configuration directory path |
| `SERVICES_FILE` | `services.yaml` | Services configuration filename |
| `SETTINGS_FILE` | `settings.yaml` | Settings configuration filename |
| `WIDGETS_FILE` | `widgets.yaml` | Widgets configuration filename |
| `PORT` | `3001` | Server port for live updates |

### Volume Mounting
```yaml
volumes:
  - ./config:/config              # Local development
  - /var/lib/homepage:/config     # Production Homepage config
```

## 🔧 Supported Services & Widgets

### Popular Services (131+ total)
**Media & Streaming:** Plex, Jellyfin, Emby, Sonarr, Radarr, Lidarr, Prowlarr, Bazarr, Tautulli, Overseerr, Jellyseerr

**Infrastructure:** Proxmox, TrueNAS, pfSense, OPNsense, Unifi Controller, Pi-hole, AdGuard Home, Nginx Proxy Manager

**Development:** GitLab, GitHub, Gitea, Jenkins, Portainer, Grafana, Prometheus, InfluxDB, Home Assistant

**Download Clients:** qBittorrent, Transmission, Deluge, SABnzbd, NZBGet, Jackett

**Monitoring:** Uptime Kuma, Zabbix, PRTG, LibreNMS, Netdata, Glances, Scrutiny

### Information Widgets (100+ types)
**System Monitoring:** Resources (CPU, Memory, Disk), Weather, Date/Time, Search

**Service Integration:** Docker stats, System information, Network monitoring

**Customization:** Bookmarks, Greeting messages, Custom widgets

## 📖 Usage Examples

### Creating a Media Server Setup
1. **Add Group**: "Media Servers"
2. **Quick-add Services**: Select Plex, Sonarr, Radarr from dropdown
3. **Configure Widgets**: Add resource monitoring and weather
4. **Save to Server**: Click "Save to Server" for live updates
5. **View Results**: Changes appear instantly in Homepage

### Importing Existing Configuration
1. **Import YAML**: Click "Import YAML" and select your file
2. **Automatic Normalization**: Editor fixes format inconsistencies
3. **Edit & Enhance**: Add new services or modify existing ones
4. **Export/Save**: Download updated config or save directly

### Setting Up Nested Groups
```yaml
# Generated structure
- name: "Home Lab"
  services:
    - name: "Proxmox"
      href: "https://proxmox.local:8006"
  subgroups:
    - name: "Monitoring"
      services:
        - name: "Grafana"
          href: "http://grafana.local:3000"
```

## 🔐 Security Features

### Built-in Security
- **Live Updates Disabled by Default**: Must be explicitly enabled
- **Environment Variable Configuration**: No hardcoded paths
- **Input Validation**: Server-side YAML validation
- **Container Isolation**: Limited file system access
- **Automatic Backups**: Prevent data loss

### Security Headers (Nginx)
```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: no-referrer-when-downgrade
```

### Recommended Production Settings
```bash
# Minimal permissions
docker run --read-only --tmpfs /tmp \
  -v ./config:/config \
  -e ENABLE_LIVE_UPDATES=true \
  homepage-config-gui:live
```

## 🏗️ Architecture

### Frontend (React)
- **Modern React 19**: Hooks-based architecture
- **Tailwind CSS**: Responsive, utility-first styling
- **Lucide Icons**: Consistent iconography
- **Real-time Updates**: Live configuration preview

### Backend (Node.js/Express)
- **RESTful API**: Clean endpoint design
- **File System Operations**: Secure file handling
- **Backup Management**: Automatic backup creation
- **Health Monitoring**: Status and diagnostics endpoints

### Container Architecture
```
┌─────────────────┐    ┌─────────────────┐
│   Homepage      │    │  Config Editor  │
│   (Port 3000)   │    │   (Port 8080)   │
│                 │    │                 │
│  ┌───────────┐  │    │  ┌───────────┐  │
│  │Dashboard  │◄─┼────┼──┤Live Updates│  │
│  └───────────┘  │    │  └───────────┘  │
└─────────────────┘    └─────────────────┘
         │                       │
         └───── ./config/ ────────┘
              (Shared Volume)
```

## 📚 API Documentation

### Core Endpoints
```
GET  /api/health                    # System health check
GET  /api/config/status            # Configuration status
GET  /api/config/{type}            # Read configuration file
POST /api/config/{type}            # Write configuration file
GET  /api/config/{type}/backups    # List backup files
```

### Response Examples
```json
// Health Check
{
  "status": "ok",
  "liveUpdates": true,
  "configPath": "/config"
}

// Configuration Status
{
  "liveUpdates": true,
  "configPath": "/config",
  "files": {
    "services": { "exists": true, "size": 2048 },
    "settings": { "exists": true, "size": 512 }
  }
}
```

## 🔧 Development

### Local Development Setup
```bash
# Clone repository
git clone https://github.com/hoiber/homepage-config-editor.git
cd homepage-config-editor

# Install dependencies
npm install

# Start development servers
npm run dev  # Concurrent React + Express
```

### Building
```bash
# Production build
npm run build

# Docker images
docker build -t homepage-config-gui:live .
docker build -f Dockerfile.static -t homepage-config-gui:static .
```

### Testing
```bash
# Run tests
npm test

# With coverage
npm test -- --coverage
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation for API changes
- Ensure Docker builds succeed
- Test with both static and live deployments

## 📄 File Structure

```
homepage-config-editor/
├── src/                         # React source code
│   ├── App.js                  # Main application component
│   ├── index.js                # React entry point
│   └── index.css               # Tailwind CSS imports
├── public/                     # Static assets
├── build/                      # Production build output
├── config/                     # Generated configuration files
├── server.js                   # Express server for live updates
├── package.json                # Dependencies and scripts
├── Dockerfile                  # Live updates container
├── Dockerfile.static           # Static nginx container
├── docker-compose.yml          # Multi-profile orchestration
├── nginx.conf                 # Production nginx configuration
├── README-LiveUpdates.md      # Detailed live updates documentation
├── README.md                  # This file
└── .gitignore                # Git ignore patterns
```

## 🐛 Troubleshooting

### Common Issues

**"Live updates not available"**
```bash
# Check environment variable
echo $ENABLE_LIVE_UPDATES

# Verify container has write access
docker exec homepage-config-gui ls -la /config
```

**"Permission denied on config directory"**
```bash
# Fix permissions
chmod -R 755 ./config
chown -R $USER:$USER ./config
```

**"Container won't start"**
```bash
# Check logs
docker logs homepage-config-gui
docker logs homepage
```

**"Changes not appearing in Homepage"**
- Verify both containers share the same volume
- Check Homepage logs for file parsing errors
- Ensure YAML syntax is valid

### Performance Issues
- **Large configurations**: Consider splitting into multiple files
- **Slow loading**: Check available system resources
- **Memory usage**: Monitor container resource consumption

## 🙏 Acknowledgments

- **[Homepage](https://github.com/gethomepage/homepage)**: The amazing dashboard that inspired this project
- **React Team**: For the excellent framework and developer experience
- **Tailwind CSS**: For the beautiful, utility-first styling approach
- **Docker**: For making deployment and distribution seamless
- **Community**: For feedback, bug reports, and feature suggestions

## 📊 Project Stats

![Lines of Code](https://img.shields.io/tokei/lines/github/hoiber/homepage-config-editor)
![Repository Size](https://img.shields.io/github/repo-size/hoiber/homepage-config-editor)
![Last Commit](https://img.shields.io/github/last-commit/hoiber/homepage-config-editor)
![Issues](https://img.shields.io/github/issues/hoiber/homepage-config-editor)
![License](https://img.shields.io/github/license/hoiber/homepage-config-editor)

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/hoiber/homepage-config-editor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/hoiber/homepage-config-editor/discussions)
- **Homepage Community**: [Homepage Discord](https://discord.gg/homepage)

---

<div align="center">

**Made with ❤️ for the Homepage community**

[⭐ Star this repo](https://github.com/hoiber/homepage-config-editor) | [🐛 Report Bug](https://github.com/hoiber/homepage-config-editor/issues) | [💡 Request Feature](https://github.com/hoiber/homepage-config-editor/issues)

</div>