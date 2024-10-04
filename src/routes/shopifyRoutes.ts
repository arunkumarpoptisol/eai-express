import { Router } from 'express';
import { fetchShopifyOrders, verifyShopifyWebhook, handleShopifyWebhook } from '../controllers/shopifyController';

const router = Router();

router.get("/webhookTest", fetchShopifyOrders); // for testing
router.post(
  "/shopify/webhook",
  verifyShopifyWebhook,
  handleShopifyWebhook
);


export default router;
