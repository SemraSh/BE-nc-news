module.exports = {
  DB: {
    dev: process.env.PROD_MONGODB || 'mongodb://localhost/northcoders-news-api',
    test: 'mongodb://localhost/northcoders-news-api-test'
  },
  PORT: {
    dev: process.env.PORT || 3000,
    test: 3090
  }
};