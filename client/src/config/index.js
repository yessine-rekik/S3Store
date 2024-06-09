export default {
  ENV: process.env.NEXT_PUBLIC_ENV || 'dev',

  DEV_BASE_URL: 'http://localhost:4000/api',

  STAGING_BASE_URL: 'http://staging.s3store.com/api',

  PROD_BASE_URL: 'http://s3store.com/api',
};
