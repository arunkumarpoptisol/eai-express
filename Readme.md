# EOI-EXPRESSJS:

## Overview

This Node.js application listens to RabbitMQ, triggers an adapter to fetch data from an API, processes it with a dynamic JSONata expression, and sends the transformed data to another RabbitMQ queue. Additionally, it includes an Express API to handle webhooks from Shopify.
## Project Structure

```plaintext
EOI-EXPRESSJS/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── config.js
│   │
│   ├── controllers/
│   │   ├── rabbitmqController.js
│   │   └── shopifyController.js
│   │
│   ├── expression/
│   │    └── shopifyExpression.js
│   │
│   ├── models/
│   │   └── Log.js
│   │
│   ├── routes/
│   │    └── shopifyRoutes.js
│   │
│   ├── services/
│   │    └── shopifyService.js
│   │
│   ├── utils/
│   │   ├── responseUtil.js
│   │   ├── shopifyApiHelper.js
│   │   └── helpers.js
│   │
│   └── app.js
│
├── .env
├── .env.example
├── README.md
├── package.json
├── tsconfig.json
└── package-lock.json
```
## Features

- **RabbitMQ Integration**: Listens to an input queue and processes messages.
- **Dynamic Adapter**: Retrieves an authentication token and fetches data from a specified API.
- **Data Transformation**: Applies dynamic JSONata expressions to transform data.
- **Shopify Webhook Handling**: Securely handles incoming webhooks from Shopify.
- **Express API**: Manages HTTP requests for the webhook.

## Requirements

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **RabbitMQ** (v3.x or higher)
- **Shopify Webhook Secret** (available in your Shopify admin panel)
- **API Credentials** for the third-party API you are connecting to.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/arunkumaroptisol/eai-expressjs.git
cd rabbitmq-processor
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

## Server Configuration
- `PORT`: The port on which the application will run. Example: `4000`.

## MongoDB Configuration
- `MONGO_DB_NAME`: The name of the MongoDB database. Example: `eoi`.
- `MONGO_DB_USERNAME`: The username to connect to MongoDB. Example: `admin`.
- `MONGO_DB_PASSWORD`: The password to connect to MongoDB. Example: `your-mongo-password`.
- `MONGO_DB_HOST`: The host of the MongoDB database. Example: `localhost`.
- `MONGO_DB_PORT`: The port on which MongoDB is running. Example: `27017`.

## RabbitMQ Configuration
- `RABBITMQ_URL`: The URL for connecting to RabbitMQ. Example: `amqp://localhost`.
- `INPUT_QUEUE`: The input queue name for RabbitMQ. Example: `input_queue`.
- `OUTPUT_QUEUE`: The output queue name for RabbitMQ. Example: `output_queue`.

## API Configuration
- `API_URL`: The API endpoint to fetch data from. Example: `https://api.example.com/data`.
- `API_TOKEN_URL`: The API token endpoint for authentication. Example: `https://api.example.com/token`.

## Shopify Configuration
- `SHOPIFY_WEBHOOK_SECRET`: The secret key for verifying Shopify webhooks. Example: `your-shopify-webhook-secret`.
- `SHOPIFY_API_KEY`: The API key for accessing Shopify's API. Example: `your-shopify-api-key`.
- `SHOPIFY_API_SECRET`: The API secret for accessing Shopify's API. Example: `your-shopify-api-secret`.
- `SHOPIFY_ACCESS_TOKEN`: The access token for Shopify API. Example: `your-shopify-access-token`.
- `SHOPIFY_STORE_URL`: The URL of the Shopify store. Example: `your-shopify-store-url`.
- `SHOPIFY_SHOP_NAME`: The name of the Shopify store. Example: `your-shop-name`.

## API Client Configuration
- `API_CLIENT_ID`: The client ID for accessing external APIs. Example: `your-api-client-id`.
- `API_CLIENT_SECRET`: The client secret for accessing external APIs. Example: `your-api-client-secret`.

## Setup Instructions

1. Create a `.env` file in the root directory.
2. Copy the environment variables listed above into the `.env` file.
3. Replace the placeholder values (e.g., `your-mongo-password`, `your-shopify-api-key`, etc.) with the actual values for your environment.

## Example `.env` file
```bash
PORT=4000

## Mongo
MONGO_DB_NAME=eoi
MONGO_DB_USERNAME=your-mongo-username
MONGO_DB_PASSWORD=your-mongo-password
MONGO_DB_HOST=localhost
MONGO_DB_PORT=27017

## RabbitMQ
RABBITMQ_URL=amqp://localhost
INPUT_QUEUE=input_queue
OUTPUT_QUEUE=output_queue

## API
API_URL=https://api.example.com/data
API_TOKEN_URL=https://api.example.com/token

## Shopify
SHOPIFY_WEBHOOK_SECRET=your-shopify-webhook-secret
SHOPIFY_API_KEY=your-shopify-api-key
SHOPIFY_API_SECRET=your-shopify-api-secret
SHOPIFY_ACCESS_TOKEN=your-shopify-access-token
SHOPIFY_STORE_URL=your-shopify-store-url
SHOPIFY_SHOP_NAME=your-shop-name

## API Client
API_CLIENT_ID=your-api-client-id
API_CLIENT_SECRET=your-api-client-secret
```

### 4. Start RabbitMQ

Ensure that RabbitMQ is installed and running on your machine. You can download and install RabbitMQ from [here](https://www.rabbitmq.com/download.html).

To start RabbitMQ, you can use the following commands depending on your operating system:

### On Linux or macOS

If you installed RabbitMQ using a package manager like `apt` or `brew`, you can start it with:

```bash
sudo service rabbitmq-server start

or

brew services start rabbitmq

```
### On Windows
If you installed RabbitMQ using the installer, you can start it from the Start Menu under `RabbitMQ Server > Start Service`.

Alternatively, you can start it from the command line:

```
rabbitmq-server.bat

```

### If you're using Docker Desktop, you can easily run RabbitMQ in a Docker container.

### Start RabbitMQ in Docker

1. Ensure Docker Desktop is installed and running on your machine.

2. Pull the RabbitMQ Docker image:

   ```bash
   docker pull rabbitmq:3-management
   ```
3. Run RabbitMQ in a container:   
    ```bash      
    docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management 
    ```
   - The `-d` flag runs the container in detached mode.
   - The `--name` rabbitmq option names the container "rabbitmq".
   - The `-p 5672:5672` option maps the RabbitMQ port for AMQP protocol.
   - The `-p 15672:15672` option maps the RabbitMQ management UI to your local machine.


4. Access the RabbitMQ Management UI:

    Open your browser and navigate to http://localhost:15672.

    -  The default username is guest.
    -  The default password is guest.

### 5. Configure MongoDB
Ensure MongoDB is installed and running on your machine. You can download and install MongoDB from [here](https://www.mongodb.com/try/download/community). 

If you're using Docker Desktop, you can easily run MongoDB in a Docker container.

### 6. Run the Application
```bash
npm run dev 

or 

node app.js

or

docker build -t eai-expressjs .
docker run -p 4000:4000 eai-expressjs
docker run eai-expressjs node -v
```
The application will start both the Express server and the RabbitMQ listener.