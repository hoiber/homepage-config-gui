// Common service definitions with default configurations
// Lazy-loaded to improve initial bundle size
let _commonServices = null;

export const getCommonServices = () => {
  if (_commonServices) return _commonServices;
  
  _commonServices = {
    // Media Servers & Streaming
    plex: {
      name: 'Plex',
      href: 'http://localhost:32400',
      description: 'Media streaming server',
      icon: 'plex',
      widget: { type: 'plex', url: 'http://localhost:32400', key: 'your-plex-token' }
    },
    sonarr: {
      name: 'Sonarr',
      href: 'http://localhost:8989',
      description: 'TV series management',
      icon: 'sonarr',
      widget: { type: 'sonarr', url: 'http://localhost:8989', key: 'your-api-key' }
    },
    radarr: {
      name: 'Radarr',
      href: 'http://localhost:7878',
      description: 'Movie collection manager',
      icon: 'radarr',
      widget: { type: 'radarr', url: 'http://localhost:7878', key: 'your-api-key' }
    },
    lidarr: {
      name: 'Lidarr',
      href: 'http://localhost:8686',
      description: 'Music collection manager',
      icon: 'lidarr',
      widget: { type: 'lidarr', url: 'http://localhost:8686', key: 'your-api-key' }
    },
    prowlarr: {
      name: 'Prowlarr',
      href: 'http://localhost:9696',
      description: 'Indexer manager',
      icon: 'prowlarr',
      widget: { type: 'prowlarr', url: 'http://localhost:9696', key: 'your-api-key' }
    },
    bazarr: {
      name: 'Bazarr',
      href: 'http://localhost:6767',
      description: 'Subtitle management',
      icon: 'bazarr',
      widget: { type: 'bazarr', url: 'http://localhost:6767', key: 'your-api-key' }
    },
    jellyfin: {
      name: 'Jellyfin',
      href: 'http://localhost:8096',
      description: 'Free media streaming',
      icon: 'jellyfin',
      widget: { type: 'jellyfin', url: 'http://localhost:8096', key: 'your-api-key' }
    },
    portainer: {
      name: 'Portainer',
      href: 'http://localhost:9000',
      description: 'Docker management',
      icon: 'portainer',
      widget: { type: 'portainer', url: 'http://localhost:9000', key: 'your-api-key' }
    },
    traefik: {
      name: 'Traefik',
      href: 'http://localhost:8080',
      description: 'Reverse proxy dashboard',
      icon: 'traefik',
      widget: { type: 'traefik', url: 'http://localhost:8080', key: '' }
    },
    qbittorrent: {
      name: 'qBittorrent',
      href: 'http://localhost:8080',
      description: 'BitTorrent client',
      icon: 'qbittorrent',
      widget: { type: 'qbittorrent', url: 'http://localhost:8080', key: '' }
    },
    sabnzbd: {
      name: 'SABnzbd',
      href: 'http://localhost:8080',
      description: 'Usenet downloader',
      icon: 'sabnzbd',
      widget: { type: 'sabnzbd', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    grafana: {
      name: 'Grafana',
      href: 'http://localhost:3000',
      description: 'Analytics & monitoring',
      icon: 'grafana',
      widget: { type: 'grafana', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    homeassistant: {
      name: 'Home Assistant',
      href: 'http://localhost:8123',
      description: 'Home automation',
      icon: 'homeassistant',
      widget: { type: 'homeassistant', url: 'http://localhost:8123', key: 'your-long-lived-token' }
    },
    uptimekuma: {
      name: 'Uptime Kuma',
      href: 'http://localhost:3001',
      description: 'Uptime monitoring',
      icon: 'uptimekuma',
      widget: { type: 'uptimekuma', url: 'http://localhost:3001', key: 'your-api-key' }
    },
    tautulli: {
      name: 'Tautulli',
      href: 'http://localhost:8181',
      description: 'Plex monitoring',
      icon: 'tautulli',
      widget: { type: 'tautulli', url: 'http://localhost:8181', key: 'your-api-key' }
    },
    overseerr: {
      name: 'Overseerr',
      href: 'http://localhost:5055',
      description: 'Request management',
      icon: 'overseerr',
      widget: { type: 'overseerr', url: 'http://localhost:5055', key: 'your-api-key' }
    },
    adguard: {
      name: 'AdGuard Home',
      href: 'http://localhost:3000',
      description: 'DNS ad blocker',
      icon: 'adguardhome',
      widget: { type: 'adguard', url: 'http://localhost:3000', key: '' }
    },
    npm: {
      name: 'Nginx Proxy Manager',
      href: 'http://localhost:81',
      description: 'Nginx proxy manager',
      icon: 'nginxproxymanager',
      widget: { type: 'npm', url: 'http://localhost:81', key: '' }
    },
    nextcloud: {
      name: 'Nextcloud',
      href: 'http://localhost:8080',
      description: 'Cloud storage',
      icon: 'nextcloud',
      widget: { type: 'nextcloud', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    gitea: {
      name: 'Gitea',
      href: 'http://localhost:3000',
      description: 'Git service',
      icon: 'gitea',
      widget: { type: 'gitea', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    transmission: {
      name: 'Transmission',
      href: 'http://localhost:9091',
      description: 'BitTorrent client',
      icon: 'transmission',
      widget: { type: 'transmission', url: 'http://localhost:9091', key: '' }
    },
    deluge: {
      name: 'Deluge',
      href: 'http://localhost:8112',
      description: 'BitTorrent client',
      icon: 'deluge',
      widget: { type: 'deluge', url: 'http://localhost:8112', key: 'your-password' }
    },
    ombi: {
      name: 'Ombi',
      href: 'http://localhost:3579',
      description: 'Request management',
      icon: 'ombi',
      widget: { type: 'ombi', url: 'http://localhost:3579', key: 'your-api-key' }
    },
    pihole: {
      name: 'Pi-hole',
      href: 'http://localhost:80',
      description: 'DNS ad blocker',
      icon: 'pihole',
      widget: { type: 'pihole', url: 'http://localhost:80', key: 'your-api-key' }
    },
    emby: {
      name: 'Emby',
      href: 'http://localhost:8096',
      description: 'Media streaming server',
      icon: 'emby',
      widget: { type: 'emby', url: 'http://localhost:8096', key: 'your-api-key' }
    },
    authentik: {
      name: 'Authentik',
      href: 'http://localhost:9000',
      description: 'Identity provider',
      icon: 'authentik',
      widget: { type: 'authentik', url: 'http://localhost:9000', key: 'your-api-key' }
    },
    readarr: {
      name: 'Readarr',
      href: 'http://localhost:8787',
      description: 'Book collection manager',
      icon: 'readarr',
      widget: { type: 'readarr', url: 'http://localhost:8787', key: 'your-api-key' }
    },
    jackett: {
      name: 'Jackett',
      href: 'http://localhost:9117',
      description: 'Indexer proxy',
      icon: 'jackett',
      widget: { type: 'jackett', url: 'http://localhost:9117', key: 'your-api-key' }
    },
    flaresolverr: {
      name: 'FlareSolverr',
      href: 'http://localhost:8191',
      description: 'Cloudflare solver',
      icon: 'flaresolverr'
    },
    nzbget: {
      name: 'NZBGet',
      href: 'http://localhost:6789',
      description: 'Usenet downloader',
      icon: 'nzbget',
      widget: { type: 'nzbget', url: 'http://localhost:6789', key: '' }
    },
    calibre: {
      name: 'Calibre',
      href: 'http://localhost:8080',
      description: 'E-book management',
      icon: 'calibre',
      widget: { type: 'calibre', url: 'http://localhost:8080', key: '' }
    },
    calibreweb: {
      name: 'Calibre-Web',
      href: 'http://localhost:8083',
      description: 'Web-based e-book reader',
      icon: 'calibreweb',
      widget: { type: 'calibreweb', url: 'http://localhost:8083', key: '' }
    },
    photoprism: {
      name: 'PhotoPrism',
      href: 'http://localhost:2342',
      description: 'Photo management',
      icon: 'photoprism',
      widget: { type: 'photoprism', url: 'http://localhost:2342', key: '' }
    },
    immich: {
      name: 'Immich',
      href: 'http://localhost:2283',
      description: 'Photo backup',
      icon: 'immich',
      widget: { type: 'immich', url: 'http://localhost:2283', key: 'your-api-key' }
    },
    filebrowser: {
      name: 'File Browser',
      href: 'http://localhost:8080',
      description: 'Web file manager',
      icon: 'filebrowser',
      widget: { type: 'filebrowser', url: 'http://localhost:8080', key: '' }
    },
    duplicati: {
      name: 'Duplicati',
      href: 'http://localhost:8200',
      description: 'Backup software',
      icon: 'duplicati',
      widget: { type: 'duplicati', url: 'http://localhost:8200', key: '' }
    },
    syncthing: {
      name: 'Syncthing',
      href: 'http://localhost:8384',
      description: 'File synchronization',
      icon: 'syncthing',
      widget: { type: 'syncthing', url: 'http://localhost:8384', key: '' }
    },

    // System & Infrastructure
    docker: {
      name: 'Docker',
      description: 'Container platform',
      icon: 'docker',
      widget: { type: 'docker', url: 'unix:///var/run/docker.sock', key: '' }
    },
    watchtower: {
      name: 'Watchtower',
      href: 'http://localhost:8080',
      description: 'Container updater',
      icon: 'watchtower',
      widget: { type: 'watchtower', url: 'http://localhost:8080', key: '' }
    },
    prometheus: {
      name: 'Prometheus',
      href: 'http://localhost:9090',
      description: 'Monitoring system',
      icon: 'prometheus',
      widget: { type: 'prometheus', url: 'http://localhost:9090', key: '' }
    },
    influxdb: {
      name: 'InfluxDB',
      href: 'http://localhost:8086',
      description: 'Time series database',
      icon: 'influxdb',
      widget: { type: 'influxdb', url: 'http://localhost:8086', key: 'your-token' }
    },
    unifi: {
      name: 'UniFi Controller',
      href: 'https://localhost:8443',
      description: 'Network management',
      icon: 'unifi',
      widget: { type: 'unifi', url: 'https://localhost:8443', key: 'hoiber-password' }
    },
    opnsense: {
      name: 'OPNsense',
      href: 'https://localhost:443',
      description: 'Firewall & router',
      icon: 'opnsense',
      widget: { type: 'opnsense', url: 'https://localhost:443', key: 'your-api-key' }
    },
    pfsense: {
      name: 'pfSense',
      href: 'https://localhost:443',
      description: 'Firewall & router',
      icon: 'pfsense',
      widget: { type: 'pfsense', url: 'https://localhost:443', key: '' }
    },
    wireguard: {
      name: 'WireGuard',
      href: 'http://localhost:51820',
      description: 'VPN server',
      icon: 'wireguard',
      widget: { type: 'wireguard', url: 'http://localhost:51820', key: '' }
    },

    // DNS & Networking
    bind9: {
      name: 'BIND9',
      description: 'DNS server',
      icon: 'bind9'
    },
    unbound: {
      name: 'Unbound',
      href: 'http://localhost:5053',
      description: 'DNS resolver',
      icon: 'unbound',
      widget: { type: 'unbound', url: 'http://localhost:5053', key: '' }
    },

    // Storage & NAS
    truenas: {
      name: 'TrueNAS',
      href: 'https://localhost:443',
      description: 'Network attached storage',
      icon: 'truenas',
      widget: { type: 'truenas', url: 'https://localhost:443', key: 'your-api-key' }
    },
    freenas: {
      name: 'FreeNAS',
      href: 'https://localhost:443',
      description: 'Network attached storage',
      icon: 'freenas'
    },
    openmediavault: {
      name: 'OpenMediaVault',
      href: 'http://localhost:80',
      description: 'NAS solution',
      icon: 'openmediavault',
      widget: { type: 'openmediavault', url: 'http://localhost:80', key: '' }
    },

    // Backup & Recovery
    proxmoxbackupserver: {
      name: 'Proxmox Backup Server',
      href: 'https://localhost:8007',
      description: 'Enterprise backup',
      icon: 'proxmoxbackupserver',
      widget: { type: 'proxmoxbackupserver', url: 'https://localhost:8007', username: 'api_token_id', password: 'api_token_secret' }
    },

    // Databases
    postgres: {
      name: 'PostgreSQL',
      href: 'postgres://localhost:5432',
      description: 'SQL database',
      icon: 'postgres',
      widget: { type: 'postgres', url: 'postgres://localhost:5432', key: '' }
    },
    mysql: {
      name: 'MySQL',
      href: 'mysql://localhost:3306',
      description: 'SQL database',
      icon: 'mysql',
      widget: { type: 'mysql', url: 'mysql://localhost:3306', key: '' }
    },
    mariadb: {
      name: 'MariaDB',
      href: 'mysql://localhost:3306',
      description: 'SQL database',
      icon: 'mariadb'
    },
    redis: {
      name: 'Redis',
      href: 'redis://localhost:6379',
      description: 'In-memory database',
      icon: 'redis',
      widget: { type: 'redis', url: 'redis://localhost:6379', key: '' }
    },
    mongodb: {
      name: 'MongoDB',
      href: 'mongodb://localhost:27017',
      description: 'Document database',
      icon: 'mongodb',
      widget: { type: 'mongodb', url: 'mongodb://localhost:27017', key: '' }
    },

    // Knowledge & Documentation
    bookstack: {
      name: 'BookStack',
      href: 'http://localhost:8080',
      description: 'Wiki platform',
      icon: 'bookstack',
      widget: { type: 'bookstack', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    dokuwiki: {
      name: 'DokuWiki',
      href: 'http://localhost:8080',
      description: 'File-based wiki',
      icon: 'dokuwiki'
    },
    wikijs: {
      name: 'Wiki.js',
      href: 'http://localhost:3000',
      description: 'Modern wiki',
      icon: 'wikijs',
      widget: { type: 'wikijs', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    outline: {
      name: 'Outline',
      href: 'http://localhost:3000',
      description: 'Team wiki',
      icon: 'outline'
    },
    obsidian: {
      name: 'Obsidian Publish',
      href: 'http://localhost:8080',
      description: 'Knowledge management',
      icon: 'obsidian'
    },
    wallabag: {
      name: 'Wallabag',
      href: 'http://localhost:8080',
      description: 'Read-it-later service',
      icon: 'wallabag',
      widget: { type: 'wallabag', url: 'http://localhost:8080', key: 'your-api-key' }
    },

    // Communication & Collaboration
    rocket: {
      name: 'Rocket.Chat',
      href: 'http://localhost:3000',
      description: 'Team communication',
      icon: 'rocketchat'
    },
    mattermost: {
      name: 'Mattermost',
      href: 'http://localhost:8065',
      description: 'Team messaging',
      icon: 'mattermost',
      widget: { type: 'mattermost', url: 'http://localhost:8065', key: 'your-token' }
    },
    slack: {
      name: 'Slack',
      href: 'https://your-workspace.slack.com',
      description: 'Team collaboration',
      icon: 'slack'
    },
    discord: {
      name: 'Discord',
      href: 'https://discord.com',
      description: 'Voice & text chat',
      icon: 'discord'
    },
    matrix: {
      name: 'Matrix (Element)',
      href: 'http://localhost:8008',
      description: 'Decentralized chat',
      icon: 'matrix'
    },

    // Email & Mail
    mailcow: {
      name: 'Mailcow',
      href: 'https://localhost:443',
      description: 'Mail server suite',
      icon: 'mailcow',
      widget: { type: 'mailcow', url: 'https://localhost:443', key: 'your-api-key' }
    },

    // Automation & DevOps
    jenkins: {
      name: 'Jenkins',
      href: 'http://localhost:8080',
      description: 'CI/CD automation',
      icon: 'jenkins'
    },
    changedetection: {
      name: 'ChangeDetection.io',
      href: 'http://localhost:5000',
      description: 'Website change monitoring',
      icon: 'changedetectionio',
      widget: { type: 'changedetection', url: 'http://localhost:5000', key: 'your-api-key' }
    },

    // Network Testing & Monitoring
    speedtest: {
      name: 'Speedtest Tracker',
      href: 'http://localhost:80',
      description: 'Network speed testing',
      icon: 'speedtesttracker',
      widget: { type: 'speedtest', url: 'http://localhost:80', key: '' }
    },
    smokeping: {
      name: 'SmokePing',
      href: 'http://localhost:80',
      description: 'Network latency monitoring',
      icon: 'smokeping',
      widget: { type: 'smokeping', url: 'http://localhost:80', key: '' }
    },
    librespeed: {
      name: 'LibreSpeed',
      href: 'http://localhost:80',
      description: 'Speed test server',
      icon: 'librespeed'
    },
    netdata: {
      name: 'Netdata',
      href: 'http://localhost:19999',
      description: 'Real-time monitoring',
      icon: 'netdata',
      widget: { type: 'netdata', url: 'http://localhost:19999', key: '' }
    },
    zabbix: {
      name: 'Zabbix',
      href: 'http://localhost:8080',
      description: 'Infrastructure monitoring',
      icon: 'zabbix',
      widget: { type: 'zabbix', url: 'http://localhost:8080', key: 'your-token' }
    },

    // Home Automation & IoT
    zigbee2mqtt: {
      name: 'Zigbee2MQTT',
      href: 'http://localhost:8080',
      description: 'Zigbee to MQTT bridge',
      icon: 'zigbee2mqtt',
      widget: { type: 'zigbee2mqtt', url: 'http://localhost:8080', key: '' }
    },
    frigate: {
      name: 'Frigate',
      href: 'http://localhost:5000',
      description: 'NVR with object detection',
      icon: 'frigate',
      widget: { type: 'frigate', url: 'http://localhost:5000', key: '' }
    },
    motioneye: {
      name: 'motionEye',
      href: 'http://localhost:8765',
      description: 'Video surveillance',
      icon: 'motioneye'
    },
    shinobi: {
      name: 'Shinobi',
      href: 'http://localhost:8080',
      description: 'CCTV platform',
      icon: 'shinobi'
    },

    // Productivity & Lifestyle
    grocy: {
      name: 'Grocy',
      href: 'http://localhost:9283',
      description: 'Household management',
      icon: 'grocy',
      widget: { type: 'grocy', url: 'http://localhost:9283', key: 'your-api-key' }
    },
    paperlessngx: {
      name: 'Paperless-ngx',
      href: 'http://localhost:8000',
      description: 'Document management',
      icon: 'paperlessngx',
      widget: { type: 'paperlessngx', url: 'http://localhost:8000', key: 'your-token' }
    },
    tandoor: {
      name: 'Tandoor Recipes',
      href: 'http://localhost:8080',
      description: 'Recipe manager',
      icon: 'tandoorrecipes'
    },
    mealie: {
      name: 'Mealie',
      href: 'http://localhost:9925',
      description: 'Recipe manager',
      icon: 'mealie',
      widget: { type: 'mealie', url: 'http://localhost:9925', key: 'your-api-key' }
    },

    // Gaming
    minecraft: {
      name: 'Minecraft Server',
      href: 'localhost:25565',
      description: 'Minecraft game server',
      icon: 'minecraft',
      widget: { type: 'minecraft', url: 'localhost:25565', key: '' }
    },
    pterodactyl: {
      name: 'Pterodactyl',
      href: 'http://localhost:80',
      description: 'Game server management',
      icon: 'pterodactyl',
      widget: { type: 'pterodactyl', url: 'http://localhost:80', key: 'your-api-key' }
    },

    // Media Libraries & Reading
    audiobookshelf: {
      name: 'AudioBookshelf',
      href: 'http://localhost:13378',
      description: 'Audiobook & podcast server',
      icon: 'audiobookshelf',
      widget: { type: 'audiobookshelf', url: 'http://localhost:13378', key: 'your-api-key' }
    },
    kavita: {
      name: 'Kavita',
      href: 'http://localhost:5000',
      description: 'Digital library',
      icon: 'kavita',
      widget: { type: 'kavita', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    komga: {
      name: 'Komga',
      href: 'http://localhost:25600',
      description: 'Comics & manga server',
      icon: 'komga',
      widget: { type: 'komga', url: 'http://localhost:25600', key: 'your-api-key' }
    },
    tubearchivist: {
      name: 'TubeArchivist',
      href: 'http://localhost:8000',
      description: 'YouTube archiver',
      icon: 'tubearchivist',
      widget: { type: 'tubearchivist', url: 'http://localhost:8000', key: 'your-api-key' }
    },

    // Additional Media Management
    jellyseerr: {
      name: 'Jellyseerr',
      href: 'http://localhost:5055',
      description: 'Jellyfin request management',
      icon: 'jellyseerr',
      widget: { type: 'jellyseerr', url: 'http://localhost:5055', key: 'your-api-key' }
    },

    // Download Clients (Extended)
    rutorrent: {
      name: 'ruTorrent',
      href: 'http://localhost:8080',
      description: 'BitTorrent client',
      icon: 'rutorrent',
      widget: { type: 'rutorrent', url: 'http://localhost:8080', key: '' }
    },
    flood: {
      name: 'Flood',
      href: 'http://localhost:3000',
      description: 'rTorrent/qBittorrent UI',
      icon: 'flood',
      widget: { type: 'flood', url: 'http://localhost:3000', key: '' }
    },
    jdownloader: {
      name: 'JDownloader',
      href: 'http://localhost:5800',
      description: 'Download manager',
      icon: 'jdownloader',
      widget: { type: 'jdownloader', url: 'http://localhost:5800', key: '' }
    },
    pyload: {
      name: 'pyLoad',
      href: 'http://localhost:8000',
      description: 'Download manager',
      icon: 'pyload',
      widget: { type: 'pyload', url: 'http://localhost:8000', key: 'your-api-key' }
    },

    // System Monitoring (Extended)
    glances: {
      name: 'Glances',
      href: 'http://localhost:61208',
      description: 'System monitoring',
      icon: 'glances',
      widget: { type: 'glances', url: 'http://localhost:61208', key: '' }
    },
    scrutiny: {
      name: 'Scrutiny',
      href: 'http://localhost:8080',
      description: 'Hard drive monitoring',
      icon: 'scrutiny',
      widget: { type: 'scrutiny', url: 'http://localhost:8080', key: '' }
    },
    healthchecks: {
      name: 'Healthchecks',
      href: 'http://localhost:8000',
      description: 'Cron job monitoring',
      icon: 'healthchecks',
      widget: { type: 'healthchecks', url: 'http://localhost:8000', key: 'your-api-key' }
    },
    watchtower: {
      name: 'Watchtower',
      href: 'http://localhost:8080',
      description: 'Container auto-updater',
      icon: 'watchtower',
      widget: { type: 'watchtower', url: 'http://localhost:8080', key: '' }
    },
    gatus: {
      name: 'Gatus',
      href: 'http://localhost:8080',
      description: 'Service status page',
      icon: 'gatus',
      widget: { type: 'gatus', url: 'http://localhost:8080', key: '' }
    },

    // VPN & Tunneling (Extended)
    cloudflared: {
      name: 'Cloudflare Tunnel',
      href: 'http://localhost:8080',
      description: 'Secure tunnel service',
      icon: 'cloudflare',
      widget: { type: 'cloudflared', url: 'http://localhost:8080', key: 'your-account-id' }
    },
    tailscale: {
      name: 'Tailscale',
      href: 'http://localhost:8080',
      description: 'Zero-config VPN',
      icon: 'tailscale',
      widget: { type: 'tailscale', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    headscale: {
      name: 'Headscale',
      href: 'http://localhost:8080',
      description: 'Self-hosted Tailscale controller',
      icon: 'headscale',
      widget: { type: 'headscale', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    gluetun: {
      name: 'Gluetun',
      href: 'http://localhost:8080',
      description: 'VPN client container',
      icon: 'gluetun',
      widget: { type: 'gluetun', url: 'http://localhost:8080', key: '' }
    },

    // Additional Monitoring & Analytics
    beszel: {
      name: 'Beszel',
      href: 'http://localhost:8090',
      description: 'Server monitoring',
      icon: 'beszel',
      widget: { type: 'beszel', url: 'http://localhost:8090', key: 'your-api-key' }
    },
    checkmk: {
      name: 'Checkmk',
      href: 'http://localhost:5000',
      description: 'Infrastructure monitoring',
      icon: 'checkmk',
      widget: { type: 'checkmk', url: 'http://localhost:5000', key: 'your-api-key' }
    },

    // Smart Home Extended
    esphome: {
      name: 'ESPHome',
      href: 'http://localhost:6052',
      description: 'ESP device management',
      icon: 'esphome',
      widget: { type: 'esphome', url: 'http://localhost:6052', key: '' }
    },
    homebridge: {
      name: 'Homebridge',
      href: 'http://localhost:8581',
      description: 'HomeKit bridge',
      icon: 'homebridge',
      widget: { type: 'homebridge', url: 'http://localhost:8581', key: 'your-api-key' }
    },
    evcc: {
      name: 'EVCC',
      href: 'http://localhost:7070',
      description: 'EV charging controller',
      icon: 'evcc',
      widget: { type: 'evcc', url: 'http://localhost:7070', key: '' }
    },

    // Development & Version Control
    gitlab: {
      name: 'GitLab',
      href: 'http://localhost:80',
      description: 'Git repository management',
      icon: 'gitlab',
      widget: { type: 'gitlab', url: 'http://localhost:80', key: 'your-api-key' }
    },
    github: {
      name: 'GitHub',
      href: 'https://github.com',
      description: 'Code hosting platform',
      icon: 'github'
    },
    gotify: {
      name: 'Gotify',
      href: 'http://localhost:80',
      description: 'Push notification server',
      icon: 'gotify',
      widget: { type: 'gotify', url: 'http://localhost:80', key: 'your-api-key' }
    },

    // Social & Communication Extended
    mastodon: {
      name: 'Mastodon',
      href: 'http://localhost:3000',
      description: 'Decentralized social network',
      icon: 'mastodon',
      widget: { type: 'mastodon', url: 'http://localhost:3000', key: 'your-api-key' }
    },

    // Backup Solutions Extended
    kopia: {
      name: 'Kopia',
      href: 'http://localhost:51515',
      description: 'Cross-platform backup',
      icon: 'kopia',
      widget: { type: 'kopia', url: 'http://localhost:51515', key: '' }
    },
    urbackup: {
      name: 'UrBackup',
      href: 'http://localhost:55414',
      description: 'Client/server backup system',
      icon: 'urbackup',
      widget: { type: 'urbackup', url: 'http://localhost:55414', key: '' }
    },

    // Bookmarks & Link Management
    linkwarden: {
      name: 'LinkWarden',
      href: 'http://localhost:3000',
      description: 'Bookmark manager',
      icon: 'linkwarden',
      widget: { type: 'linkwarden', url: 'http://localhost:3000', key: 'your-api-key' }
    },

    // RSS & News
    miniflux: {
      name: 'Miniflux',
      href: 'http://localhost:8080',
      description: 'RSS reader',
      icon: 'miniflux',
      widget: { type: 'miniflux', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    freshrss: {
      name: 'FreshRSS',
      href: 'http://localhost:8080',
      description: 'RSS aggregator',
      icon: 'freshrss',
      widget: { type: 'freshrss', url: 'http://localhost:8080', key: 'your-api-key' }
    },

    // Financial Management
    firefly: {
      name: 'Firefly III',
      href: 'http://localhost:8080',
      description: 'Personal finance manager',
      icon: 'fireflyiii',
      widget: { type: 'firefly', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    ghostfolio: {
      name: 'Ghostfolio',
      href: 'http://localhost:3333',
      description: 'Portfolio tracker',
      icon: 'ghostfolio',
      widget: { type: 'ghostfolio', url: 'http://localhost:3333', key: 'your-api-key' }
    },

    // Security
    crowdsec: {
      name: 'CrowdSec',
      href: 'http://localhost:8080',
      description: 'Behavioral detection engine',
      icon: 'crowdsec',
      widget: { type: 'crowdsec', url: 'http://localhost:8080', key: 'your-api-key' }
    },

    // Project Management & Productivity
    vikunja: {
      name: 'Vikunja',
      href: 'http://localhost:3456',
      description: 'Task management',
      icon: 'vikunja',
      widget: { type: 'vikunja', url: 'http://localhost:3456', key: 'your-api-key' }
    },

    // Video Processing
    tdarr: {
      name: 'Tdarr',
      href: 'http://localhost:8265',
      description: 'Media transcoding',
      icon: 'tdarr',
      widget: { type: 'tdarr', url: 'http://localhost:8265', key: '' }
    },
    unmanic: {
      name: 'Unmanic',
      href: 'http://localhost:8888',
      description: 'Media transcoding',
      icon: 'unmanic',
      widget: { type: 'unmanic', url: 'http://localhost:8888', key: '' }
    },
    fileflows: {
      name: 'FileFlows',
      href: 'http://localhost:5000',
      description: 'File processing automation',
      icon: 'fileflows',
      widget: { type: 'fileflows', url: 'http://localhost:5000', key: '' }
    },

    // NAS Solutions Extended
    diskstation: {
      name: 'Synology DSM',
      href: 'http://localhost:5000',
      description: 'Synology NAS interface',
      icon: 'synology',
      widget: { type: 'diskstation', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    qnap: {
      name: 'QNAP QTS',
      href: 'http://localhost:8080',
      description: 'QNAP NAS interface',
      icon: 'qnap',
      widget: { type: 'qnap', url: 'http://localhost:8080', key: 'your-api-key' }
    },

    // Password & Identity Management
    vaultwarden: {
      name: 'Vaultwarden',
      href: 'http://localhost:80',
      description: 'Password manager',
      icon: 'vaultwarden',
      widget: { type: 'vaultwarden', url: 'http://localhost:80', key: '' }
    },

    // 3D Printing
    moonraker: {
      name: 'Moonraker',
      href: 'http://localhost:7125',
      description: 'Klipper API server',
      icon: 'moonraker',
      widget: { type: 'moonraker', url: 'http://localhost:7125', key: '' }
    },
    octoprint: {
      name: 'OctoPrint',
      href: 'http://localhost:5000',
      description: '3D printer controller',
      icon: 'octoprint',
      widget: { type: 'octoprint', url: 'http://localhost:5000', key: 'your-api-key' }
    }
  };
  
  return _commonServices;
};

// For backward compatibility, but prefer getCommonServices() for better performance
export const commonServices = new Proxy({}, {
  get(target, prop) {
    return getCommonServices()[prop];
  },
  has(target, prop) {
    return prop in getCommonServices();
  },
  ownKeys() {
    return Object.keys(getCommonServices());
  }
});

// Service categories for better organization
export const SERVICE_CATEGORIES = {
  MEDIA: 'Media & Streaming',
  INFRASTRUCTURE: 'Infrastructure & Networking', 
  DOWNLOAD: 'Download Clients',
  AUTOMATION: 'Automation & Management',
  MONITORING: 'Monitoring & Analytics',
  PRODUCTIVITY: 'Productivity & Tools',
  SECURITY: 'Security & VPN'
};

// Get services by category
export const getServicesByCategory = (category) => {
  const services = getCommonServices();
  // This is a simplified categorization - in a real app you'd have proper categorization
  const mediaServices = ['plex', 'jellyfin', 'emby', 'sonarr', 'radarr', 'lidarr'];
  const infraServices = ['portainer', 'traefik', 'proxmox', 'truenas'];
  // ... etc
  
  switch(category) {
    case SERVICE_CATEGORIES.MEDIA:
      return Object.fromEntries(
        mediaServices.map(key => [key, services[key]]).filter(([, service]) => service)
      );
    case SERVICE_CATEGORIES.INFRASTRUCTURE:
      return Object.fromEntries(
        infraServices.map(key => [key, services[key]]).filter(([, service]) => service)
      );
    default:
      return services;
  }
};