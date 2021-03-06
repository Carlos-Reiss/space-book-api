export default () => ({
  nodeEnv: process.env.NODE_ENV || 'production',
  prisma: {
    databaseURL:
      process.env.DATABASE_URL ||
      'postgresql://root:root@localhost:5432/space_book?schema=public',
  },
  server: {
    port: (process.env.PORT && parseInt(process.env.PORT)) || 3030,
  },
});
