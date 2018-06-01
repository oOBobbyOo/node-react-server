import express from 'express';
import mongoose from 'mongoose';
import user from '../models/user';
const router = express.Router();

router.get('/', (req, res) => {
	res.send('from api router');
});


export default router;