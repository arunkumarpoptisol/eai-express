import axios from "axios";
import { shopify } from "../config/config";
import { ORDER_DETAILS_QUERY, shopifyApiHelper } from "./shopifyApiHelper.js";

// Shopify API credentials
const SHOPIFY_STORE_URL = shopify.SHOPIFY_STORE_URL;
const SHOPIFY_ACCESS_TOKEN = shopify.SHOPIFY_ACCESS_TOKEN;

// Common function to handle REST API requests
const makeShopifyRequest = async (endpoint: string, params = {}) => {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/${shopifyApiHelper.ApiVersion}/${endpoint}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      params: {
        limit: 250, // Default parameter (can be overridden by params)
        ...params, // Spread the params passed into this function
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching data from Shopify:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default {
  makeShopifyRequest,
};
