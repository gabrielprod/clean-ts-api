export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  // clean-node-api -> nome do database
  port: process.env.PORT || 8080
}
