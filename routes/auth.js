import express from 'express';
import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
	const {
		credentials
	} = req.body;

	User.findOne({
		email: credentials.email
	}).then(user => {
		if (user && user.isValidPassword(credentials.password)) {
			res.status(200).json({
				success: true,
				user: user.toAuthJSON()
			})
		} else {
			res.status(400).json({
				errors: {
					global: 'Invalid credentials!'
				}
			});
		}
	})
});

export default router;