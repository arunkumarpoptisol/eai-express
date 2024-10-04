// src/controllers/shopifyController
import { createHmac } from "crypto";
import { shopify, rabbitmq } from "../config/config";
import Log from "../models/Log";
//@ts-ignore
import { transformData, sendMessage } from "eai-nodejs";
import {
  getShopifyOrders,
  getShopifyOrderById,
  getShopifyOrderByGraphQLId,
} from "../services/shopifyService";
import { getShopifyExpression } from "../expression/shopifyExpression";
import { Express, Request, Response, NextFunction } from "express";
/**
 * Verifies the authenticity of incoming Shopify webhook requests.
 */
export function verifyShopifyWebhook(
  req: any,
  res: Response,
  next: NextFunction
): void {
  const hmacHeader = req.get("X-Shopify-Hmac-Sha256");
  const generatedHash = createHmac("sha256", shopify.webhookSecret || "")
    .update(req.rawBody as string) // Ensure rawBody is properly handled as a string
    .digest("base64");

  if (generatedHash === hmacHeader) {
    next(); // Proceed to the next middleware if verification succeeds
  } else {
    res.status(401).send("Webhook verification failed"); // Handle the error by sending a response
  }
}

/**
 * Handles incoming Shopify webhook requests and processes the data.
 */
export async function handleShopifyWebhook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const shopifyData = req.body;

    const tempConfig = rabbitmq;

    await Log.create({ phase: "shopify", data: shopifyData });

    const transformedData = await getShopifyExpression(shopifyData);

    await Log.create({ phase: "transform", data: transformedData });

    await sendMessage(transformedData, tempConfig);

    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
}

export async function fetchShopifyOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const result = await getShopifyOrders();
    const shopifyData = await getShopifyOrderById("5761196392690"); // for testing

    const tempConfig = rabbitmq;

    await Log.create({ phase: "shopify", data: shopifyData });

    const transformedData = await getShopifyExpression(shopifyData);

    await Log.create({ phase: "transform", data: transformedData });

    await sendMessage(transformedData, tempConfig);

    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
}
