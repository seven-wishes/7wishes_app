module.exports = {
  apps: [
    {
      name: '7-wishes app',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './bin/www',
      args: 'start',
      env: {
        NODE_ENV: "production",
      },
    }
  ]
}