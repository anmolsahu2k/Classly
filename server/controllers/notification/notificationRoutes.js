import express from 'express';

import * as NotificationController from './notificationController.js'

const router = express.Router();

router.post("/appendChat", NotificationController.startChatSession);
router.post("/response", NotificationController.response)
router.post("/sendSummary", NotificationController.sendSummary)


export default router;


