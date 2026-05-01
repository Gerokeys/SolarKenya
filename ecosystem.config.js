// PM2 process configuration for production deployment
module.exports = {
  apps: [
    {
      name: 'solar-kenya-api',
      script: 'backend/server.js',
      cwd: './',
      instances: 'max',    // Cluster mode — uses all CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      max_memory_restart: '512M',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
