
import { useState, useEffect } from 'react';
import { Plus, Download, Trash2, Copy, Home, Settings, Upload, ChevronUp, ChevronDown, ChevronRight, List, Cog, Info, CloudUpload, CloudDownload } from 'lucide-react';

const HomepageConfigGUI = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [selectedQuickAdd, setSelectedQuickAdd] = useState({});
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  
  // Live update functionality
  const [liveUpdateConfig, setLiveUpdateConfig] = useState({
    enabled: false,
    configPath: '',
    status: 'unknown'
  });
  // eslint-disable-next-line no-unused-vars
  const [backupFiles, setBackupFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const commonServices = {
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
      description: 'Monitoring dashboards',
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
      icon: 'uptime-kuma',
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
      description: 'Media request management',
      icon: 'overseerr',
      widget: { type: 'overseerr', url: 'http://localhost:5055', key: 'your-api-key' }
    },
    adguard: {
      name: 'AdGuard Home',
      href: 'http://localhost:3000',
      description: 'Network-wide ad blocking',
      icon: 'adguard-home',
      widget: { type: 'adguard', url: 'http://localhost:3000', key: '' }
    },
    nginxpm: {
      name: 'Nginx Proxy Manager',
      href: 'http://localhost:81',
      description: 'Reverse proxy management',
      icon: 'nginx-proxy-manager',
      widget: { type: 'npm', url: 'http://localhost:81', key: '' }
    },
    nextcloud: {
      name: 'Nextcloud',
      href: 'http://localhost:8080',
      description: 'Personal cloud storage',
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
      description: 'Media request platform',
      icon: 'ombi',
      widget: { type: 'ombi', url: 'http://localhost:3579', key: 'your-api-key' }
    },
    pihole: {
      name: 'Pi-hole',
      href: 'http://localhost:80/admin',
      description: 'Network-wide ad blocking',
      icon: 'pi-hole',
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
      description: 'Torrent indexer proxy',
      icon: 'jackett',
      widget: { type: 'jackett', url: 'http://localhost:9117', key: 'your-api-key' }
    },
    flaresolverr: {
      name: 'FlareSolverr',
      href: 'http://localhost:8191',
      description: 'Cloudflare solver proxy',
      icon: 'flaresolverr',
      widget: null
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
      description: 'Web interface for Calibre',
      icon: 'calibre-web',
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
      description: 'Photo and video backup',
      icon: 'immich',
      widget: { type: 'immich', url: 'http://localhost:2283', key: 'your-api-key' }
    },
    filebrowser: {
      name: 'File Browser',
      href: 'http://localhost:8080',
      description: 'Web-based file manager',
      icon: 'filebrowser',
      widget: { type: 'filebrowser', url: 'http://localhost:8080', key: '' }
    },
    duplicati: {
      name: 'Duplicati',
      href: 'http://localhost:8200',
      description: 'Backup solution',
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
    code: {
      name: 'VS Code Server',
      href: 'http://localhost:8080',
      description: 'Web-based code editor',
      icon: 'code-server',
      widget: null
    },
    docker: {
      name: 'Docker',
      href: 'http://localhost:2375',
      description: 'Container engine',
      icon: 'docker',
      widget: { type: 'docker', url: 'unix:///var/run/docker.sock', key: '' }
    },
    yacht: {
      name: 'Yacht',
      href: 'http://localhost:8000',
      description: 'Docker web UI',
      icon: 'yacht',
      widget: null
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
      description: 'Firewall and router',
      icon: 'opnsense',
      widget: { type: 'opnsense', url: 'https://localhost:443', key: 'your-api-key' }
    },
    pfsense: {
      name: 'pfSense',
      href: 'https://localhost:443',
      description: 'Firewall and router',
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
    openvpn: {
      name: 'OpenVPN',
      href: 'http://localhost:943',
      description: 'VPN server',
      icon: 'openvpn',
      widget: null
    },
    unbound: {
      name: 'Unbound',
      href: 'http://localhost:5053',
      description: 'DNS resolver',
      icon: 'unbound',
      widget: { type: 'unbound', url: 'http://localhost:5053', key: '' }
    },
    bind9: {
      name: 'BIND9',
      href: 'http://localhost:953',
      description: 'DNS server',
      icon: 'bind9',
      widget: null
    },
    truenas: {
      name: 'TrueNAS',
      href: 'https://localhost:443',
      description: 'Network storage',
      icon: 'truenas',
      widget: { type: 'truenas', url: 'https://localhost:443', key: 'your-api-key' }
    },
    freenas: {
      name: 'FreeNAS',
      href: 'https://localhost:443',
      description: 'Network storage',
      icon: 'freenas',
      widget: null
    },
    omv: {
      name: 'OpenMediaVault',
      href: 'http://localhost:80',
      description: 'NAS solution',
      icon: 'openmediavault',
      widget: { type: 'openmediavault', url: 'http://localhost:80', key: '' }
    },
    proxmox: {
      name: 'Proxmox',
      href: 'https://localhost:8006',
      description: 'Virtualization platform',
      icon: 'proxmox',
      widget: null,
      proxmoxNode: 'pve',
      proxmoxVMID: 101,
      proxmoxType: 'qemu'
    },
    proxmoxbackupserver: {
      name: 'Proxmox Backup Server',
      href: 'https://localhost:8007',
      description: 'Backup solution',
      icon: 'proxmox',
      widget: { type: 'proxmoxbackupserver', url: 'https://localhost:8007', username: 'api_token_id', password: 'api_token_secret' }
    },
    postgres: {
      name: 'PostgreSQL',
      href: 'http://localhost:5432',
      description: 'Database server',
      icon: 'postgres',
      widget: { type: 'postgres', url: 'postgres://localhost:5432', key: '' }
    },
    mysql: {
      name: 'MySQL',
      href: 'http://localhost:3306',
      description: 'Database server',
      icon: 'mysql',
      widget: { type: 'mysql', url: 'mysql://localhost:3306', key: '' }
    },
    phpmyadmin: {
      name: 'phpMyAdmin',
      href: 'http://localhost:8080',
      description: 'MySQL web interface',
      icon: 'phpmyadmin',
      widget: null
    },
    pgadmin: {
      name: 'pgAdmin',
      href: 'http://localhost:5050',
      description: 'PostgreSQL web interface',
      icon: 'pgadmin',
      widget: null
    },
    redis: {
      name: 'Redis',
      href: 'http://localhost:6379',
      description: 'In-memory database',
      icon: 'redis',
      widget: { type: 'redis', url: 'redis://localhost:6379', key: '' }
    },
    mongodb: {
      name: 'MongoDB',
      href: 'http://localhost:27017',
      description: 'NoSQL database',
      icon: 'mongodb',
      widget: { type: 'mongodb', url: 'mongodb://localhost:27017', key: '' }
    },
    bookstack: {
      name: 'BookStack',
      href: 'http://localhost:8080',
      description: 'Wiki platform',
      icon: 'bookstack',
      widget: { type: 'bookstack', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    outline: {
      name: 'Outline',
      href: 'http://localhost:3000',
      description: 'Team wiki',
      icon: 'outline',
      widget: null
    },
    wikijs: {
      name: 'Wiki.js',
      href: 'http://localhost:3000',
      description: 'Modern wiki app',
      icon: 'wikijs',
      widget: { type: 'wikijs', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    joplin: {
      name: 'Joplin Server',
      href: 'http://localhost:22300',
      description: 'Note taking sync',
      icon: 'joplin',
      widget: null
    },
    trilium: {
      name: 'Trilium',
      href: 'http://localhost:8080',
      description: 'Hierarchical note taking',
      icon: 'trilium',
      widget: null
    },
    wallabag: {
      name: 'Wallabag',
      href: 'http://localhost:8080',
      description: 'Read-it-later app',
      icon: 'wallabag',
      widget: { type: 'wallabag', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    shiori: {
      name: 'Shiori',
      href: 'http://localhost:8080',
      description: 'Bookmark manager',
      icon: 'shiori',
      widget: null
    },
    mattermost: {
      name: 'Mattermost',
      href: 'http://localhost:8065',
      description: 'Team communication',
      icon: 'mattermost',
      widget: { type: 'mattermost', url: 'http://localhost:8065', key: 'your-token' }
    },
    rocket: {
      name: 'Rocket.Chat',
      href: 'http://localhost:3000',
      description: 'Team chat platform',
      icon: 'rocketchat',
      widget: null
    },
    matrix: {
      name: 'Matrix Synapse',
      href: 'http://localhost:8008',
      description: 'Decentralized chat',
      icon: 'matrix',
      widget: null
    },
    element: {
      name: 'Element',
      href: 'http://localhost:8080',
      description: 'Matrix web client',
      icon: 'element',
      widget: null
    },
    mailcow: {
      name: 'Mailcow',
      href: 'https://localhost:443',
      description: 'Mail server suite',
      icon: 'mailcow',
      widget: { type: 'mailcow', url: 'https://localhost:443', key: 'your-api-key' }
    },
    roundcube: {
      name: 'Roundcube',
      href: 'http://localhost:8080',
      description: 'Webmail interface',
      icon: 'roundcube',
      widget: null
    },
    changedetection: {
      name: 'ChangeDetection',
      href: 'http://localhost:5000',
      description: 'Website change monitor',
      icon: 'changedetection-io',
      widget: { type: 'changedetection', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    upsnap: {
      name: 'Upsnap',
      href: 'http://localhost:8090',
      description: 'Network scanner',
      icon: 'upsnap',
      widget: null
    },
    speedtest: {
      name: 'LibreSpeed',
      href: 'http://localhost:80',
      description: 'Internet speed test',
      icon: 'librespeed',
      widget: { type: 'speedtest', url: 'http://localhost:80', key: '' }
    },
    smokeping: {
      name: 'SmokePing',
      href: 'http://localhost:80',
      description: 'Network latency monitor',
      icon: 'smokeping',
      widget: { type: 'smokeping', url: 'http://localhost:80', key: '' }
    },
    ntopng: {
      name: 'ntopng',
      href: 'http://localhost:3000',
      description: 'Network traffic monitor',
      icon: 'ntopng',
      widget: null
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
      description: 'Network monitoring',
      icon: 'zabbix',
      widget: { type: 'zabbix', url: 'http://localhost:8080', key: 'your-token' }
    },
    nodered: {
      name: 'Node-RED',
      href: 'http://localhost:1880',
      description: 'Flow-based programming',
      icon: 'nodered',
      widget: null
    },
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
      description: 'NVR with AI detection',
      icon: 'frigate',
      widget: { type: 'frigate', url: 'http://localhost:5000', key: '' }
    },
    motioneye: {
      name: 'motionEye',
      href: 'http://localhost:8765',
      description: 'Video surveillance',
      icon: 'motioneye',
      widget: null
    },
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
      icon: 'paperless',
      widget: { type: 'paperlessngx', url: 'http://localhost:8000', key: 'your-token' }
    },
    recipes: {
      name: 'Tandoor Recipes',
      href: 'http://localhost:8080',
      description: 'Recipe manager',
      icon: 'tandoor',
      widget: null
    },
    mealie: {
      name: 'Mealie',
      href: 'http://localhost:9925',
      description: 'Recipe manager',
      icon: 'mealie',
      widget: { type: 'mealie', url: 'http://localhost:9925', key: 'your-api-key' }
    },
    minecraft: {
      name: 'Minecraft Server',
      href: 'http://localhost:25565',
      description: 'Game server',
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
    // Additional Media & Content Management
    audiobookshelf: {
      name: 'AudioBookshelf',
      href: 'http://localhost:13378',
      description: 'Audiobook and podcast server',
      icon: 'audiobookshelf',
      widget: { type: 'audiobookshelf', url: 'http://localhost:13378', key: 'your-api-key' }
    },
    kavita: {
      name: 'Kavita',
      href: 'http://localhost:5000',
      description: 'Digital library for comics/manga',
      icon: 'kavita',
      widget: { type: 'kavita', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    komga: {
      name: 'Komga',
      href: 'http://localhost:25600',
      description: 'Media server for comics/mangas/BDs',
      icon: 'komga',
      widget: { type: 'komga', url: 'http://localhost:25600', key: 'your-api-key' }
    },
    tubearchivist: {
      name: 'TubeArchivist',
      href: 'http://localhost:8000',
      description: 'YouTube archival made simple',
      icon: 'tubearchivist',
      widget: { type: 'tubearchivist', url: 'http://localhost:8000', key: 'your-api-key' }
    },
    // Request Management
    jellyseerr: {
      name: 'Jellyseerr',
      href: 'http://localhost:5055',
      description: 'Media request management for Jellyfin',
      icon: 'jellyseerr',
      widget: { type: 'jellyseerr', url: 'http://localhost:5055', key: 'your-api-key' }
    },
    // Additional Download Clients
    rutorrent: {
      name: 'ruTorrent',
      href: 'http://localhost:8080',
      description: 'Web interface for rTorrent',
      icon: 'rutorrent',
      widget: { type: 'rutorrent', url: 'http://localhost:8080', key: '' }
    },
    flood: {
      name: 'Flood',
      href: 'http://localhost:3000',
      description: 'Modern web UI for rTorrent',
      icon: 'flood',
      widget: { type: 'flood', url: 'http://localhost:3000', key: '' }
    },
    jdownloader: {
      name: 'JDownloader',
      href: 'http://localhost:5800',
      description: 'Download management tool',
      icon: 'jdownloader',
      widget: { type: 'jdownloader', url: 'http://localhost:5800', key: '' }
    },
    pyload: {
      name: 'pyLoad',
      href: 'http://localhost:8000',
      description: 'Free and open source download manager',
      icon: 'pyload',
      widget: { type: 'pyload', url: 'http://localhost:8000', key: 'your-api-key' }
    },
    // System Monitoring & Management
    glances: {
      name: 'Glances',
      href: 'http://localhost:61208',
      description: 'System monitoring tool',
      icon: 'glances',
      widget: { type: 'glances', url: 'http://localhost:61208', key: '' }
    },
    scrutiny: {
      name: 'Scrutiny',
      href: 'http://localhost:8080',
      description: 'Hard drive health dashboard',
      icon: 'scrutiny',
      widget: { type: 'scrutiny', url: 'http://localhost:8080', key: '' }
    },
    healthchecks: {
      name: 'Healthchecks.io',
      href: 'http://localhost:8000',
      description: 'Cron job monitoring',
      icon: 'healthchecks',
      widget: { type: 'healthchecks', url: 'http://localhost:8000', key: 'your-api-key' }
    },
    watchtower: {
      name: 'Watchtower',
      href: 'http://localhost:8080',
      description: 'Auto-update containers',
      icon: 'watchtower',
      widget: { type: 'watchtower', url: 'http://localhost:8080', key: '' }
    },
    gatus: {
      name: 'Gatus',
      href: 'http://localhost:8080',
      description: 'Automated service health dashboard',
      icon: 'gatus',
      widget: { type: 'gatus', url: 'http://localhost:8080', key: '' }
    },
    // Networking & VPN
    cloudflared: {
      name: 'Cloudflared',
      href: 'http://localhost:8080',
      description: 'Cloudflare tunnel',
      icon: 'cloudflared',
      widget: { type: 'cloudflared', url: 'http://localhost:8080', key: 'your-account-id' }
    },
    tailscale: {
      name: 'Tailscale',
      href: 'http://localhost:8080',
      description: 'VPN service',
      icon: 'tailscale',
      widget: { type: 'tailscale', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    headscale: {
      name: 'Headscale',
      href: 'http://localhost:8080',
      description: 'Self-hosted Tailscale control server',
      icon: 'headscale',
      widget: { type: 'headscale', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    gluetun: {
      name: 'Gluetun',
      href: 'http://localhost:8080',
      description: 'VPN client in a thin Docker container',
      icon: 'gluetun',
      widget: { type: 'gluetun', url: 'http://localhost:8080', key: '' }
    },
    // Additional Monitoring Tools
    beszel: {
      name: 'Beszel',
      href: 'http://localhost:8090',
      description: 'Lightweight server monitoring',
      icon: 'beszel',
      widget: { type: 'beszel', url: 'http://localhost:8090', key: 'your-api-key' }
    },
    checkmk: {
      name: 'Checkmk',
      href: 'http://localhost:5000',
      description: 'IT infrastructure monitoring',
      icon: 'checkmk',
      widget: { type: 'checkmk', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    // Home Automation Extensions
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
      description: 'DevOps platform',
      icon: 'gitlab',
      widget: { type: 'gitlab', url: 'http://localhost:80', key: 'your-api-key' }
    },
    // Communication & Notifications
    gotify: {
      name: 'Gotify',
      href: 'http://localhost:80',
      description: 'Self-hosted push notifications',
      icon: 'gotify',
      widget: { type: 'gotify', url: 'http://localhost:80', key: 'your-api-key' }
    },
    mastodon: {
      name: 'Mastodon',
      href: 'http://localhost:3000',
      description: 'Decentralized social network',
      icon: 'mastodon',
      widget: { type: 'mastodon', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    // Additional Storage & Backup
    kopia: {
      name: 'Kopia',
      href: 'http://localhost:51515',
      description: 'Cross-platform backup tool',
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
    // Additional Web Apps
    linkwarden: {
      name: 'LinkWarden',
      href: 'http://localhost:3000',
      description: 'Bookmark manager',
      icon: 'linkwarden',
      widget: { type: 'linkwarden', url: 'http://localhost:3000', key: 'your-api-key' }
    },
    miniflux: {
      name: 'Miniflux',
      href: 'http://localhost:8080',
      description: 'Minimalist RSS reader',
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
    // Finance & Personal Management
    firefly: {
      name: 'Firefly III',
      href: 'http://localhost:8080',
      description: 'Personal finance manager',
      icon: 'firefly',
      widget: { type: 'firefly', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    ghostfolio: {
      name: 'Ghostfolio',
      href: 'http://localhost:3333',
      description: 'Portfolio tracker',
      icon: 'ghostfolio',
      widget: { type: 'ghostfolio', url: 'http://localhost:3333', key: 'your-api-key' }
    },
    // Additional Security
    crowdsec: {
      name: 'CrowdSec',
      href: 'http://localhost:8080',
      description: 'Collaborative security',
      icon: 'crowdsec',
      widget: { type: 'crowdsec', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    // Task & Project Management
    vikunja: {
      name: 'Vikunja',
      href: 'http://localhost:3456',
      description: 'To-do app & project management',
      icon: 'vikunja',
      widget: { type: 'vikunja', url: 'http://localhost:3456', key: 'your-api-key' }
    },
    // Media Processing
    tdarr: {
      name: 'Tdarr',
      href: 'http://localhost:8265',
      description: 'Audio/video library transcoding',
      icon: 'tdarr',
      widget: { type: 'tdarr', url: 'http://localhost:8265', key: '' }
    },
    unmanic: {
      name: 'Unmanic',
      href: 'http://localhost:8888',
      description: 'Library optimizer',
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
    // Additional NAS & Storage
    diskstation: {
      name: 'Synology DiskStation',
      href: 'http://localhost:5000',
      description: 'Synology NAS management',
      icon: 'diskstation',
      widget: { type: 'diskstation', url: 'http://localhost:5000', key: 'your-api-key' }
    },
    qnap: {
      name: 'QNAP',
      href: 'http://localhost:8080',
      description: 'QNAP NAS management',
      icon: 'qnap',
      widget: { type: 'qnap', url: 'http://localhost:8080', key: 'your-api-key' }
    },
    // Password & Identity Management
    vaultwarden: {
      name: 'Vaultwarden',
      href: 'http://localhost:80',
      description: 'Password manager',
      icon: 'bitwarden',
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
      description: '3D printer web interface',
      icon: 'octoprint',
      widget: { type: 'octoprint', url: 'http://localhost:5000', key: 'your-api-key' }
    }
  };

  const [config, setConfig] = useState({
    groups: [
      {
        id: 'group1',
        name: 'Development',
        services: [
          {
            id: 'service1',
            name: 'GitLab',
            href: 'http://localhost:8080',
            description: 'Git repository management',
            icon: 'gitlab',
            widget: null,
            ping: null
          }
        ],
        subgroups: []
      }
    ]
  });

  const [settingsConfig, setSettingsConfig] = useState({
    title: 'Homepage',
    favicon: '',
    theme: 'dark',
    color: 'slate',
    headerStyle: 'boxed',
    hideVersion: false,
    language: 'en',
    target: '_blank',
    quickLaunch: {
      searchDescriptions: true,
      hideInternetSearch: false,
      hideVisitURL: false
    },
    layout: {},
    providers: {
      openweathermap: '',
      weatherapi: ''
    }
  });

  const [editingGroup, setEditingGroup] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [collapsedServices, setCollapsedServices] = useState({});
  
  // UI preferences (load from localStorage)
  const [uiPreferences, setUiPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('homepage-config-gui-preferences');
      return saved ? JSON.parse(saved) : { 
        showProxmoxTab: false,
        globalDomain: 'local'
      };
    } catch (error) {
      return { 
        showProxmoxTab: false,
        globalDomain: 'local'
      };
    }
  });

  // Save UI preferences to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('homepage-config-gui-preferences', JSON.stringify(uiPreferences));
    } catch (error) {
      console.warn('Failed to save UI preferences to localStorage:', error);
    }
  }, [uiPreferences]);

  // Helper to generate service URL with domain pattern
  const generateServiceUrl = (serviceName, port, protocol = 'http') => {
    const domain = uiPreferences.globalDomain || 'local';
    const cleanName = serviceName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const baseUrl = `${protocol}://${cleanName}.${domain}`;
    return port ? `${baseUrl}:${port}` : baseUrl;
  };

  // Helper to update service URL based on name change
  const updateServiceUrl = (service, newName) => {
    const cleanName = newName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const domain = uiPreferences.globalDomain || 'local';
    return `http://${cleanName}.${domain}`;
  };

  // Function to update all service URLs based on current domain
  const updateAllServiceUrls = () => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => ({
        ...group,
        services: group.services.map(service => ({
          ...service,
          href: updateServiceUrl(null, service.name)
        })),
        subgroups: (group.subgroups || []).map(subgroup => ({
          ...subgroup,
          services: subgroup.services.map(service => ({
            ...service,
            href: updateServiceUrl(null, service.name)
          }))
        }))
      }))
    }));
  };

  // Information widgets configuration
  const [informationWidgets, setInformationWidgets] = useState({
    widgets: [
      {
        id: 'widget1',
        type: 'datetime',
        enabled: true,
        options: {
          format: {
            timeStyle: 'short',
            dateStyle: 'short'
          },
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }
    ]
  });

  // Proxmox configuration
  const [proxmoxConfig, setProxmoxConfig] = useState({
    enabled: false,
    url: 'https://proxmox.example.com:8006',
    username: 'api_token_id',
    password: 'api_token_secret',
    nodes: [
      {
        id: 'node1',
        name: 'pve',
        enabled: true
      }
    ],
    vms: [
      {
        id: 'vm1',
        name: 'Example VM',
        vmid: 101,
        node: 'pve',
        type: 'qemu',
        enabled: true
      }
    ]
  });

  // Live update API functions
  const checkLiveUpdateStatus = async () => {
    try {
      const response = await fetch('/api/config/status');
      const data = await response.json();
      setLiveUpdateConfig({
        enabled: data.liveUpdates,
        configPath: data.configPath,
        status: response.ok ? 'connected' : 'error',
        files: data.files
      });
      return data;
    } catch (error) {
      setLiveUpdateConfig(prev => ({ ...prev, status: 'disconnected' }));
      return null;
    }
  };

  const loadConfigFromServer = async (type) => {
    if (!liveUpdateConfig.enabled) return false;
    
    try {
      setIsLoading(true);
      const response = await fetch(`/api/config/${type}`);
      
      if (response.status === 404) {
        // File doesn't exist yet, that's okay
        return true;
      }
      
      if (!response.ok) {
        throw new Error(`Failed to load ${type} configuration`);
      }
      
      const data = await response.json();
      
      // Parse and apply the loaded YAML content
      if (data.content) {
        try {
          const parsed = parseYAML(data.content);
          if (type === 'services' && parsed.services) {
            setConfig({ groups: parsed.services });
          } else if (type === 'settings') {
            setSettingsConfig(prev => ({ ...prev, ...parsed }));
          } else if (type === 'widgets') {
            if (parsed.widgets) {
              setInformationWidgets({ widgets: parsed.widgets });
            }
          } else if (type === 'proxmox') {
            if (parsed.proxmox) {
              setProxmoxConfig(prev => ({ ...prev, ...parsed.proxmox }));
            }
          }
          setImportSuccess(`Loaded ${type} configuration from server`);
          setImportError('');
        } catch (parseError) {
          setImportError(`Failed to parse ${type} configuration: ${parseError.message}`);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      setImportError(`Failed to load ${type} configuration: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfigToServer = async (type) => {
    if (!liveUpdateConfig.enabled) return false;
    
    try {
      setIsLoading(true);
      let content;
      
      if (type === 'services') {
        content = generateYAML();
      } else if (type === 'settings') {
        content = generateSettingsYAML();
      } else if (type === 'widgets') {
        content = generateWidgetsYAML();
      } else if (type === 'proxmox') {
        content = generateProxmoxYAML();
      }
      
      if (!content || content.trim() === '# No configuration yet') {
        setImportError(`No ${type} configuration to save`);
        return false;
      }
      
      const response = await fetch(`/api/config/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to save ${type} configuration`);
      }
      
      const data = await response.json();
      setImportSuccess(`Saved ${type} configuration to ${data.path}`);
      setImportError('');
      
      // Refresh backup list
      loadBackupList(type);
      
      return true;
    } catch (error) {
      setImportError(`Failed to save ${type} configuration: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loadBackupList = async (type) => {
    if (!liveUpdateConfig.enabled) return;
    
    try {
      const response = await fetch(`/api/config/${type}/backups`);
      if (response.ok) {
        const backups = await response.json();
        setBackupFiles(backups);
      }
    } catch (error) {
      console.error('Failed to load backup list:', error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const deleteBackup = async (type, timestamp) => {
    if (!liveUpdateConfig.enabled) return false;
    
    try {
      const response = await fetch(`/api/config/${type}/backup/${timestamp}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setImportSuccess('Backup deleted successfully');
        loadBackupList(type); // Refresh list
        return true;
      } else {
        const errorData = await response.json();
        setImportError(errorData.error || 'Failed to delete backup');
        return false;
      }
    } catch (error) {
      setImportError(`Failed to delete backup: ${error.message}`);
      return false;
    }
  };

  // Check live update status on component mount
  useEffect(() => {
    checkLiveUpdateStatus();
  }, []);

  const addGroup = () => {
    const newGroup = {
      id: `group${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      name: 'New Group',
      services: [],
      subgroups: []
    };
    setConfig(prev => ({
      ...prev,
      groups: [...prev.groups, newGroup]
    }));
    setEditingGroup(newGroup.id);
  };

  const addService = (groupId, quickService = null) => {
    const newService = quickService ? {
      id: `service${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      ...quickService,
      href: quickService.href.includes('localhost') 
        ? quickService.href.replace('http://localhost', generateServiceUrl(quickService.name, '').replace(/:[^:]*$/, ''))
        : quickService.href,
      widget: quickService.widget && quickService.widget.url && quickService.widget.url.includes('localhost')
        ? {
            ...quickService.widget,
            url: quickService.widget.url.replace('http://localhost', generateServiceUrl(quickService.name, '').replace(/:[^:]*$/, ''))
          }
        : quickService.widget,
      // Auto-enable Proxmox configuration for predefined Proxmox services
      enableProxmox: quickService.name.toLowerCase() === 'proxmox' ? true : quickService.enableProxmox
    } : {
      id: `service${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      name: 'New Service',
      href: updateServiceUrl(null, 'newservice'),
      description: '',
      icon: '',
      widget: null,
      ping: null
    };
    
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === groupId
          ? { ...group, services: [...group.services, newService] }
          : group
      )
    }));
    if (!quickService) setEditingService(newService.id);
  };

  const quickAddService = (groupId) => {
    const selectedService = selectedQuickAdd[groupId];
    if (selectedService && commonServices[selectedService]) {
      addService(groupId, commonServices[selectedService]);
      setSelectedQuickAdd(prev => ({ ...prev, [groupId]: '' }));
    }
  };

  const quickAddServiceToSubgroup = (groupId, subgroupId) => {
    const selectedService = selectedQuickAdd[`${groupId}_${subgroupId}`];
    if (selectedService && commonServices[selectedService]) {
      addServiceToSubgroup(groupId, subgroupId, commonServices[selectedService]);
      setSelectedQuickAdd(prev => ({ ...prev, [`${groupId}_${subgroupId}`]: '' }));
    }
  };

  const updateGroup = (groupId, updates) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === groupId ? { ...group, ...updates } : group
      )
    }));
  };

  const addSubgroup = (parentGroupId) => {
    const newSubgroup = {
      id: `subgroup${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      name: 'New Subgroup',
      services: []
    };
    
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === parentGroupId
          ? { ...group, subgroups: [...(group.subgroups || []), newSubgroup] }
          : group
      )
    }));
    setEditingGroup(newSubgroup.id);
  };

  const updateSubgroup = (parentGroupId, subgroupId, updates) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === parentGroupId
          ? {
              ...group,
              subgroups: (group.subgroups || []).map(subgroup =>
                subgroup.id === subgroupId ? { ...subgroup, ...updates } : subgroup
              )
            }
          : group
      )
    }));
  };

  const deleteSubgroup = (parentGroupId, subgroupId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === parentGroupId
          ? {
              ...group,
              subgroups: (group.subgroups || []).filter(subgroup => subgroup.id !== subgroupId)
            }
          : group
      )
    }));
  };

  const addServiceToSubgroup = (parentGroupId, subgroupId, quickService = null) => {
    const newService = quickService ? {
      id: `service${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      ...quickService,
      href: quickService.href.includes('localhost') 
        ? quickService.href.replace('http://localhost', generateServiceUrl(quickService.name, '').replace(/:[^:]*$/, ''))
        : quickService.href,
      widget: quickService.widget && quickService.widget.url && quickService.widget.url.includes('localhost')
        ? {
            ...quickService.widget,
            url: quickService.widget.url.replace('http://localhost', generateServiceUrl(quickService.name, '').replace(/:[^:]*$/, ''))
          }
        : quickService.widget,
      // Auto-enable Proxmox configuration for predefined Proxmox services
      enableProxmox: quickService.name.toLowerCase() === 'proxmox' ? true : quickService.enableProxmox
    } : {
      id: `service${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      name: 'New Service',
      href: updateServiceUrl(null, 'newservice'),
      description: '',
      icon: '',
      widget: null,
      ping: null
    };
    
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === parentGroupId
          ? {
              ...group,
              subgroups: (group.subgroups || []).map(subgroup =>
                subgroup.id === subgroupId
                  ? { ...subgroup, services: [...subgroup.services, newService] }
                  : subgroup
              )
            }
          : group
      )
    }));
    if (!quickService) setEditingService(newService.id);
  };

  const updateService = (serviceId, updates) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => ({
        ...group,
        services: group.services.map(service =>
          service.id === serviceId ? { ...service, ...updates } : service
        ),
        subgroups: (group.subgroups || []).map(subgroup => ({
          ...subgroup,
          services: subgroup.services.map(service =>
            service.id === serviceId ? { ...service, ...updates } : service
          )
        }))
      }))
    }));
  };

  const deleteGroup = (groupId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.filter(group => group.id !== groupId)
    }));
  };

  const deleteService = (serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => ({
        ...group,
        services: group.services.filter(service => service.id !== serviceId),
        subgroups: (group.subgroups || []).map(subgroup => ({
          ...subgroup,
          services: subgroup.services.filter(service => service.id !== serviceId)
        }))
      }))
    }));
  };

  const toggleServiceCollapse = (serviceId) => {
    setCollapsedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const parseYAML = (yamlContent) => {
    // Clean up and normalize the YAML content
    const normalizeYAML = (content) => {
      return content
        // Remove BOM and normalize line endings
        .replace(/^\uFEFF/, '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        // Fix common spacing issues
        .replace(/^\s+$/gm, '') // Remove lines with only whitespace
        .replace(/\t/g, '  ') // Convert tabs to spaces
        // Fix missing colons after group/service names
        .replace(/^(\s*-\s+)([^:\n]+)(\s*)$/gm, '$1$2:$3')
        // Normalize quoted values
        .replace(/:\s*"([^"]*)"$/gm, ': $1')
        .replace(/:\s*'([^']*)'$/gm, ': $1')
        // Fix common Homepage config variations
        .replace(/\bhref\s*:/gi, 'href:')
        .replace(/\burl\s*:/gi, 'url:')
        .replace(/\bdescription\s*:/gi, 'description:')
        .replace(/\bicon\s*:/gi, 'icon:')
        .replace(/\bwidget\s*:/gi, 'widget:')
        .replace(/\btype\s*:/gi, 'type:')
        .replace(/\bkey\s*:/gi, 'key:')
        .replace(/\bping\s*:/gi, 'ping:')
        .replace(/\binterval\s*:/gi, 'interval:')
        .replace(/\benabled\s*:/gi, 'enabled:')
        .replace(/\bpublic\s*:/gi, 'public:')
        // Handle different service URL formats
        .replace(/\bserver\s*:/gi, 'url:')
        .replace(/\baddress\s*:/gi, 'url:')
        .replace(/\bhost\s*:/gi, 'url:');
    };

    // Parse value with flexible type handling
    const parseValue = (value) => {
      if (value === undefined || value === null) return '';
      
      const trimmed = String(value).trim();
      
      // Handle boolean values
      if (/^(true|false|yes|no|on|off|1|0)$/i.test(trimmed)) {
        return /^(true|yes|on|1)$/i.test(trimmed);
      }
      
      // Handle numeric values
      if (/^\d+$/.test(trimmed)) {
        const num = parseInt(trimmed, 10);
        return !isNaN(num) ? num : trimmed;
      }
      
      // Remove quotes
      return trimmed.replace(/^["']|["']$/g, '');
    };

    // Generate unique IDs
    const generateId = (prefix) => `${prefix}${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    try {
      const normalizedContent = normalizeYAML(yamlContent);
      const lines = normalizedContent.split('\n');
      const groups = [];
      let currentGroup = null;
      let currentSubgroup = null;
      let currentService = null;
      let currentContext = null; // 'widget', 'ping', etc.
      let indentStack = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        if (!trimmed || trimmed.startsWith('#')) continue;

        // Calculate indentation level
        const indent = line.match(/^(\s*)/)[1].length;
        
        // Update indent stack
        while (indentStack.length > 0 && indentStack[indentStack.length - 1].indent >= indent) {
          const popped = indentStack.pop();
          if (popped.type === 'widget' || popped.type === 'ping') {
            currentContext = null;
          }
        }

        // Group level (no indentation or minimal indentation)
        if ((indent === 0 || (indent <= 2 && line.match(/^[\s]*-\s+/))) && trimmed.includes(':') && !trimmed.match(/^\s*(href|url|description|icon|widget|ping|type|key|interval|enabled|public):/i)) {
          const groupName = trimmed.replace(/^-\s*/, '').replace(/:.*$/, '').trim();
          if (groupName) {
            currentGroup = {
              id: generateId('group'),
              name: groupName,
              services: [],
              subgroups: []
            };
            groups.push(currentGroup);
            currentSubgroup = null;
            currentService = null;
            currentContext = null;
            indentStack = [{ type: 'group', indent, name: groupName }];
          }
        }
        // Service level (indented under group)
        else if (indent >= 2 && trimmed.startsWith('- ') && trimmed.includes(':') && currentGroup && !trimmed.match(/^\s*(href|url|description|icon|widget|ping|type|key|interval|enabled|public):/i)) {
          const serviceName = trimmed.replace(/^-\s*/, '').replace(/:.*$/, '').trim();
          if (serviceName) {
            // Check if this should be a subgroup (deeper indentation suggests subgroup)
            const shouldBeSubgroup = indent > 4 && currentService === null;
            
            if (shouldBeSubgroup) {
              // Create subgroup
              currentSubgroup = {
                id: generateId('subgroup'),
                name: serviceName,
                services: []
              };
              currentGroup.subgroups.push(currentSubgroup);
              currentService = null;
              indentStack.push({ type: 'subgroup', indent, name: serviceName });
            } else {
              // Create service
              currentService = {
                id: generateId('service'),
                name: serviceName,
                href: '',
                url: '',
                description: '',
                icon: '',
                ping: null,
                widget: null
              };
              
              if (currentSubgroup) {
                currentSubgroup.services.push(currentService);
              } else {
                currentGroup.services.push(currentService);
              }
              
              currentContext = null;
              indentStack.push({ type: 'service', indent, name: serviceName });
            }
          }
        }
        // Property level
        else if (currentService && trimmed.includes(':')) {
          const colonIndex = trimmed.indexOf(':');
          const key = trimmed.substring(0, colonIndex).trim().toLowerCase();
          const value = parseValue(trimmed.substring(colonIndex + 1).trim());

          if (key === 'widget' && !value) {
            currentService.widget = { type: '', url: '', key: '' };
            currentContext = 'widget';
            indentStack.push({ type: 'widget', indent });
          } else if (key === 'ping' && !value) {
            currentService.ping = { enabled: false, url: '', interval: 30, public: false };
            currentContext = 'ping';
            indentStack.push({ type: 'ping', indent });
          } else if (currentContext === 'widget' && currentService.widget) {
            if (key === 'type') currentService.widget.type = value;
            else if (key === 'url' || key === 'server' || key === 'address' || key === 'host') currentService.widget.url = value;
            else if (key === 'key' || key === 'apikey' || key === 'api_key' || key === 'token') currentService.widget.key = value;
            else if (key === 'username' || key === 'user') currentService.widget.username = value;
            else if (key === 'password' || key === 'pass') currentService.widget.password = value;
            else if (key === 'datastore') currentService.widget.datastore = value;
          } else if (currentContext === 'ping' && currentService.ping) {
            if (key === 'url' || key === 'host' || key === 'address') currentService.ping.url = value;
            else if (key === 'interval') currentService.ping.interval = typeof value === 'number' ? value : 30;
            else if (key === 'enabled') currentService.ping.enabled = Boolean(value);
            else if (key === 'public') currentService.ping.public = Boolean(value);
          } else {
            // Direct service properties
            if (key === 'href' || key === 'url') currentService.href = value;
            else if (key === 'description') currentService.description = value;
            else if (key === 'icon') currentService.icon = value;
            else if (key === 'proxmoxNode') currentService.proxmoxNode = value;
            else if (key === 'proxmoxVMID') currentService.proxmoxVMID = typeof value === 'number' ? value : parseInt(value) || 101;
            else if (key === 'proxmoxType') currentService.proxmoxType = value;
          }
        }
      }

      // Clean up services - ensure href is set from url if available
      groups.forEach(group => {
        [...group.services, ...(group.subgroups?.flatMap(sg => sg.services) || [])].forEach(service => {
          if (!service.href && service.url) {
            service.href = service.url;
          }
          // Remove empty ping objects
          if (service.ping && !service.ping.enabled && !service.ping.url) {
            service.ping = null;
          }
          // Remove empty widget objects
          if (service.widget && !service.widget.type && !service.widget.url && !service.widget.key) {
            service.widget = null;
          }
        });
      });

      return groups;
    } catch (error) {
      console.warn('Advanced YAML parsing failed, trying simple fallback:', error);
      return parseYAMLSimple(yamlContent);
    }
  };

  // Fallback simple parser
  const parseYAMLSimple = (yamlContent) => {
    const lines = yamlContent.split('\n');
    const groups = [];
    let currentGroup = null;
    let currentService = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      if (line.match(/^-?\s*[\w\s]+:\s*$/)) {
        // New group
        const groupName = trimmed.replace(/^-\s*/, '').replace(':', '').trim();
        if (groupName) {
          currentGroup = {
            id: `group${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            name: groupName,
            services: [],
            subgroups: []
          };
          groups.push(currentGroup);
        }
      } else if (line.match(/^\s+-\s+[\w\s]+:/) && currentGroup) {
        // New service
        const serviceName = line.replace(/^\s*-\s*/, '').replace(':', '').trim();
        if (serviceName) {
          currentService = {
            id: `service${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            name: serviceName,
            href: '',
            description: '',
            icon: '',
            ping: null,
            widget: null
          };
          currentGroup.services.push(currentService);
        }
      }
    }

    return groups;
  };

  const importConfig = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type - be more flexible
    const fileName = file.name.toLowerCase();
    const validExtensions = ['.yaml', '.yml', '.txt'];
    const isValidType = validExtensions.some(ext => fileName.endsWith(ext)) || 
                       file.type === 'text/yaml' || 
                       file.type === 'text/plain' || 
                       file.type === 'application/x-yaml';
    
    if (!isValidType) {
      setImportError('Please select a YAML file (.yaml, .yml) or text file (.txt). Other formats are not supported.');
      setImportSuccess('');
      event.target.value = '';
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setImportError('File size too large. Please select a file smaller than 1MB.');
      setImportSuccess('');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const yamlContent = e.target.result;
        if (!yamlContent || typeof yamlContent !== 'string') {
          throw new Error('Invalid file content');
        }
        
        const importedGroups = parseYAML(yamlContent);
        
        if (importedGroups && importedGroups.length > 0) {
          setConfig({ groups: importedGroups });
          setImportError('');
          
          // Count services including those in subgroups
          const totalServices = importedGroups.reduce((total, group) => {
            const mainServices = group.services?.length || 0;
            const subgroupServices = (group.subgroups || []).reduce((subTotal, subgroup) => {
              return subTotal + (subgroup.services?.length || 0);
            }, 0);
            return total + mainServices + subgroupServices;
          }, 0);
          
          const totalSubgroups = importedGroups.reduce((total, group) => total + (group.subgroups?.length || 0), 0);
          
          // Count services with widgets and ping
          const servicesWithWidgets = importedGroups.reduce((total, group) => {
            const mainWithWidgets = (group.services || []).filter(s => s.widget?.type).length;
            const subWithWidgets = (group.subgroups || []).reduce((subTotal, subgroup) => {
              return subTotal + (subgroup.services || []).filter(s => s.widget?.type).length;
            }, 0);
            return total + mainWithWidgets + subWithWidgets;
          }, 0);
          
          const servicesWithPing = importedGroups.reduce((total, group) => {
            const mainWithPing = (group.services || []).filter(s => s.ping?.enabled).length;
            const subWithPing = (group.subgroups || []).reduce((subTotal, subgroup) => {
              return subTotal + (subgroup.services || []).filter(s => s.ping?.enabled).length;
            }, 0);
            return total + mainWithPing + subWithPing;
          }, 0);
          
          let successMessage = `✅ Successfully imported ${importedGroups.length} group(s)`;
          if (totalSubgroups > 0) successMessage += `, ${totalSubgroups} subgroup(s)`;
          successMessage += `, and ${totalServices} service(s)`;
          if (servicesWithWidgets > 0) successMessage += ` (${servicesWithWidgets} with widgets)`;
          if (servicesWithPing > 0) successMessage += ` (${servicesWithPing} with ping monitoring)`;
          successMessage += '. Configuration has been normalized and validated.';
          
          setImportSuccess(successMessage);
          setTimeout(() => setImportSuccess(''), 8000);
        } else {
          setImportError('No valid groups found in the YAML file. Please check the format and try again.');
          setImportSuccess('');
        }
      } catch (error) {
        console.error('Import error:', error);
        setImportError(`Error parsing YAML: ${error.message || 'Unknown error'}. The file may be corrupted or in an unsupported format.`);
        setImportSuccess('');
      }
    };
    
    reader.onerror = () => {
      setImportError('Error reading file. Please try again.');
      setImportSuccess('');
    };
    
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
  };

  const triggerImport = () => {
    document.getElementById('yaml-import').click();
  };

  const moveServiceUp = (groupId, serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id === groupId) {
          const serviceIndex = group.services.findIndex(s => s.id === serviceId);
          if (serviceIndex > 0) {
            const newServices = [...group.services];
            [newServices[serviceIndex - 1], newServices[serviceIndex]] = 
            [newServices[serviceIndex], newServices[serviceIndex - 1]];
            return { ...group, services: newServices };
          }
        }
        return group;
      })
    }));
  };

  const moveServiceDown = (groupId, serviceId) => {
    setConfig(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id === groupId) {
          const serviceIndex = group.services.findIndex(s => s.id === serviceId);
          if (serviceIndex < group.services.length - 1) {
            const newServices = [...group.services];
            [newServices[serviceIndex], newServices[serviceIndex + 1]] = 
            [newServices[serviceIndex + 1], newServices[serviceIndex]];
            return { ...group, services: newServices };
          }
        }
        return group;
      })
    }));
  };

  const moveGroupUp = (groupId) => {
    setConfig(prev => {
      const groupIndex = prev.groups.findIndex(g => g.id === groupId);
      if (groupIndex > 0) {
        const newGroups = [...prev.groups];
        [newGroups[groupIndex - 1], newGroups[groupIndex]] = 
        [newGroups[groupIndex], newGroups[groupIndex - 1]];
        return { ...prev, groups: newGroups };
      }
      return prev;
    });
  };

  const moveGroupDown = (groupId) => {
    setConfig(prev => {
      const groupIndex = prev.groups.findIndex(g => g.id === groupId);
      if (groupIndex < prev.groups.length - 1) {
        const newGroups = [...prev.groups];
        [newGroups[groupIndex], newGroups[groupIndex + 1]] = 
        [newGroups[groupIndex + 1], newGroups[groupIndex]];
        return { ...prev, groups: newGroups };
      }
      return prev;
    });
  };

  const generateYAML = () => {
    if (!config.groups || config.groups.length === 0) {
      return '';
    }
    
    // Helper function to generate service YAML
    const generateServiceYAML = (service, indent = '  ') => {
      if (!service.name) return '';
      
      let serviceYaml = `${indent}- ${service.name}:\n`;
      if (service.href) serviceYaml += `${indent}    href: ${service.href}\n`;
      if (service.description) serviceYaml += `${indent}    description: ${service.description}\n`;
      if (service.icon) serviceYaml += `${indent}    icon: ${service.icon}\n`;
      
      // Add Proxmox configuration (only if enabled)
      if (service.enableProxmox) {
        if (service.proxmoxNode) serviceYaml += `${indent}    proxmoxNode: ${service.proxmoxNode}\n`;
        if (service.proxmoxVMID) serviceYaml += `${indent}    proxmoxVMID: ${service.proxmoxVMID}\n`;
        if (service.proxmoxType) serviceYaml += `${indent}    proxmoxType: ${service.proxmoxType}\n`;
      }
      
      // Add ping configuration
      if (service.ping && service.ping.enabled) {
        serviceYaml += `${indent}    ping:\n`;
        if (service.ping.url) serviceYaml += `${indent}      url: ${service.ping.url}\n`;
        if (service.ping.interval) serviceYaml += `${indent}      interval: ${service.ping.interval}\n`;
        if (service.ping.public !== undefined) serviceYaml += `${indent}      public: ${service.ping.public}\n`;
      }
      
      // Add widget configuration
      if (service.widget && service.widget.type) {
        serviceYaml += `${indent}    widget:\n`;
        serviceYaml += `${indent}      type: ${service.widget.type}\n`;
        if (service.widget.url) serviceYaml += `${indent}      url: ${service.widget.url}\n`;
        if (service.widget.key) serviceYaml += `${indent}      key: ${service.widget.key}\n`;
        // Proxmox Backup Server specific fields
        if (service.widget.username) serviceYaml += `${indent}      username: ${service.widget.username}\n`;
        if (service.widget.password) serviceYaml += `${indent}      password: ${service.widget.password}\n`;
        if (service.widget.datastore) serviceYaml += `${indent}      datastore: ${service.widget.datastore}\n`;
      }
      
      return serviceYaml;
    };
    
    // Convert to YAML-like string with nested groups support
    let yamlStr = '';
    config.groups.forEach((group, groupIndex) => {
      if (!group.name) return;
      
      yamlStr += `- ${group.name}:\n`;
      
      // Add main group services
      if (group.services && group.services.length > 0) {
        group.services.forEach(service => {
          yamlStr += generateServiceYAML(service);
        });
      }
      
      // Add subgroups
      if (group.subgroups && group.subgroups.length > 0) {
        group.subgroups.forEach(subgroup => {
          if (!subgroup.name) return;
          
          yamlStr += `  - ${subgroup.name}:\n`;
          
          if (subgroup.services && subgroup.services.length > 0) {
            subgroup.services.forEach(service => {
              yamlStr += generateServiceYAML(service, '    ');
            });
          }
        });
      }
      
      // Add spacing between groups except for the last one
      if (groupIndex < config.groups.length - 1) {
        yamlStr += '\n';
      }
    });

    return yamlStr;
  };

  const generateSettingsYAML = () => {
    if (!settingsConfig) {
      return '';
    }
    
    let yamlStr = '';
    
    // Basic settings
    if (settingsConfig.title) yamlStr += `title: ${settingsConfig.title}\n`;
    if (settingsConfig.favicon) yamlStr += `favicon: ${settingsConfig.favicon}\n`;
    yamlStr += `theme: ${settingsConfig.theme}\n`;
    yamlStr += `color: ${settingsConfig.color}\n`;
    yamlStr += `headerStyle: ${settingsConfig.headerStyle}\n`;
    if (settingsConfig.hideVersion) yamlStr += `hideVersion: true\n`;
    yamlStr += `language: ${settingsConfig.language}\n`;
    yamlStr += `target: ${settingsConfig.target}\n`;
    
    // Quick Launch settings
    yamlStr += `\nquicklaunch:\n`;
    yamlStr += `  searchDescriptions: ${settingsConfig.quickLaunch.searchDescriptions}\n`;
    yamlStr += `  hideInternetSearch: ${settingsConfig.quickLaunch.hideInternetSearch}\n`;
    yamlStr += `  hideVisitURL: ${settingsConfig.quickLaunch.hideVisitURL}\n`;
    
    // Layout (placeholder)
    yamlStr += `\nlayout:\n`;
    
    // Providers
    if (settingsConfig.providers.openweathermap || settingsConfig.providers.weatherapi) {
      yamlStr += `\nproviders:\n`;
      if (settingsConfig.providers.openweathermap) {
        yamlStr += `  openweathermap: ${settingsConfig.providers.openweathermap}\n`;
      }
      if (settingsConfig.providers.weatherapi) {
        yamlStr += `  weatherapi: ${settingsConfig.providers.weatherapi}\n`;
      }
    }

    return yamlStr;
  };

  const generateWidgetsYAML = () => {
    if (!informationWidgets.widgets || informationWidgets.widgets.length === 0) {
      return '# No widgets configured yet';
    }
    
    const enabledWidgets = informationWidgets.widgets.filter(w => w.enabled);
    if (enabledWidgets.length === 0) {
      return '# No enabled widgets';
    }
    
    let yamlStr = '';
    
    // Add each widget configuration
    enabledWidgets.forEach((widget, index) => {
      yamlStr += `- type: ${widget.type}\n`;
      
      const hasOptions = widget.options && Object.keys(widget.options).length > 0;
      if (hasOptions) {
        yamlStr += `  options:\n`;
        
        // DateTime widget options
        if (widget.type === 'datetime') {
          if (widget.options.format) {
            yamlStr += `    format:\n`;
            if (widget.options.format.timeStyle) yamlStr += `      timeStyle: ${widget.options.format.timeStyle}\n`;
            if (widget.options.format.dateStyle) yamlStr += `      dateStyle: ${widget.options.format.dateStyle}\n`;
          }
          if (widget.options.timezone) yamlStr += `    timezone: ${widget.options.timezone}\n`;
          if (widget.options.showSeconds) yamlStr += `    showSeconds: ${widget.options.showSeconds}\n`;
        }
        
        // Weather widget options
        else if (widget.type === 'weather') {
          if (widget.options.location) yamlStr += `    location: ${widget.options.location}\n`;
          if (widget.options.units) yamlStr += `    units: ${widget.options.units}\n`;
          if (widget.options.provider) yamlStr += `    provider: ${widget.options.provider}\n`;
          if (widget.options.show) yamlStr += `    show: ${widget.options.show}\n`;
          if (widget.options.showForecast) yamlStr += `    showForecast: ${widget.options.showForecast}\n`;
        }
        
        // Resources widget options
        else if (widget.type === 'resources') {
          if (widget.options.refresh) yamlStr += `    refresh: ${widget.options.refresh}\n`;
          if (widget.options.units) yamlStr += `    units: ${widget.options.units}\n`;
          yamlStr += `    show:\n`;
          yamlStr += `      cpu: ${widget.options.cpu !== false}\n`;
          yamlStr += `      memory: ${widget.options.memory !== false}\n`;
          yamlStr += `      disk: ${widget.options.disk !== false}\n`;
          if (widget.options.temp) yamlStr += `      temperature: ${widget.options.temp}\n`;
        }
        
        // Search widget options
        else if (widget.type === 'search') {
          if (widget.options.placeholder) yamlStr += `    placeholder: "${widget.options.placeholder}"\n`;
          if (widget.options.provider) yamlStr += `    provider: ${widget.options.provider}\n`;
          if (widget.options.showIcon !== undefined) yamlStr += `    showIcon: ${widget.options.showIcon}\n`;
          if (widget.options.autofocus) yamlStr += `    autofocus: ${widget.options.autofocus}\n`;
        }
        
        // Bookmarks widget options
        else if (widget.type === 'bookmarks') {
          if (widget.options.limit) yamlStr += `    limit: ${widget.options.limit}\n`;
          if (widget.options.layout) yamlStr += `    layout: ${widget.options.layout}\n`;
          if (widget.options.categories) {
            const categories = widget.options.categories.split(',').map(cat => cat.trim()).filter(cat => cat);
            if (categories.length > 0) {
              yamlStr += `    categories:\n`;
              categories.forEach(category => {
                yamlStr += `      - ${category}\n`;
              });
            }
          }
          if (widget.options.showIcons !== undefined) yamlStr += `    showIcons: ${widget.options.showIcons}\n`;
        }
        
        // Greeting widget options
        else if (widget.type === 'greeting') {
          if (widget.options.name) yamlStr += `    name: "${widget.options.name}"\n`;
          if (widget.options.format) yamlStr += `    timeFormat: ${widget.options.format}\n`;
          if (widget.options.showTime !== undefined) yamlStr += `    showTime: ${widget.options.showTime}\n`;
          yamlStr += `    messages:\n`;
          yamlStr += `      morning: "${widget.options.morning || 'Good morning'}"\n`;
          yamlStr += `      afternoon: "${widget.options.afternoon || 'Good afternoon'}"\n`;
          yamlStr += `      evening: "${widget.options.evening || 'Good evening'}"\n`;
          yamlStr += `      night: "${widget.options.night || 'Good night'}"\n`;
        }
      }
      
      // Add spacing between widgets except for the last one
      if (index < enabledWidgets.length - 1) {
        yamlStr += '\n';
      }
    });
    
    return yamlStr;
  };

  const generateProxmoxYAML = () => {
    if (!proxmoxConfig.enabled) {
      return '# Proxmox integration not enabled';
    }
    
    let yamlStr = '# Proxmox Configuration\n';
    yamlStr += `proxmox:\n`;
    yamlStr += `  url: ${proxmoxConfig.url}\n`;
    yamlStr += `  username: ${proxmoxConfig.username}\n`;
    yamlStr += `  password: ${proxmoxConfig.password}\n`;
    
    if (proxmoxConfig.nodes && proxmoxConfig.nodes.length > 0) {
      yamlStr += `  nodes:\n`;
      proxmoxConfig.nodes
        .filter(node => node.enabled)
        .forEach(node => {
          yamlStr += `    - name: ${node.name}\n`;
        });
    }
    
    if (proxmoxConfig.vms && proxmoxConfig.vms.length > 0) {
      yamlStr += `  vms:\n`;
      proxmoxConfig.vms
        .filter(vm => vm.enabled)
        .forEach(vm => {
          yamlStr += `    - name: ${vm.name}\n`;
          yamlStr += `      vmid: ${vm.vmid}\n`;
          yamlStr += `      node: ${vm.node}\n`;
          yamlStr += `      type: ${vm.type}\n`;
        });
    }
    
    return yamlStr;
  };

  const downloadConfig = () => {
    const yamlContent = activeTab === 'services' ? generateYAML() : 
                       activeTab === 'settings' ? generateSettingsYAML() : 
                       activeTab === 'widgets' ? generateWidgetsYAML() : 
                       generateProxmoxYAML();
    const fileName = activeTab === 'services' ? 'services.yaml' : 
                    activeTab === 'settings' ? 'settings.yaml' : 
                    activeTab === 'widgets' ? 'widgets.yaml' : 
                    'proxmox.yaml';
    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      const yamlContent = activeTab === 'services' ? generateYAML() : 
                         activeTab === 'settings' ? generateSettingsYAML() : 
                         activeTab === 'widgets' ? generateWidgetsYAML() : 
                         generateProxmoxYAML();
      if (!yamlContent) {
        setImportError('No configuration to copy');
        setTimeout(() => setImportError(''), 3000);
        return;
      }
      
      await navigator.clipboard.writeText(yamlContent);
      setImportSuccess('YAML copied to clipboard!');
      setImportError('');
      setTimeout(() => setImportSuccess(''), 3000);
    } catch (error) {
      setImportError('Failed to copy to clipboard');
      setTimeout(() => setImportError(''), 3000);
    }
  };

  const commonWidgetTypes = [
    // Core Media & Arr Stack
    'plex', 'jellyfin', 'emby', 'tautulli', 'sonarr', 'radarr', 'lidarr', 'readarr', 
    'prowlarr', 'bazarr', 'overseerr', 'jellyseerr', 'ombi',
    
    // Download Clients
    'qbittorrent', 'transmission', 'deluge', 'sabnzbd', 'nzbget', 'rutorrent', 
    'flood', 'jdownloader', 'pyload',
    
    // System & Infrastructure
    'portainer', 'traefik', 'nginx', 'docker', 'watchtower', 'yacht',
    
    // Monitoring & Health
    'uptime-kuma', 'uptimerobot', 'grafana', 'prometheus', 'netdata', 'glances',
    'scrutiny', 'healthchecks', 'gatus', 'beszel', 'checkmk',
    
    // Networking & Security
    'adguard', 'pihole', 'cloudflared', 'tailscale', 'headscale', 'gluetun',
    'unifi', 'opnsense', 'pfsense', 'authentik', 'vaultwarden', 'crowdsec',
    
    // Home Automation
    'homeassistant', 'esphome', 'homebridge', 'nodered', 'zigbee2mqtt', 'evcc',
    
    // Media Processing & Management
    'tdarr', 'unmanic', 'fileflows', 'audiobookshelf', 'kavita', 'komga', 
    'tubearchivist', 'calibre-web', 'photoprism', 'immich',
    
    // Storage & NAS
    'truenas', 'freenas', 'openmediavault', 'proxmox', 'proxmoxbackupserver', 'diskstation', 'qnap', 'nextcloud',
    'filebrowser', 'syncthing', 'duplicati', 'kopia', 'urbackup',
    
    // Development & Git
    'gitea', 'gitlab', 'github', 'jenkins', 'portainer',
    
    // Communication & Social
    'gotify', 'mastodon', 'mattermost', 'rocketchat', 'matrix', 'element',
    
    // Finance & Personal
    'firefly', 'ghostfolio', 'grocy', 'paperlessngx', 'mealie', 'tandoor',
    'vikunja', 'linkwarden', 'wallabag', 'shiori',
    
    // RSS & Reading
    'miniflux', 'freshrss', 'bookstack', 'outline', 'wikijs', 'trilium',
    
    // 3D Printing & IoT
    'moonraker', 'octoprint', 'frigate', 'motioneye',
    
    // Gaming & Entertainment
    'minecraft', 'pterodactyl', 'steam',
    
    // Mail & Web Services
    'mailcow', 'roundcube', 'changedetection', 'upsnap', 'speedtest',
    
    // Databases
    'postgres', 'mysql', 'redis', 'mongodb', 'influxdb',
    
    // Additional Services
    'autobrr', 'jackett', 'flaresolverr', 'code-server', 'smokeping', 'ntopng',
    'zabbix', 'joplin', 'custom'
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Home className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Homepage Config Builder
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-slate-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <List className="h-4 w-4" />
            Services
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Cog className="h-4 w-4" />
            Settings
          </button>
          <button
            onClick={() => setActiveTab('widgets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'widgets'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Info className="h-4 w-4" />
            Information Widgets
          </button>
          
          {uiPreferences.showProxmoxTab && (
            <button
              onClick={() => setActiveTab('proxmox')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'proxmox'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Cog className="h-4 w-4" />
              Proxmox
            </button>
          )}
        </div>

        {/* Hidden file input for import */}
        <input
          id="yaml-import"
          type="file"
          accept=".yaml,.yml,.txt,text/yaml,text/plain,application/x-yaml"
          onChange={importConfig}
          className="hidden"
        />

        {/* Import Success/Error Display */}
        {importSuccess && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg">
            <div className="flex items-center gap-2 text-green-300">
              <span className="font-semibold">Success:</span>
              <span>{importSuccess}</span>
              <button
                onClick={() => setImportSuccess('')}
                className="ml-auto text-green-400 hover:text-green-300"
              >
                ×
              </button>
            </div>
          </div>
        )}
        {importError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-300">
              <span className="font-semibold">Import Error:</span>
              <span>{importError}</span>
              <button
                onClick={() => setImportError('')}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </div>
          </div>
        )}
        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">
              {activeTab === 'services' ? 'Services Configuration' : 
               activeTab === 'settings' ? 'Settings Configuration' :
               activeTab === 'widgets' ? 'Information Widgets Configuration' :
               'Proxmox Configuration'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={triggerImport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Upload className="h-4 w-4" />
              Import YAML
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Copy className="h-4 w-4" />
              Copy YAML
            </button>
            <button
              onClick={downloadConfig}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              Download {activeTab === 'services' ? 'services.yaml' : activeTab === 'settings' ? 'settings.yaml' : activeTab === 'widgets' ? 'widgets.yaml' : 'proxmox.yaml'}
            </button>
            
            {/* Live Update Buttons */}
            {liveUpdateConfig.enabled && (
              <>
                <div className="h-6 w-px bg-slate-600"></div>
                <button
                  onClick={() => loadConfigFromServer(activeTab)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:text-purple-400 rounded-lg transition-colors"
                  title="Load configuration from server"
                >
                  <CloudDownload className="h-4 w-4" />
                  {isLoading ? 'Loading...' : 'Load from Server'}
                </button>
                <button
                  onClick={() => saveConfigToServer(activeTab)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 disabled:text-orange-400 rounded-lg transition-colors"
                  title="Save configuration to server"
                >
                  <CloudUpload className="h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save to Server'}
                </button>
              </>
            )}
          </div>
          
          {/* Live Update Status */}
          {liveUpdateConfig.status !== 'unknown' && (
            <div className="flex items-center gap-2 text-sm mt-2">
              <div className={`w-2 h-2 rounded-full ${
                liveUpdateConfig.status === 'connected' ? 'bg-green-500' : 
                liveUpdateConfig.status === 'error' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-slate-400">
                Live Updates: {liveUpdateConfig.enabled ? 
                  `Enabled (${liveUpdateConfig.configPath})` : 
                  'Disabled'
                }
              </span>
            </div>
          )}
        </div>

        {/* Main Content */}
        {activeTab === 'services' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Config Builder */}
          <div className="space-y-6">
            {/* Interface Preferences */}
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cog className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-300">Interface Options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="show-proxmox-tab-services"
                    checked={uiPreferences.showProxmoxTab}
                    onChange={(e) => {
                      const showTab = e.target.checked;
                      setUiPreferences(prev => ({ ...prev, showProxmoxTab: showTab }));
                      // If hiding the Proxmox tab and it's currently active, switch to services tab
                      if (!showTab && activeTab === 'proxmox') {
                        setActiveTab('services');
                      }
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-800 text-xs"
                  />
                  <label htmlFor="show-proxmox-tab-services" className="text-xs text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
                    Show Proxmox Tab {uiPreferences.showProxmoxTab && <span className="text-green-400">✓</span>}
                  </label>
                </div>
              </div>
            </div>
            
            {/* Global Domain Configuration */}
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center space-x-2 mb-3">
                <Cog className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Global Domain</span>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={uiPreferences.globalDomain || 'local'}
                    onChange={(e) => {
                      setUiPreferences(prev => ({ ...prev, globalDomain: e.target.value }));
                    }}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-slate-300 focus:outline-none focus:border-blue-500 text-sm"
                    placeholder="local"
                  />
                  <button
                    onClick={updateAllServiceUrls}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-xs font-medium transition-colors"
                    title="Update all service URLs to use this domain"
                  >
                    Update All
                  </button>
                </div>
                <div className="text-xs text-slate-400">
                  Services will use "servicename.{uiPreferences.globalDomain || 'local'}" format for URLs
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Service Groups</h2>
              <button
                onClick={addGroup}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
              >
                <Plus className="h-4 w-4" />
                Add Group
              </button>
            </div>

            {config.groups.map((group, groupIndex) => (
              <div key={group.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                {/* Group Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {editingGroup === group.id ? (
                      <input
                        type="text"
                        value={group.name}
                        onChange={(e) => updateGroup(group.id, { name: e.target.value })}
                        onBlur={() => setEditingGroup(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingGroup(null)}
                        className="bg-slate-700 text-white px-3 py-1 rounded border border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                        autoFocus
                      />
                    ) : (
                      <h3
                        className="text-lg font-medium cursor-pointer hover:text-blue-400 transition-colors"
                        onClick={() => setEditingGroup(group.id)}
                      >
                        {group.name}
                      </h3>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Group reorder buttons */}
                    <div className="flex items-center gap-1 bg-purple-900/30 px-2 py-1 rounded border border-purple-700">
                      <span className="text-xs text-purple-300 mr-1">Group:</span>
                      <button
                        onClick={() => moveGroupUp(group.id)}
                        disabled={groupIndex === 0}
                        className={`p-1 rounded transition-all ${
                          groupIndex === 0 
                            ? 'text-slate-500 cursor-not-allowed' 
                            : 'text-purple-300 hover:text-purple-200 hover:bg-purple-800/50'
                        }`}
                        title="Move group up"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveGroupDown(group.id)}
                        disabled={groupIndex === config.groups.length - 1}
                        className={`p-1 rounded transition-all ${
                          groupIndex === config.groups.length - 1
                            ? 'text-slate-500 cursor-not-allowed' 
                            : 'text-purple-300 hover:text-purple-200 hover:bg-purple-800/50'
                        }`}
                        title="Move group down"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="h-6 w-px bg-slate-600"></div>
                    
                    <button
                      onClick={() => addService(group.id)}
                      className="p-2 text-green-400 hover:text-green-300 hover:bg-slate-700 rounded transition-all"
                      title="Add custom service"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <div className="flex gap-1">
                      <select
                        value={selectedQuickAdd[group.id] || ''}
                        onChange={(e) => setSelectedQuickAdd(prev => ({ ...prev, [group.id]: e.target.value }))}
                        className="bg-slate-600 text-white text-xs px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                      >
                        <option value="">Quick add...</option>
                        {Object.entries(commonServices)
                          .sort(([,a], [,b]) => a.name.localeCompare(b.name))
                          .map(([key, service]) => (
                            <option key={key} value={key}>{service.name}</option>
                          ))}
                      </select>
                      <button
                        onClick={() => quickAddService(group.id)}
                        disabled={!selectedQuickAdd[group.id]}
                        className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:text-slate-400 rounded transition-colors"
                        title="Add selected service with defaults"
                      >
                        Add
                      </button>
                    </div>
                    <button
                      onClick={() => deleteGroup(group.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  {group.services.map((service, index) => (
                    <div
                      key={service.id}
                      className="bg-slate-700 rounded p-3 border border-slate-600 hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleServiceCollapse(service.id)}
                            className="p-1 text-slate-400 hover:text-slate-200 rounded transition-all"
                            title={collapsedServices[service.id] ? "Expand service" : "Collapse service"}
                          >
                            <ChevronRight 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                collapsedServices[service.id] ? 'rotate-0' : 'rotate-90'
                              }`} 
                            />
                          </button>
                          <span className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">
                            {index + 1}
                          </span>
                          {editingService === service.id ? (
                            <input
                              type="text"
                              value={service.name}
                              onChange={(e) => updateService(service.id, { name: e.target.value })}
                              onBlur={() => setEditingService(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingService(null)}
                              className="bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                              autoFocus
                            />
                          ) : (
                            <span
                              className="font-medium cursor-pointer hover:text-blue-400 transition-colors"
                              onClick={() => setEditingService(service.id)}
                            >
                              {service.name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Service reorder buttons */}
                          <div className="flex items-center gap-1 bg-blue-900/30 px-2 py-1 rounded border border-blue-700">
                            <span className="text-xs text-blue-300 mr-1">#</span>
                            <button
                              onClick={() => moveServiceUp(group.id, service.id)}
                              disabled={index === 0}
                              className={`p-1 rounded transition-all ${
                                index === 0 
                                  ? 'text-slate-500 cursor-not-allowed' 
                                  : 'text-blue-300 hover:text-blue-200 hover:bg-blue-800/50'
                              }`}
                              title="Move service up"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => moveServiceDown(group.id, service.id)}
                              disabled={index === group.services.length - 1}
                              className={`p-1 rounded transition-all ${
                                index === group.services.length - 1
                                  ? 'text-slate-500 cursor-not-allowed' 
                                  : 'text-blue-300 hover:text-blue-200 hover:bg-blue-800/50'
                              }`}
                              title="Move service down"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => deleteService(service.id)}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded transition-all"
                            title="Delete service"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {!collapsedServices[service.id] && (
                      <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <label className="block text-slate-300 mb-1">URL</label>
                          <input
                            type="text"
                            value={service.href}
                            onChange={(e) => updateService(service.id, { href: e.target.value })}
                            className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            placeholder="http://localhost:3000"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1">Icon</label>
                          <input
                            type="text"
                            value={service.icon}
                            onChange={(e) => updateService(service.id, { icon: e.target.value })}
                            className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            placeholder="plex, gitlab, etc."
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-slate-300 mb-1">Description</label>
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) => updateService(service.id, { description: e.target.value })}
                            className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            placeholder="Optional description"
                          />
                        </div>
                      </div>

                      {/* Widget Configuration */}
                      <div className="mt-4 pt-3 border-t border-slate-600">
                        <label className="block text-slate-300 mb-2 text-sm">Widget (Optional)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <select
                            value={service.widget?.type || ''}
                            onChange={(e) => {
                              const newWidget = e.target.value ? { type: e.target.value, url: '', key: '' } : null;
                              updateService(service.id, { widget: newWidget });
                            }}
                            className="bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                          >
                            <option value="">No widget</option>
                            {commonWidgetTypes
                              .sort((a, b) => a.localeCompare(b))
                              .map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                          </select>
                          {service.widget && (
                            <>
                              <input
                                type="text"
                                value={service.widget.url || ''}
                                onChange={(e) => updateService(service.id, { 
                                  widget: { ...service.widget, url: e.target.value }
                                })}
                                placeholder="API URL"
                                className="bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                              />
                              <input
                                type="text"
                                value={service.widget.key || ''}
                                onChange={(e) => updateService(service.id, { 
                                  widget: { ...service.widget, key: e.target.value }
                                })}
                                placeholder="API Key"
                                className="bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                              />
                            </>
                          )}
                        </div>

                        {/* Proxmox Configuration */}
                        {service.enableProxmox && (
                          <div className="mt-4 pt-3 border-t border-slate-600">
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-slate-300 text-sm font-medium">Proxmox Configuration</label>
                              <button
                                onClick={() => updateService(service.id, { 
                                  enableProxmox: false,
                                  proxmoxNode: undefined,
                                  proxmoxVMID: undefined,
                                  proxmoxType: undefined
                                })}
                                className="text-red-400 hover:text-red-300 text-xs"
                                title="Remove Proxmox Configuration"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Node Name</label>
                                <input
                                  type="text"
                                  value={service.proxmoxNode || 'pve'}
                                  onChange={(e) => updateService(service.id, { proxmoxNode: e.target.value })}
                                  placeholder="pve"
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">VM/Container ID</label>
                                <input
                                  type="number"
                                  value={service.proxmoxVMID || 101}
                                  onChange={(e) => updateService(service.id, { proxmoxVMID: parseInt(e.target.value) || 101 })}
                                  placeholder="101"
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Type</label>
                                <select
                                  value={service.proxmoxType || 'qemu'}
                                  onChange={(e) => updateService(service.id, { proxmoxType: e.target.value })}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="qemu">Virtual Machine (qemu)</option>
                                  <option value="lxc">Container (lxc)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Add Proxmox Configuration Button */}
                        {!service.enableProxmox && (
                          <div className="mt-4 pt-3 border-t border-slate-600">
                            <button
                              onClick={() => updateService(service.id, { 
                                enableProxmox: true,
                                proxmoxNode: 'pve',
                                proxmoxVMID: 101,
                                proxmoxType: 'qemu'
                              })}
                              className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Proxmox Configuration</span>
                            </button>
                          </div>
                        )}

                        {/* Proxmox Backup Server Configuration */}
                        {service.widget?.type === 'proxmoxbackupserver' && (
                          <div className="mt-4 pt-3 border-t border-slate-600">
                            <label className="block text-slate-300 mb-2 text-sm font-medium">Proxmox Backup Server Configuration</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Username (API Token ID)</label>
                                <input
                                  type="text"
                                  value={service.widget?.username || 'api_token_id'}
                                  onChange={(e) => updateService(service.id, { 
                                    widget: { ...service.widget, username: e.target.value }
                                  })}
                                  placeholder="user@pbs!tokenid"
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Password (API Token Secret)</label>
                                <input
                                  type="password"
                                  value={service.widget?.password || 'api_token_secret'}
                                  onChange={(e) => updateService(service.id, { 
                                    widget: { ...service.widget, password: e.target.value }
                                  })}
                                  placeholder="API Token Secret"
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                />
                              </div>
                            </div>
                            <div className="mt-2">
                              <label className="block text-xs text-slate-400 mb-1">Datastore (Optional)</label>
                              <input
                                type="text"
                                value={service.widget?.datastore || ''}
                                onChange={(e) => updateService(service.id, { 
                                  widget: { ...service.widget, datastore: e.target.value }
                                })}
                                placeholder="datastore_name (leave empty for combined usage)"
                                className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                              />
                            </div>
                          </div>
                        )}

                        {/* Ping Configuration */}
                        <div className="mt-4 pt-3 border-t border-slate-600">
                          <label className="block text-slate-300 mb-2 text-sm font-medium">Ping Configuration (Optional)</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-slate-400 mb-1">Host/URL to ping</label>
                              <input
                                type="text"
                                value={service.ping?.url || ''}
                                onChange={(e) => updateService(service.id, { 
                                  ping: { ...(service.ping || {}), url: e.target.value }
                                })}
                                placeholder="example.com or http://localhost:8080"
                                className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-slate-400 mb-1">Interval (seconds)</label>
                              <input
                                type="number"
                                value={service.ping?.interval || 30}
                                onChange={(e) => updateService(service.id, { 
                                  ping: { ...(service.ping || {}), interval: parseInt(e.target.value) || 30 }
                                })}
                                placeholder="30"
                                min="10"
                                max="3600"
                                className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <label className="flex items-center gap-2 text-xs text-slate-400">
                              <input
                                type="checkbox"
                                checked={service.ping?.enabled || false}
                                onChange={(e) => updateService(service.id, { 
                                  ping: { ...(service.ping || {}), enabled: e.target.checked }
                                })}
                                className="rounded"
                              />
                              Enable ping monitoring
                            </label>
                            <label className="flex items-center gap-2 text-xs text-slate-400">
                              <input
                                type="checkbox"
                                checked={service.ping?.public || false}
                                onChange={(e) => updateService(service.id, { 
                                  ping: { ...(service.ping || {}), public: e.target.checked }
                                })}
                                className="rounded"
                              />
                              Show publicly
                            </label>
                          </div>
                        </div>
                      </div>
                      </>
                      )}
                    </div>
                  ))}

                  {/* Subgroups */}
                  {(group.subgroups || []).map((subgroup) => (
                    <div key={subgroup.id} className="mt-4 bg-slate-700 rounded-lg p-3 border border-slate-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {editingGroup === subgroup.id ? (
                            <input
                              type="text"
                              value={subgroup.name}
                              onChange={(e) => updateSubgroup(group.id, subgroup.id, { name: e.target.value })}
                              onBlur={() => setEditingGroup(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingGroup(null)}
                              className="bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                              autoFocus
                            />
                          ) : (
                            <h4
                              className="text-sm font-medium text-blue-300 cursor-pointer hover:text-blue-200 transition-colors"
                              onClick={() => setEditingGroup(subgroup.id)}
                            >
                              📁 {subgroup.name}
                            </h4>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addServiceToSubgroup(group.id, subgroup.id)}
                            className="p-1 text-green-400 hover:text-green-300 hover:bg-slate-600 rounded transition-all text-xs"
                            title="Add service to subgroup"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <div className="flex gap-1">
                            <select
                              value={selectedQuickAdd[`${group.id}_${subgroup.id}`] || ''}
                              onChange={(e) => setSelectedQuickAdd(prev => ({ ...prev, [`${group.id}_${subgroup.id}`]: e.target.value }))}
                              className="bg-slate-600 text-white text-xs px-1 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            >
                              <option value="">Quick add...</option>
                              {Object.entries(commonServices)
                                .sort(([,a], [,b]) => a.name.localeCompare(b.name))
                                .map(([key, service]) => (
                                  <option key={key} value={key}>{service.name}</option>
                                ))}
                            </select>
                            <button
                              onClick={() => quickAddServiceToSubgroup(group.id, subgroup.id)}
                              disabled={!selectedQuickAdd[`${group.id}_${subgroup.id}`]}
                              className="px-1 py-1 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:text-slate-400 rounded transition-colors"
                              title="Add selected service with defaults"
                            >
                              Add
                            </button>
                          </div>
                          <button
                            onClick={() => deleteSubgroup(group.id, subgroup.id)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors text-xs"
                            title="Delete subgroup"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Subgroup Services */}
                      <div className="space-y-2">
                        {subgroup.services.map((service, serviceIndex) => (
                          <div
                            key={service.id}
                            className="bg-slate-600 rounded p-3 border border-slate-500 hover:border-slate-400 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleServiceCollapse(service.id)}
                                  className="p-1 text-slate-400 hover:text-slate-200 rounded transition-all"
                                  title={collapsedServices[service.id] ? "Expand service" : "Collapse service"}
                                >
                                  <ChevronRight 
                                    className={`h-3 w-3 transition-transform duration-200 ${
                                      collapsedServices[service.id] ? 'rotate-0' : 'rotate-90'
                                    }`} 
                                  />
                                </button>
                                <span className="text-xs text-slate-400 font-mono bg-slate-700 px-2 py-1 rounded">
                                  {serviceIndex + 1}
                                </span>
                                {editingService === service.id ? (
                                  <input
                                    type="text"
                                    value={service.name}
                                    onChange={(e) => updateService(service.id, { name: e.target.value })}
                                    onBlur={() => setEditingService(null)}
                                    onKeyDown={(e) => e.key === 'Enter' && setEditingService(null)}
                                    className="bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                                    autoFocus
                                  />
                                ) : (
                                  <span
                                    className="font-medium cursor-pointer hover:text-blue-300 transition-colors text-sm"
                                    onClick={() => setEditingService(service.id)}
                                  >
                                    {service.name}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => deleteService(service.id)}
                                className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                title="Delete service"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>

                            {!collapsedServices[service.id] && (
                            <>
                            {/* Service Form Fields - Same as main group services but with smaller styling */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                              <div>
                                <label className="block text-slate-300 mb-1 text-xs">Service URL</label>
                                <input
                                  type="url"
                                  value={service.href || ''}
                                  onChange={(e) => updateService(service.id, { href: e.target.value })}
                                  placeholder="http://localhost:8080"
                                  className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-300 mb-1 text-xs">Icon</label>
                                <input
                                  type="text"
                                  value={service.icon || ''}
                                  onChange={(e) => updateService(service.id, { icon: e.target.value })}
                                  placeholder="service-name or mdi-icon"
                                  className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                />
                              </div>
                            </div>

                            <div className="mt-2">
                              <label className="block text-slate-300 mb-1 text-xs">Description</label>
                              <input
                                type="text"
                                value={service.description || ''}
                                onChange={(e) => updateService(service.id, { description: e.target.value })}
                                placeholder="Brief description of the service"
                                className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                              />
                            </div>

                            {/* Widget Configuration */}
                            <div className="mt-3 pt-2 border-t border-slate-500">
                              <label className="block text-slate-300 mb-1 text-xs font-medium">Widget Configuration (Optional)</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs text-slate-400 mb-1">Widget Type</label>
                                  <select
                                    value={service.widget?.type || ''}
                                    onChange={(e) => updateService(service.id, { 
                                      widget: { ...(service.widget || {}), type: e.target.value }
                                    })}
                                    className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                  >
                                    <option value="">Select widget type</option>
                                    {commonWidgetTypes.sort().map(type => (
                                      <option key={type} value={type}>{type}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs text-slate-400 mb-1">Widget URL</label>
                                  <input
                                    type="text"
                                    value={service.widget?.url || ''}
                                    onChange={(e) => updateService(service.id, { 
                                      widget: { ...(service.widget || {}), url: e.target.value }
                                    })}
                                    placeholder="http://localhost:8080"
                                    className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                  />
                                </div>
                              </div>
                              {service.widget?.type && (
                                <div className="mt-2">
                                  <label className="block text-xs text-slate-400 mb-1">API Key</label>
                                  <input
                                    type="text"
                                    value={service.widget.key || ''}
                                    onChange={(e) => updateService(service.id, { 
                                      widget: { ...service.widget, key: e.target.value }
                                    })}
                                    placeholder="API Key"
                                    className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Proxmox Configuration */}
                            {service.enableProxmox && (
                              <div className="mt-3 pt-2 border-t border-slate-500">
                                <div className="flex items-center justify-between mb-1">
                                  <label className="text-slate-300 text-xs font-medium">Proxmox Configuration</label>
                                  <button
                                    onClick={() => updateService(service.id, { 
                                      enableProxmox: false,
                                      proxmoxNode: undefined,
                                      proxmoxVMID: undefined,
                                      proxmoxType: undefined
                                    })}
                                    className="text-red-400 hover:text-red-300 text-xs"
                                    title="Remove Proxmox Configuration"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">Node Name</label>
                                    <input
                                      type="text"
                                      value={service.proxmoxNode || 'pve'}
                                      onChange={(e) => updateService(service.id, { proxmoxNode: e.target.value })}
                                      placeholder="pve"
                                      className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">VM/Container ID</label>
                                    <input
                                      type="number"
                                      value={service.proxmoxVMID || 101}
                                      onChange={(e) => updateService(service.id, { proxmoxVMID: parseInt(e.target.value) || 101 })}
                                      placeholder="101"
                                      className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">Type</label>
                                    <select
                                      value={service.proxmoxType || 'qemu'}
                                      onChange={(e) => updateService(service.id, { proxmoxType: e.target.value })}
                                      className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                    >
                                      <option value="qemu">VM (qemu)</option>
                                      <option value="lxc">Container (lxc)</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Add Proxmox Configuration Button */}
                            {!service.enableProxmox && (
                              <div className="mt-3 pt-2 border-t border-slate-500">
                                <button
                                  onClick={() => updateService(service.id, { 
                                    enableProxmox: true,
                                    proxmoxNode: 'pve',
                                    proxmoxVMID: 101,
                                    proxmoxType: 'qemu'
                                  })}
                                  className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-colors text-xs"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Add Proxmox Configuration</span>
                                </button>
                              </div>
                            )}

                            {/* Proxmox Backup Server Configuration */}
                            {service.widget?.type === 'proxmoxbackupserver' && (
                              <div className="mt-3 pt-2 border-t border-slate-500">
                                <label className="block text-slate-300 mb-1 text-xs font-medium">Proxmox Backup Server Configuration</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">Username (API Token ID)</label>
                                    <input
                                      type="text"
                                      value={service.widget?.username || 'api_token_id'}
                                      onChange={(e) => updateService(service.id, { 
                                        widget: { ...service.widget, username: e.target.value }
                                      })}
                                      placeholder="user@pbs!tokenid"
                                      className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-400 mb-1">Password (API Token Secret)</label>
                                    <input
                                      type="password"
                                      value={service.widget?.password || 'api_token_secret'}
                                      onChange={(e) => updateService(service.id, { 
                                        widget: { ...service.widget, password: e.target.value }
                                      })}
                                      placeholder="API Token Secret"
                                      className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label className="block text-xs text-slate-400 mb-1">Datastore (Optional)</label>
                                  <input
                                    type="text"
                                    value={service.widget?.datastore || ''}
                                    onChange={(e) => updateService(service.id, { 
                                      widget: { ...service.widget, datastore: e.target.value }
                                    })}
                                    placeholder="datastore_name (optional)"
                                    className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Ping Configuration */}
                            <div className="mt-3 pt-2 border-t border-slate-500">
                              <label className="block text-slate-300 mb-1 text-xs font-medium">Ping Configuration (Optional)</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs text-slate-400 mb-1">Host/URL to ping</label>
                                  <input
                                    type="text"
                                    value={service.ping?.url || ''}
                                    onChange={(e) => updateService(service.id, { 
                                      ping: { ...(service.ping || {}), url: e.target.value }
                                    })}
                                    placeholder="example.com or http://localhost:8080"
                                    className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-slate-400 mb-1">Interval (seconds)</label>
                                  <input
                                    type="number"
                                    value={service.ping?.interval || 30}
                                    onChange={(e) => updateService(service.id, { 
                                      ping: { ...(service.ping || {}), interval: parseInt(e.target.value) || 30 }
                                    })}
                                    placeholder="30"
                                    min="10"
                                    max="3600"
                                    className="w-full bg-slate-500 text-white px-2 py-1 rounded border border-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-4 mt-2">
                                <label className="flex items-center gap-2 text-xs text-slate-400">
                                  <input
                                    type="checkbox"
                                    checked={service.ping?.enabled || false}
                                    onChange={(e) => updateService(service.id, { 
                                      ping: { ...(service.ping || {}), enabled: e.target.checked }
                                    })}
                                    className="rounded"
                                  />
                                  Enable ping monitoring
                                </label>
                                <label className="flex items-center gap-2 text-xs text-slate-400">
                                  <input
                                    type="checkbox"
                                    checked={service.ping?.public || false}
                                    onChange={(e) => updateService(service.id, { 
                                      ping: { ...(service.ping || {}), public: e.target.checked }
                                    })}
                                    className="rounded"
                                  />
                                  Show publicly
                                </label>
                              </div>
                            </div>
                            </>
                            )}
                          </div>
                        ))}
                        {subgroup.services.length === 0 && (
                          <div className="text-center py-2 text-slate-400 text-xs">
                            <p>No services in this subgroup</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Subgroup Button */}
                  <div className="mt-3">
                    <button
                      onClick={() => addSubgroup(group.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-blue-300 hover:text-blue-200 rounded border border-slate-600 hover:border-slate-500 transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      Add Subgroup
                    </button>
                  </div>
                  
                  {group.services.length === 0 && (group.subgroups || []).length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <p>No services in this group</p>
                      <button
                        onClick={() => addService(group.id)}
                        className="mt-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Add your first service
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {config.groups.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Home className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                <p className="mb-4">No groups configured yet</p>
                <button
                  onClick={addGroup}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Create your first group
                </button>
              </div>
            )}
          </div>

          {/* YAML Preview */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-slate-400" />
              <h2 className="text-xl font-semibold">Generated services.yaml</h2>
            </div>
            
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <div className="bg-slate-700 px-4 py-2 text-sm text-slate-300 border-b border-slate-600">
                services.yaml
              </div>
              <pre className="p-4 text-sm overflow-auto max-h-96 text-green-400">
                <code>{generateYAML() || '# No configuration yet'}</code>
              </pre>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
              <h3 className="font-semibold text-blue-300 mb-2">Quick Tips</h3>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Import existing services.yaml files to edit them</li>
                <li>• Use the <span className="text-purple-300 font-semibold">purple "Group" controls</span> to reorder groups</li>
                <li>• Use the <span className="text-blue-300 font-semibold">blue "#" controls</span> to reorder services within groups</li>
                <li>• Numbers show the current position of each service</li>
                <li>• Use "Quick add" dropdown for popular services with defaults</li>
                <li>• Click group/service names to edit them inline</li>
                <li>• Copy or download the YAML when you're done</li>
              </ul>
            </div>

            {/* Quick Add Services */}
            <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800">
              <h3 className="font-semibold text-purple-300 mb-2">Quick Add Services (120+ Available!)</h3>
              <div className="text-sm text-purple-200 space-y-1">
                <div><strong>Media Servers:</strong> Plex, Jellyfin, Emby, AudioBookshelf</div>
                <div><strong>*Arr Stack:</strong> Sonarr, Radarr, Lidarr, Readarr, Prowlarr, Bazarr</div>
                <div><strong>Downloads:</strong> qBittorrent, Transmission, Deluge, SABnzbd, NZBGet, ruTorrent, Flood, JDownloader, pyLoad</div>
                <div><strong>Request Management:</strong> Overseerr, Jellyseerr, Ombi</div>
                <div><strong>Media Management:</strong> Kavita, Komga, TubeArchivist, Calibre-Web</div>
                <div><strong>Photos & Images:</strong> PhotoPrism, Immich</div>
                <div><strong>Files & Backup:</strong> File Browser, Duplicati, Syncthing, Kopia, UrBackup</div>
                <div><strong>Infrastructure:</strong> Portainer, Traefik, Nginx PM, Docker, Yacht, Watchtower</div>
                <div><strong>Monitoring:</strong> Grafana, Uptime Kuma, Prometheus, Netdata, Zabbix, Glances, Scrutiny, Healthchecks, Gatus, Beszel</div>
                <div><strong>Networking & VPN:</strong> UniFi, OPNsense, pfSense, WireGuard, Pi-hole, AdGuard, Cloudflared, Tailscale, Headscale, Gluetun</div>
                <div><strong>Storage & NAS:</strong> TrueNAS, FreeNAS, OpenMediaVault, Synology DiskStation, QNAP, Nextcloud</div>
                <div><strong>Databases:</strong> PostgreSQL, MySQL, phpMyAdmin, pgAdmin, Redis, MongoDB, InfluxDB</div>
                <div><strong>RSS & Reading:</strong> Miniflux, FreshRSS, BookStack, Outline, Wiki.js, Joplin, Trilium</div>
                <div><strong>Bookmarks:</strong> LinkWarden, Wallabag, Shiori</div>
                <div><strong>Communication:</strong> Mattermost, Rocket.Chat, Matrix, Element, Gotify, Mastodon</div>
                <div><strong>Mail:</strong> Mailcow, Roundcube</div>
                <div><strong>Home Automation:</strong> Home Assistant, ESPHome, Homebridge, Node-RED, Zigbee2MQTT, EVCC</div>
                <div><strong>Security & Auth:</strong> Vaultwarden, Authentik, CrowdSec</div>
                <div><strong>Finance & Personal:</strong> Firefly III, Ghostfolio, Grocy, Paperless-ngx, Mealie, Tandoor Recipes, Vikunja</div>
                <div><strong>Development:</strong> Gitea, GitLab, VS Code Server</div>
                <div><strong>Media Processing:</strong> Tdarr, Unmanic, FileFlows</div>
                <div><strong>3D Printing:</strong> Moonraker, OctoPrint</div>
                <div><strong>Gaming:</strong> Minecraft Server, Pterodactyl</div>
                <div><strong>Additional Tools:</strong> ChangeDetection, Speedtest Tracker, SmokePing, Custom API widgets</div>
                <div className="text-xs text-purple-300 mt-2">All include default ports & widget configurations with proper Homepage widget types!</div>
              </div>
            </div>
          </div>
        </div>
        ) : activeTab === 'settings' ? (
          /* Settings Configuration */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Settings Form */}
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm">Title</label>
                      <input
                        type="text"
                        value={settingsConfig.title}
                        onChange={(e) => setSettingsConfig(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                        placeholder="Homepage"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm">Favicon URL</label>
                      <input
                        type="url"
                        value={settingsConfig.favicon}
                        onChange={(e) => setSettingsConfig(prev => ({ ...prev, favicon: e.target.value }))}
                        className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                        placeholder="https://example.com/favicon.ico"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm">Theme</label>
                      <select
                        value={settingsConfig.theme}
                        onChange={(e) => setSettingsConfig(prev => ({ ...prev, theme: e.target.value }))}
                        className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm">Color</label>
                      <select
                        value={settingsConfig.color}
                        onChange={(e) => setSettingsConfig(prev => ({ ...prev, color: e.target.value }))}
                        className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                      >
                        <option value="slate">Slate</option>
                        <option value="gray">Gray</option>
                        <option value="zinc">Zinc</option>
                        <option value="neutral">Neutral</option>
                        <option value="stone">Stone</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="amber">Amber</option>
                        <option value="yellow">Yellow</option>
                        <option value="lime">Lime</option>
                        <option value="green">Green</option>
                        <option value="emerald">Emerald</option>
                        <option value="teal">Teal</option>
                        <option value="cyan">Cyan</option>
                        <option value="sky">Sky</option>
                        <option value="blue">Blue</option>
                        <option value="indigo">Indigo</option>
                        <option value="violet">Violet</option>
                        <option value="purple">Purple</option>
                        <option value="fuchsia">Fuchsia</option>
                        <option value="pink">Pink</option>
                        <option value="rose">Rose</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm">Header Style</label>
                      <select
                        value={settingsConfig.headerStyle}
                        onChange={(e) => setSettingsConfig(prev => ({ ...prev, headerStyle: e.target.value }))}
                        className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                      >
                        <option value="boxed">Boxed</option>
                        <option value="underlined">Underlined</option>
                        <option value="clean">Clean</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm">Language</label>
                      <select
                        value={settingsConfig.language}
                        onChange={(e) => setSettingsConfig(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                      >
                        <option value="en">English</option>
                        <option value="ca">Catalan</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="he">Hebrew</option>
                        <option value="hu">Hungarian</option>
                        <option value="it">Italian</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                        <option value="lv">Latvian</option>
                        <option value="nl">Dutch</option>
                        <option value="no">Norwegian</option>
                        <option value="pl">Polish</option>
                        <option value="pt">Portuguese</option>
                        <option value="ru">Russian</option>
                        <option value="sv">Swedish</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 text-sm">Target</label>
                      <select
                        value={settingsConfig.target}
                        onChange={(e) => setSettingsConfig(prev => ({ ...prev, target: e.target.value }))}
                        className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                      >
                        <option value="_blank">New Tab (_blank)</option>
                        <option value="_self">Same Frame (_self)</option>
                        <option value="_parent">Parent Frame (_parent)</option>
                        <option value="_top">Full Window (_top)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hideVersion"
                      checked={settingsConfig.hideVersion}
                      onChange={(e) => setSettingsConfig(prev => ({ ...prev, hideVersion: e.target.checked }))}
                      className="mr-2"
                    />
                    <label htmlFor="hideVersion" className="text-slate-300 text-sm">Hide Version</label>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium mb-4">Quick Launch Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="searchDescriptions"
                      checked={settingsConfig.quickLaunch.searchDescriptions}
                      onChange={(e) => setSettingsConfig(prev => ({ 
                        ...prev, 
                        quickLaunch: { ...prev.quickLaunch, searchDescriptions: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <label htmlFor="searchDescriptions" className="text-slate-300 text-sm">Search Descriptions</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hideInternetSearch"
                      checked={settingsConfig.quickLaunch.hideInternetSearch}
                      onChange={(e) => setSettingsConfig(prev => ({ 
                        ...prev, 
                        quickLaunch: { ...prev.quickLaunch, hideInternetSearch: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <label htmlFor="hideInternetSearch" className="text-slate-300 text-sm">Hide Internet Search</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hideVisitURL"
                      checked={settingsConfig.quickLaunch.hideVisitURL}
                      onChange={(e) => setSettingsConfig(prev => ({ 
                        ...prev, 
                        quickLaunch: { ...prev.quickLaunch, hideVisitURL: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <label htmlFor="hideVisitURL" className="text-slate-300 text-sm">Hide Visit URL</label>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium mb-4">Weather Providers</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">OpenWeatherMap API Key</label>
                    <input
                      type="text"
                      value={settingsConfig.providers.openweathermap}
                      onChange={(e) => setSettingsConfig(prev => ({ 
                        ...prev, 
                        providers: { ...prev.providers, openweathermap: e.target.value }
                      }))}
                      className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                      placeholder="your-openweathermap-api-key"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">WeatherAPI Key</label>
                    <input
                      type="text"
                      value={settingsConfig.providers.weatherapi}
                      onChange={(e) => setSettingsConfig(prev => ({ 
                        ...prev, 
                        providers: { ...prev.providers, weatherapi: e.target.value }
                      }))}
                      className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                      placeholder="your-weatherapi-key"
                    />
                  </div>
                </div>
              </div>

              {/* UI Preferences */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium mb-4">Interface Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="show-proxmox-tab"
                      checked={uiPreferences.showProxmoxTab}
                      onChange={(e) => {
                      const showTab = e.target.checked;
                      setUiPreferences(prev => ({ ...prev, showProxmoxTab: showTab }));
                      // If hiding the Proxmox tab and it's currently active, switch to services tab
                      if (!showTab && activeTab === 'proxmox') {
                        setActiveTab('services');
                      }
                    }}
                      className="rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-800"
                    />
                    <label htmlFor="show-proxmox-tab" className="text-slate-300 text-sm">
                      <span className="font-medium">Show Proxmox Configuration Tab</span>
                      <div className="text-xs text-slate-400 mt-1">
                        Enable the Proxmox tab for VM/container configuration and monitoring
                      </div>
                    </label>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="global-domain" className="block text-slate-300 text-sm font-medium">
                      Global Domain
                    </label>
                    <input
                      type="text"
                      id="global-domain"
                      value={uiPreferences.globalDomain || 'local'}
                      onChange={(e) => {
                        setUiPreferences(prev => ({ ...prev, globalDomain: e.target.value }));
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-slate-300 focus:outline-none focus:border-blue-500"
                      placeholder="local"
                    />
                    <div className="text-xs text-slate-400">
                      New services will use "servicename.{uiPreferences.globalDomain || 'local'}" format instead of localhost
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings YAML Preview */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-slate-400" />
                <h2 className="text-xl font-semibold">Generated settings.yaml</h2>
              </div>
              
              <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                <div className="bg-slate-700 px-4 py-2 text-sm text-slate-300 border-b border-slate-600">
                  settings.yaml
                </div>
                <pre className="p-4 text-sm overflow-auto max-h-96 text-green-400">
                  <code>{generateSettingsYAML() || '# No configuration yet'}</code>
                </pre>
              </div>

              {/* Settings Tips */}
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
                <h3 className="font-semibold text-blue-300 mb-2">Settings Configuration Tips</h3>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• <strong>Title:</strong> Sets the browser title and header text</li>
                  <li>• <strong>Theme:</strong> Choose between light and dark modes</li>
                  <li>• <strong>Color:</strong> Sets the accent color throughout the interface</li>
                  <li>• <strong>Header Style:</strong> Changes how the header appears</li>
                  <li>• <strong>Language:</strong> Sets the interface language</li>
                  <li>• <strong>Target:</strong> Controls how links open (new tab, same window, etc.)</li>
                  <li>• <strong>Quick Launch:</strong> Configures search behavior</li>
                  <li>• <strong>Weather Providers:</strong> API keys for weather widgets</li>
                </ul>
              </div>
            </div>
          </div>
        ) : activeTab === 'widgets' ? (
          /* Information Widgets Configuration */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Widgets Form */}
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium mb-4">Information Widgets</h3>
                <div className="space-y-4">
                  <p className="text-slate-300 text-sm mb-4">
                    Configure information widgets that display system information, weather, time, and other data on your homepage.
                  </p>
                  
                  {informationWidgets.widgets.map((widget, index) => (
                    <div key={widget.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">
                            {index + 1}
                          </span>
                          <h4 className="font-medium text-slate-200">
                            {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)} Widget
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={widget.enabled}
                              onChange={(e) => {
                                const updatedWidgets = [...informationWidgets.widgets];
                                updatedWidgets[index].enabled = e.target.checked;
                                setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                              }}
                              className="rounded"
                            />
                            <span className="text-slate-300">Enabled</span>
                          </label>
                          <button
                            onClick={() => {
                              const updatedWidgets = informationWidgets.widgets.filter((_, i) => i !== index);
                              setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                            }}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            title="Remove widget"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-slate-300 mb-1 text-sm">Widget Type</label>
                          <select
                            value={widget.type}
                            onChange={(e) => {
                              const updatedWidgets = [...informationWidgets.widgets];
                              updatedWidgets[index].type = e.target.value;
                              setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                            }}
                            className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                          >
                            <option value="datetime">Date & Time</option>
                            <option value="weather">Weather</option>
                            <option value="resources">System Resources</option>
                            <option value="search">Quick Search</option>
                            <option value="bookmarks">Bookmarks</option>
                            <option value="greeting">Greeting</option>
                          </select>
                        </div>
                        
                        {widget.type === 'datetime' && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Time Style</label>
                                <select
                                  value={widget.options.format?.timeStyle || 'short'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.format = {
                                      ...updatedWidgets[index].options.format,
                                      timeStyle: e.target.value
                                    };
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="short">Short (3:30 PM)</option>
                                  <option value="medium">Medium (3:30:45 PM)</option>
                                  <option value="long">Long (3:30:45 PM PST)</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Date Style</label>
                                <select
                                  value={widget.options.format?.dateStyle || 'short'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.format = {
                                      ...updatedWidgets[index].options.format,
                                      dateStyle: e.target.value
                                    };
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="short">Short (1/1/23)</option>
                                  <option value="medium">Medium (Jan 1, 2023)</option>
                                  <option value="long">Long (January 1, 2023)</option>
                                  <option value="full">Full (Sunday, January 1, 2023)</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-slate-300 mb-1 text-sm">Timezone</label>
                              <input
                                type="text"
                                value={widget.options.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone}
                                onChange={(e) => {
                                  const updatedWidgets = [...informationWidgets.widgets];
                                  updatedWidgets[index].options.timezone = e.target.value;
                                  setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                }}
                                placeholder="America/New_York"
                                className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                              />
                            </div>
                            <div>
                              <label className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={widget.options.showSeconds || false}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.showSeconds = e.target.checked;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="rounded"
                                />
                                <span className="text-slate-300">Show seconds</span>
                              </label>
                            </div>
                          </div>
                        )}
                        
                        {widget.type === 'weather' && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Location</label>
                                <input
                                  type="text"
                                  value={widget.options.location || ''}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.location = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  placeholder="City, State or Lat,Lon"
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Units</label>
                                <select
                                  value={widget.options.units || 'metric'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.units = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="metric">Metric (°C)</option>
                                  <option value="imperial">Imperial (°F)</option>
                                </select>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Provider</label>
                                <select
                                  value={widget.options.provider || 'openweathermap'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.provider = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="openweathermap">OpenWeatherMap</option>
                                  <option value="weatherapi">WeatherAPI</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Show</label>
                                <select
                                  value={widget.options.show || 'both'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.show = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="both">Current & Forecast</option>
                                  <option value="current">Current Only</option>
                                  <option value="forecast">Forecast Only</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={widget.options.showForecast || false}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.showForecast = e.target.checked;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="rounded"
                                />
                                <span className="text-slate-300">Show 5-day forecast</span>
                              </label>
                            </div>
                          </div>
                        )}

                        {widget.type === 'resources' && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Refresh Interval (seconds)</label>
                                <input
                                  type="number"
                                  value={widget.options.refresh || 30}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.refresh = parseInt(e.target.value) || 30;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  min="5"
                                  max="300"
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Display Units</label>
                                <select
                                  value={widget.options.units || 'bytes'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.units = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="bytes">Bytes (GB, TB)</option>
                                  <option value="percentage">Percentage (%)</option>
                                  <option value="both">Both</option>
                                </select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-slate-300 text-sm font-medium">Show Resources:</label>
                              <div className="grid grid-cols-2 gap-2">
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={widget.options.cpu !== false}
                                    onChange={(e) => {
                                      const updatedWidgets = [...informationWidgets.widgets];
                                      updatedWidgets[index].options.cpu = e.target.checked;
                                      setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                    }}
                                    className="rounded"
                                  />
                                  <span className="text-slate-300">CPU Usage</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={widget.options.memory !== false}
                                    onChange={(e) => {
                                      const updatedWidgets = [...informationWidgets.widgets];
                                      updatedWidgets[index].options.memory = e.target.checked;
                                      setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                    }}
                                    className="rounded"
                                  />
                                  <span className="text-slate-300">Memory Usage</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={widget.options.disk !== false}
                                    onChange={(e) => {
                                      const updatedWidgets = [...informationWidgets.widgets];
                                      updatedWidgets[index].options.disk = e.target.checked;
                                      setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                    }}
                                    className="rounded"
                                  />
                                  <span className="text-slate-300">Disk Usage</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={widget.options.temp || false}
                                    onChange={(e) => {
                                      const updatedWidgets = [...informationWidgets.widgets];
                                      updatedWidgets[index].options.temp = e.target.checked;
                                      setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                    }}
                                    className="rounded"
                                  />
                                  <span className="text-slate-300">Temperature</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        {widget.type === 'search' && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Placeholder Text</label>
                                <input
                                  type="text"
                                  value={widget.options.placeholder || 'Search...'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.placeholder = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Default Provider</label>
                                <select
                                  value={widget.options.provider || 'google'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.provider = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="google">Google</option>
                                  <option value="bing">Bing</option>
                                  <option value="duckduckgo">DuckDuckGo</option>
                                  <option value="custom">Custom</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={widget.options.showIcon !== false}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.showIcon = e.target.checked;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="rounded"
                                />
                                <span className="text-slate-300">Show search icon</span>
                              </label>
                              <label className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={widget.options.autofocus || false}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.autofocus = e.target.checked;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="rounded"
                                />
                                <span className="text-slate-300">Auto-focus on load</span>
                              </label>
                            </div>
                          </div>
                        )}

                        {widget.type === 'bookmarks' && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Max Items</label>
                                <input
                                  type="number"
                                  value={widget.options.limit || 10}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.limit = parseInt(e.target.value) || 10;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  min="1"
                                  max="50"
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Layout</label>
                                <select
                                  value={widget.options.layout || 'list'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.layout = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="list">Vertical List</option>
                                  <option value="grid">Grid</option>
                                  <option value="compact">Compact</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-slate-300 mb-2 text-sm">Bookmark Categories</label>
                              <textarea
                                value={widget.options.categories || ''}
                                onChange={(e) => {
                                  const updatedWidgets = [...informationWidgets.widgets];
                                  updatedWidgets[index].options.categories = e.target.value;
                                  setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                }}
                                placeholder="Work, Personal, Development (comma-separated)"
                                className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all h-20 resize-none"
                              />
                            </div>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={widget.options.showIcons !== false}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.showIcons = e.target.checked;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="rounded"
                                />
                                <span className="text-slate-300">Show bookmark icons</span>
                              </label>
                            </div>
                          </div>
                        )}

                        {widget.type === 'greeting' && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">User Name</label>
                                <input
                                  type="text"
                                  value={widget.options.name || ''}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.name = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  placeholder="Your name"
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-300 mb-1 text-sm">Time Format</label>
                                <select
                                  value={widget.options.format || '12'}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.format = e.target.value;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                                >
                                  <option value="12">12-hour (AM/PM)</option>
                                  <option value="24">24-hour</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-slate-300 mb-2 text-sm">Custom Messages</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-slate-400 mb-1 text-xs">Morning (6-12)</label>
                                  <input
                                    type="text"
                                    value={widget.options.morning || 'Good morning'}
                                    onChange={(e) => {
                                      const updatedWidgets = [...informationWidgets.widgets];
                                      updatedWidgets[index].options.morning = e.target.value;
                                      setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                    }}
                                    className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-400 mb-1 text-xs">Afternoon (12-17)</label>
                                  <input
                                    type="text"
                                    value={widget.options.afternoon || 'Good afternoon'}
                                    onChange={(e) => {
                                      const updatedWidgets = [...informationWidgets.widgets];
                                      updatedWidgets[index].options.afternoon = e.target.value;
                                      setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                    }}
                                    className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-400 mb-1 text-xs">Evening (17-22)</label>
                                  <input
                                    type="text"
                                    value={widget.options.evening || 'Good evening'}
                                    onChange={(e) => {
                                      const updatedWidgets = [...informationWidgets.widgets];
                                      updatedWidgets[index].options.evening = e.target.value;
                                      setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                    }}
                                    className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-400 mb-1 text-xs">Night (22-6)</label>
                                  <input
                                    type="text"
                                    value={widget.options.night || 'Good night'}
                                    onChange={(e) => {
                                      const updatedWidgets = [...informationWidgets.widgets];
                                      updatedWidgets[index].options.night = e.target.value;
                                      setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                    }}
                                    className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={widget.options.showTime !== false}
                                  onChange={(e) => {
                                    const updatedWidgets = [...informationWidgets.widgets];
                                    updatedWidgets[index].options.showTime = e.target.checked;
                                    setInformationWidgets({ ...informationWidgets, widgets: updatedWidgets });
                                  }}
                                  className="rounded"
                                />
                                <span className="text-slate-300">Show current time</span>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      const newWidget = {
                        id: `widget${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
                        type: 'datetime',
                        enabled: true,
                        options: {
                          format: {
                            timeStyle: 'short',
                            dateStyle: 'short'
                          }
                        }
                      };
                      setInformationWidgets({
                        ...informationWidgets,
                        widgets: [...informationWidgets.widgets, newWidget]
                      });
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm w-full justify-center"
                  >
                    <Plus className="h-4 w-4" />
                    Add Information Widget
                  </button>
                </div>
              </div>
            </div>

            {/* Widgets Preview */}
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium mb-4">YAML Preview</h3>
                <pre className="bg-slate-900 p-4 rounded text-sm text-green-400 font-mono overflow-x-auto max-h-96">
                  <code>{generateWidgetsYAML()}</code>
                </pre>
              </div>

              {/* Widgets Tips */}
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
                <h3 className="font-semibold text-blue-300 mb-2">Information Widgets Configuration</h3>
                <div className="text-sm text-blue-200 space-y-2">
                  <div><strong>Date & Time:</strong> Custom time/date formats, timezone, show seconds</div>
                  <div><strong>Weather:</strong> Location, units, provider (OpenWeatherMap/WeatherAPI), forecast options</div>
                  <div><strong>System Resources:</strong> Refresh interval, display units, CPU/memory/disk/temperature monitoring</div>
                  <div><strong>Search:</strong> Custom placeholder, search provider, icons, auto-focus</div>
                  <div><strong>Bookmarks:</strong> Item limits, layout styles, categories, icon display</div>
                  <div><strong>Greeting:</strong> Personalized name, time format, custom messages for different times of day</div>
                  <div className="text-xs text-blue-300 mt-3 p-2 bg-blue-800/30 rounded">
                    <strong>Pro Tip:</strong> Enable/disable widgets individually and configure each with specific options. 
                    The YAML preview shows your complete configuration ready for Homepage.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'proxmox' ? (
          /* Proxmox Configuration */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Proxmox Form */}
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium mb-4">Proxmox Configuration</h3>
                <div className="space-y-4">
                  <p className="text-slate-300 text-sm mb-4">
                    Configure Proxmox connection settings and manage VMs/containers to display on your homepage.
                  </p>

                  {/* Enable Proxmox */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="proxmox-enabled"
                      checked={proxmoxConfig.enabled}
                      onChange={(e) => setProxmoxConfig({ ...proxmoxConfig, enabled: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="proxmox-enabled" className="text-slate-300">Enable Proxmox Integration</label>
                  </div>

                  {proxmoxConfig.enabled && (
                    <>
                      {/* Connection Settings */}
                      <div className="space-y-3">
                        <label className="block text-slate-300 text-sm font-medium">Connection Settings</label>
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Proxmox URL</label>
                            <input
                              type="url"
                              value={proxmoxConfig.url}
                              onChange={(e) => setProxmoxConfig({ ...proxmoxConfig, url: e.target.value })}
                              placeholder="https://proxmox.example.com:8006"
                              className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">API Token ID</label>
                            <input
                              type="text"
                              value={proxmoxConfig.username}
                              onChange={(e) => setProxmoxConfig({ ...proxmoxConfig, username: e.target.value })}
                              placeholder="user@pve!tokenid"
                              className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">API Token Secret</label>
                            <input
                              type="password"
                              value={proxmoxConfig.password}
                              onChange={(e) => setProxmoxConfig({ ...proxmoxConfig, password: e.target.value })}
                              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                              className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Nodes */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block text-slate-300 text-sm font-medium">Nodes</label>
                          <button
                            onClick={() => {
                              const newNode = {
                                id: `node${Date.now()}`,
                                name: 'new-node',
                                enabled: true
                              };
                              setProxmoxConfig({ ...proxmoxConfig, nodes: [...proxmoxConfig.nodes, newNode] });
                            }}
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                            Add Node
                          </button>
                        </div>
                        {proxmoxConfig.nodes.map((node, index) => (
                          <div key={node.id} className="flex items-center gap-3 p-3 bg-slate-700 rounded border border-slate-600">
                            <input
                              type="checkbox"
                              checked={node.enabled}
                              onChange={(e) => {
                                const updatedNodes = [...proxmoxConfig.nodes];
                                updatedNodes[index].enabled = e.target.checked;
                                setProxmoxConfig({ ...proxmoxConfig, nodes: updatedNodes });
                              }}
                              className="rounded"
                            />
                            <input
                              type="text"
                              value={node.name}
                              onChange={(e) => {
                                const updatedNodes = [...proxmoxConfig.nodes];
                                updatedNodes[index].name = e.target.value;
                                setProxmoxConfig({ ...proxmoxConfig, nodes: updatedNodes });
                              }}
                              placeholder="Node name"
                              className="flex-1 bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                            />
                            <button
                              onClick={() => {
                                const updatedNodes = proxmoxConfig.nodes.filter((_, i) => i !== index);
                                setProxmoxConfig({ ...proxmoxConfig, nodes: updatedNodes });
                              }}
                              className="p-1 text-red-400 hover:text-red-300 transition-colors"
                              title="Remove node"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* VMs */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block text-slate-300 text-sm font-medium">Virtual Machines & Containers</label>
                          <button
                            onClick={() => {
                              const newVM = {
                                id: `vm${Date.now()}`,
                                name: 'New VM',
                                vmid: 100,
                                node: 'pve',
                                type: 'qemu',
                                enabled: true
                              };
                              setProxmoxConfig({ ...proxmoxConfig, vms: [...proxmoxConfig.vms, newVM] });
                            }}
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                            Add VM
                          </button>
                        </div>
                        {proxmoxConfig.vms.map((vm, index) => (
                          <div key={vm.id} className="space-y-2 p-3 bg-slate-700 rounded border border-slate-600">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={vm.enabled}
                                onChange={(e) => {
                                  const updatedVMs = [...proxmoxConfig.vms];
                                  updatedVMs[index].enabled = e.target.checked;
                                  setProxmoxConfig({ ...proxmoxConfig, vms: updatedVMs });
                                }}
                                className="rounded"
                              />
                              <input
                                type="text"
                                value={vm.name}
                                onChange={(e) => {
                                  const updatedVMs = [...proxmoxConfig.vms];
                                  updatedVMs[index].name = e.target.value;
                                  setProxmoxConfig({ ...proxmoxConfig, vms: updatedVMs });
                                }}
                                placeholder="VM Name"
                                className="flex-1 bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-sm"
                              />
                              <button
                                onClick={() => {
                                  const updatedVMs = proxmoxConfig.vms.filter((_, i) => i !== index);
                                  setProxmoxConfig({ ...proxmoxConfig, vms: updatedVMs });
                                }}
                                className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                title="Remove VM"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">VM ID</label>
                                <input
                                  type="number"
                                  value={vm.vmid}
                                  onChange={(e) => {
                                    const updatedVMs = [...proxmoxConfig.vms];
                                    updatedVMs[index].vmid = parseInt(e.target.value) || 100;
                                    setProxmoxConfig({ ...proxmoxConfig, vms: updatedVMs });
                                  }}
                                  min="100"
                                  max="999999"
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Node</label>
                                <select
                                  value={vm.node}
                                  onChange={(e) => {
                                    const updatedVMs = [...proxmoxConfig.vms];
                                    updatedVMs[index].node = e.target.value;
                                    setProxmoxConfig({ ...proxmoxConfig, vms: updatedVMs });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                >
                                  {proxmoxConfig.nodes.filter(n => n.enabled).map(node => (
                                    <option key={node.id} value={node.name}>{node.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Type</label>
                                <select
                                  value={vm.type}
                                  onChange={(e) => {
                                    const updatedVMs = [...proxmoxConfig.vms];
                                    updatedVMs[index].type = e.target.value;
                                    setProxmoxConfig({ ...proxmoxConfig, vms: updatedVMs });
                                  }}
                                  className="w-full bg-slate-600 text-white px-2 py-1 rounded border border-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all text-xs"
                                >
                                  <option value="qemu">VM (qemu)</option>
                                  <option value="lxc">Container (lxc)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Proxmox Preview */}
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium mb-4">YAML Preview</h3>
                <pre className="bg-slate-900 p-4 rounded text-sm text-green-400 font-mono overflow-x-auto max-h-96">
                  <code>{generateProxmoxYAML()}</code>
                </pre>
              </div>

              {/* Proxmox Tips */}
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
                <h3 className="font-semibold text-blue-300 mb-2">Proxmox Configuration Tips</h3>
                <div className="text-sm text-blue-200 space-y-2">
                  <div><strong>API Token:</strong> Create an API token in Proxmox datacenter permissions</div>
                  <div><strong>URL Format:</strong> Use https://your-proxmox-host:8006</div>
                  <div><strong>VM Types:</strong> qemu for virtual machines, lxc for containers</div>
                  <div><strong>Node Names:</strong> Use exact node names as shown in Proxmox cluster</div>
                  <div className="text-xs text-blue-300 mt-3 p-2 bg-blue-800/30 rounded">
                    <strong>Pro Tip:</strong> Enable the Proxmox integration in Homepage's settings.yaml to see real-time VM status and resource usage.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomepageConfigGUI;