// config.js

require("dotenv").config();

const mongoDbConfig = {
  username: process.env.MONGO_DB_USERNAME,
  password: process.env.MONGO_DB_PASSWORD,
  host: process.env.MONGO_DB_HOST,
  port: process.env.MONGO_DB_PORT,
  name: process.env.MONGO_DB_NAME,
  authSource: process.env.MONGO_DB_NAME,
};

export const mongodb = {
  // uri:`mongodb://${mongoDbConfig.username}:${mongoDbConfig.password}@${mongoDbConfig.host}:${mongoDbConfig.port}/${mongoDbConfig.name}?authSource=${mongoDbConfig.authSource}`
  uri: `mongodb://${mongoDbConfig.host}:${mongoDbConfig.port}/${mongoDbConfig.name}?authSource=${mongoDbConfig.authSource}`,
};
export const rabbitmq = {
  url: process.env.RABBITMQ_URL || "amqp://localhost",
  inputQueue: process.env.INPUT_QUEUE || "input_queue",
  outputQueue: process.env.OUTPUT_QUEUE || "output_queue",
};
export const shopify = {
  webhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET,
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
  SHOPIFY_STORE_URL: process.env.SHOPIFY_STORE_URL,
  SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_SHOP_NAME: process.env.SHOPIFY_SHOP_NAME,
};
export const api = {
  clientId: process.env.API_CLIENT_ID,
  clientSecret: process.env.API_CLIENT_SECRET,
  url: process.env.API_URL,
  tokenUrl: process.env.API_TOKEN_URL,
};
export const server = {
  port: process.env.PORT || 4000,
};
