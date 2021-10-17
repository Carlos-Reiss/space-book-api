export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  prisma: {
    databaseURL:
      process.env.DATABASE_URL ||
      'postgresql://root:root@localhost:5432/space_book?schema=public',
  },
  server: {
    port: process.env.PORT || 3030,
  },
  session: {
    expiration: process.env.SESSION_EXPIRATION || '1d',
    jwtSecret: process.env.JWT_SECRET_KEY || 'space-book',
  },
  mailer: {
    host: process.env.MAIL_HOST || '',
    port: process.env.MAIL_PORT || 587,
    auth: {
      user: process.env.MAIL_USER || '',
      pass: process.env.MAIL_PASS || '',
    },
  },
});
