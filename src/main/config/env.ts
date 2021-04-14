export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  // clean-node-api -> nome do database
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || '3j4bedndsi4jeaw233cqw8q43kfq'
}
