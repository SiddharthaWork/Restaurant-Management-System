require("dotenv").config();
module.exports = {
  apps: [
    {
      name: "restaurantserver",
      script: "dist/app/app.js", // Path to the compiled JS file
      interpreter: "node", // Default node interpreter
      env: {
        NODE_ENV: "production",
        ...process.env,
      },
      watch: false, // Set true if you want automatic reloads on code changes
      exec_mode: "fork", // Can also be 'cluster' for multiple instances
      instances: 1, // Number of instances (1 for single-threaded)
      max_memory_restart: "300M", // Auto-restart if memory exceeds this limit
      error_file: "/home/nabin/.pm2/logs/restaurantserver-error.log",
      out_file: "/home/nabin/.pm2/logs/restaurantserver-out.log",
    },
  ],
};
