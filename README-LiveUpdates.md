# Live Updates Feature

The Homepage Config GUI now supports live updates to YAML files when deployed with appropriate file system access. This feature allows you to directly save and load configuration files to/from the server filesystem.

## Features

- **Live Configuration Saving**: Save services.yaml, settings.yaml, and widgets.yaml directly to the filesystem
- **Live Configuration Loading**: Load existing configuration files from the filesystem
- **Automatic Backups**: Every save creates a timestamped backup of the previous file
- **Backup Management**: View and delete backup files through the UI
- **Environment Variable Configuration**: Configure file paths and enable/disable the feature via environment variables
- **Security**: Live updates are disabled by default and must be explicitly enabled

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_LIVE_UPDATES` | `false` | Enable or disable live file updates |
| `HOMEPAGE_CONFIG_PATH` | `/config` | Path to the homepage configuration directory |
| `SERVICES_FILE` | `services.yaml` | Filename for services configuration |
| `SETTINGS_FILE` | `settings.yaml` | Filename for settings configuration |
| `WIDGETS_FILE` | `widgets.yaml` | Filename for widgets/information configuration |
| `PORT` | `3001` | Port for the Node.js server |

## Docker Deployment

### Option 1: Docker Compose (Recommended)

**Full Stack (Homepage + Config GUI with Live Updates):**
```bash
# Run both Homepage and Config GUI together
docker-compose --profile full up -d --build
```

**Individual Services:**
```bash
# Config GUI with live updates only
docker-compose --profile live up -d --build

# Homepage dashboard only
docker-compose --profile homepage up -d

# Static Config GUI (original nginx-based)
docker-compose --profile static up -d --build
```

**Service Access:**
- **Homepage Dashboard:** http://localhost:3000
- **Config GUI:** http://localhost:8080
- **Shared Config Directory:** `./config/`

### Option 2: Docker Run

```bash
# Create a local config directory
mkdir -p ./config

# Run with live updates
docker run -d \
  --name homepage-config-gui \
  -p 8080:3001 \
  -v $(pwd)/config:/config \
  -e ENABLE_LIVE_UPDATES=true \
  -e HOMEPAGE_CONFIG_PATH=/config \
  homepage-config-gui:live

# Or mount your existing Homepage config directory
docker run -d \
  --name homepage-config-gui \
  -p 8080:3001 \
  -v /path/to/your/homepage/config:/config \
  -e ENABLE_LIVE_UPDATES=true \
  homepage-config-gui:live
```

### Option 3: Manual Build and Run

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the server with live updates
ENABLE_LIVE_UPDATES=true HOMEPAGE_CONFIG_PATH=./config npm run server
```

## Usage

1. **Deploy with Live Updates**: Use one of the deployment methods above with `ENABLE_LIVE_UPDATES=true`

2. **Configure File Path**: Mount your Homepage config directory to `/config` (or set `HOMEPAGE_CONFIG_PATH` to your preferred location)

3. **Access the Interface**: Navigate to `http://localhost:8080` (or your configured port)

4. **Live Update Buttons**: When live updates are enabled, you'll see additional buttons:
   - **Load from Server**: Load existing configuration from the filesystem
   - **Save to Server**: Save current configuration to the filesystem

5. **Status Indicator**: A colored dot shows the live update status:
   - 🟢 Green: Connected and enabled
   - 🟡 Yellow: Connected but issues detected  
   - 🔴 Red: Disconnected or disabled

## File Structure

When `HOMEPAGE_CONFIG_PATH` is set to `/config`, the following structure is created:

```
/config/
├── services.yaml        # Main services configuration
├── settings.yaml        # Homepage settings
├── widgets.yaml         # Information widgets
├── services.yaml.backup.1234567890    # Automatic backups
├── settings.yaml.backup.1234567890
└── widgets.yaml.backup.1234567890
```

## Security Considerations

1. **Disabled by Default**: Live updates are disabled by default for security
2. **File System Access**: Only enable this feature in trusted environments
3. **Container Isolation**: The feature only has access to the mounted volume
4. **Backup Creation**: Automatic backups prevent accidental data loss
5. **Path Validation**: File operations are restricted to the configured directory

## API Endpoints

When live updates are enabled, the following API endpoints are available:

- `GET /api/health` - Health check and configuration status
- `GET /api/config/status` - Detailed configuration and file status
- `GET /api/config/{type}` - Read configuration file (services, settings, widgets)
- `POST /api/config/{type}` - Write configuration file
- `GET /api/config/{type}/backups` - List backup files
- `DELETE /api/config/{type}/backup/{timestamp}` - Delete specific backup

## Troubleshooting

### Live Updates Not Available
- Ensure `ENABLE_LIVE_UPDATES=true` is set
- Check that the container has write access to the mounted volume
- Verify the config directory path is correct

### Permission Issues
```bash
# Fix permissions on your config directory
chmod -R 755 /path/to/config
chown -R 1000:1000 /path/to/config  # Use appropriate UID/GID
```

### File Not Found Errors
- Create the config directory before mounting: `mkdir -p ./config`
- Ensure the path exists and is accessible from within the container

### Connection Issues
- Check the status indicator in the UI
- Verify the server is running on the correct port
- Check browser console for error messages

## Integration with Homepage

To use the generated files with Homepage:

1. **Same Directory**: Mount the same directory to both containers:
   ```yaml
   volumes:
     - ./config:/config  # Same path for both containers
   ```

2. **Different Directories**: Copy files between locations or use symbolic links

3. **File Watching**: Homepage automatically reloads when configuration files change

## Docker Compose Profiles

The included `docker-compose.yml` supports multiple deployment profiles:

| Profile | Services | Description |
|---------|----------|-------------|
| `full` | Homepage + Config GUI (Live) | Complete setup with both services |
| `live` | Config GUI (Live) | Config GUI with live updates only |
| `homepage` | Homepage | Homepage dashboard only |
| `static` | Config GUI (Static) | Static Config GUI without live updates |

**Usage Examples:**
```bash
# Full stack deployment (recommended for development)
docker-compose --profile full up -d --build

# Production with existing Homepage
docker-compose --profile live up -d --build

# Just Homepage dashboard
docker-compose --profile homepage up -d
```

**Port Mapping:**
- **Homepage:** http://localhost:3000
- **Config GUI:** http://localhost:8080
- **Shared Config:** `./config/` directory

This setup allows you to edit configurations in the GUI and see changes immediately in Homepage.