const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables for file paths
const HOMEPAGE_CONFIG_PATH = process.env.HOMEPAGE_CONFIG_PATH || '/config';
const SERVICES_FILE = process.env.SERVICES_FILE || 'services.yaml';
const SETTINGS_FILE = process.env.SETTINGS_FILE || 'settings.yaml';
const WIDGETS_FILE = process.env.WIDGETS_FILE || 'widgets.yaml';

// Enable live file updates (disabled by default for security)
const ENABLE_LIVE_UPDATES = process.env.ENABLE_LIVE_UPDATES === 'true';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'build')));

// Helper function to get full file path
const getFilePath = (filename) => path.join(HOMEPAGE_CONFIG_PATH, filename);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    liveUpdates: ENABLE_LIVE_UPDATES,
    configPath: HOMEPAGE_CONFIG_PATH 
  });
});

// Get configuration status
app.get('/api/config/status', async (req, res) => {
  try {
    const status = {
      liveUpdates: ENABLE_LIVE_UPDATES,
      configPath: HOMEPAGE_CONFIG_PATH,
      files: {}
    };

    // Check if files exist
    const filesToCheck = [
      { key: 'services', path: getFilePath(SERVICES_FILE) },
      { key: 'settings', path: getFilePath(SETTINGS_FILE) },
      { key: 'widgets', path: getFilePath(WIDGETS_FILE) }
    ];

    for (const file of filesToCheck) {
      try {
        const stats = await fs.stat(file.path);
        status.files[file.key] = {
          exists: true,
          path: file.path,
          size: stats.size,
          modified: stats.mtime
        };
      } catch (error) {
        status.files[file.key] = {
          exists: false,
          path: file.path,
          error: error.code
        };
      }
    }

    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check configuration status', details: error.message });
  }
});

// Read configuration file
app.get('/api/config/:type', async (req, res) => {
  const { type } = req.params;
  
  if (!ENABLE_LIVE_UPDATES) {
    return res.status(403).json({ error: 'Live updates are disabled' });
  }

  let filename;
  switch (type) {
    case 'services':
      filename = SERVICES_FILE;
      break;
    case 'settings':
      filename = SETTINGS_FILE;
      break;
    case 'widgets':
      filename = WIDGETS_FILE;
      break;
    default:
      return res.status(400).json({ error: 'Invalid configuration type' });
  }

  try {
    const filePath = getFilePath(filename);
    const content = await fs.readFile(filePath, 'utf8');
    res.json({ content, path: filePath });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Configuration file not found', path: getFilePath(filename) });
    } else {
      res.status(500).json({ error: 'Failed to read configuration file', details: error.message });
    }
  }
});

// Write configuration file
app.post('/api/config/:type', async (req, res) => {
  const { type } = req.params;
  const { content } = req.body;

  if (!ENABLE_LIVE_UPDATES) {
    return res.status(403).json({ error: 'Live updates are disabled' });
  }

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  let filename;
  switch (type) {
    case 'services':
      filename = SERVICES_FILE;
      break;
    case 'settings':
      filename = SETTINGS_FILE;
      break;
    case 'widgets':
      filename = WIDGETS_FILE;
      break;
    default:
      return res.status(400).json({ error: 'Invalid configuration type' });
  }

  try {
    const filePath = getFilePath(filename);
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    // Create backup of existing file if it exists
    try {
      const existingContent = await fs.readFile(filePath, 'utf8');
      const backupPath = `${filePath}.backup.${Date.now()}`;
      await fs.writeFile(backupPath, existingContent, 'utf8');
    } catch (error) {
      // File doesn't exist yet, no backup needed
    }
    
    // Write new content
    await fs.writeFile(filePath, content, 'utf8');
    
    res.json({ 
      success: true, 
      path: filePath,
      message: `${type}.yaml updated successfully`
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to write configuration file', 
      details: error.message 
    });
  }
});

// Delete configuration file backup
app.delete('/api/config/:type/backup/:timestamp', async (req, res) => {
  const { type, timestamp } = req.params;

  if (!ENABLE_LIVE_UPDATES) {
    return res.status(403).json({ error: 'Live updates are disabled' });
  }

  let filename;
  switch (type) {
    case 'services':
      filename = SERVICES_FILE;
      break;
    case 'settings':
      filename = SETTINGS_FILE;
      break;
    case 'widgets':
      filename = WIDGETS_FILE;
      break;
    default:
      return res.status(400).json({ error: 'Invalid configuration type' });
  }

  try {
    const backupPath = `${getFilePath(filename)}.backup.${timestamp}`;
    await fs.unlink(backupPath);
    res.json({ success: true, message: 'Backup deleted successfully' });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Backup file not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete backup file', details: error.message });
    }
  }
});

// List backup files
app.get('/api/config/:type/backups', async (req, res) => {
  const { type } = req.params;

  if (!ENABLE_LIVE_UPDATES) {
    return res.status(403).json({ error: 'Live updates are disabled' });
  }

  let filename;
  switch (type) {
    case 'services':
      filename = SERVICES_FILE;
      break;
    case 'settings':
      filename = SETTINGS_FILE;
      break;
    case 'widgets':
      filename = WIDGETS_FILE;
      break;
    default:
      return res.status(400).json({ error: 'Invalid configuration type' });
  }

  try {
    const configDir = path.dirname(getFilePath(filename));
    const files = await fs.readdir(configDir);
    const backupPrefix = `${filename}.backup.`;
    
    const backups = [];
    for (const file of files) {
      if (file.startsWith(backupPrefix)) {
        const filePath = path.join(configDir, file);
        const stats = await fs.stat(filePath);
        const timestamp = file.replace(backupPrefix, '');
        
        backups.push({
          timestamp,
          path: filePath,
          size: stats.size,
          created: stats.mtime,
          date: new Date(parseInt(timestamp))
        });
      }
    }
    
    // Sort by timestamp descending (newest first)
    backups.sort((a, b) => b.timestamp - a.timestamp);
    
    res.json(backups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list backup files', details: error.message });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Homepage Config GUI running on port ${PORT}`);
  console.log(`Live updates: ${ENABLE_LIVE_UPDATES ? 'ENABLED' : 'DISABLED'}`);
  console.log(`Config path: ${HOMEPAGE_CONFIG_PATH}`);
  
  if (ENABLE_LIVE_UPDATES) {
    console.log(`Services file: ${getFilePath(SERVICES_FILE)}`);
    console.log(`Settings file: ${getFilePath(SETTINGS_FILE)}`);
    console.log(`Widgets file: ${getFilePath(WIDGETS_FILE)}`);
  }
});