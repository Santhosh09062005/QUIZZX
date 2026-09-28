import express from 'express';
import { clerkWebhook } from '../conrollers/webhook.js';

const router =express.Router();

router.post("/webhhok/clerk",
    express.raw({type: "application/json"}),
    clerkWebhook
);

export default router;