import express from 'express';

import * as VideoCallController from './videoCallController.js'

const router = express.Router();

router.get("/video-call/:id", VideoCallController.getRoom);

export default router;


