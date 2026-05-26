const config = {
  appName: process.env.APP_NAME ?? 'mcp-server',
  port: Number(process.env.PORT ?? 3000)
};

export default config;
