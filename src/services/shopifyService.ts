// src/services/shopifyService

import { shopify } from "../config/config";
import axios from "axios";
import {
  ORDER_DETAILS_QUERY,
  shopifyApiHelper,
} from "../utils/shopifyApiHelper";
// import { Shopify } from "@shopify/shopify-api";
const { Shopify } = require("@shopify/shopify-api");
// Function to fetch all orders from Shopify REST API
export const getShopifyOrders = async () => {
  try {
    const data = await makeShopifyRequest(`${shopifyApiHelper.Orders}.json`, {
      status: "any",
    });
    return data.orders;
  } catch (error) {
    throw error;
  }
};

// Function to fetch a single order by ID
export const getShopifyOrderById = async (orderId: string) => {
  try {
    const data = await makeShopifyRequest(
      `${shopifyApiHelper.Orders}/${orderId}.json`
    );
    return data.order;
  } catch (error) {
    throw error;
  }
};

// Function to fetch a single order by GraphQL ID
export const getShopifyOrderByGraphQLId = async (orderId: string) => {
  try {
    const data = await shopifyGraphQRequest(orderId);
    return data.order;
  } catch (error) {
    throw error;
  }
};

// Common function to handle Shopify REST API requests
const makeShopifyRequest = async (endpoint: string, params = {}) => {
  const url = `https://${shopify.SHOPIFY_STORE_URL}/admin/api/${shopifyApiHelper.ApiVersion}/${endpoint}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Shopify-Access-Token": shopify.SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      params: {
        limit: 250,
        ...params,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching data from Shopify:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to handle Shopify GraphQL requests
const shopifyGraphQRequest = async (orderId: string) => {
  Shopify.Context.initialize({
    apiKey: shopify.SHOPIFY_API_KEY,
    shopName: shopify.SHOPIFY_STORE_URL,
  });
  try {
    // Execute the GraphQL query
    const response = await Shopify.Api.graphql(
      { query: ORDER_DETAILS_QUERY, variables: { orderId } },
      (err: any, result: any) => {
        if (err) {
          console.error(err);
          return;
        }

        const orderData = result.order;
        console.log(orderData);
      }
    );
    return response.body.data.order; // Return the order data
  } catch (error) {
    console.error("Error fetching order details via Shopify GraphQL:", error);
    throw error;
  }
};
