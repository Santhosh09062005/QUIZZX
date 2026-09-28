import express from 'express';
import {CreatemyResult} from '../controllers/resultController.js';

const router = express.Router();

router.post("/save-result",CreatemyResult);
router.get("/my-result",getMyResults);

export default router;