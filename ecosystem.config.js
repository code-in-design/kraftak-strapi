module.exports = {
  apps: [
    {
      name: 'kraftak-prod',
      script: 'npm',
      args: 'run start',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
