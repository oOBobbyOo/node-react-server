import express from 'express';
import User from '../models/user';
import parseError from '../utils/parseError'

const router = express.Router();

router.post('/', (req, res) => {
	const {
		email,
		password
	} = req.body.user;

	const user = new User({
		email
	});

	user.setPassword(password);
	user
		.save()
		.then(userRecord => res.status(200).json({
			success: true,
			user: userRecord.toAuthJSON()
		}))
		.catch(err => res.status(400).json({
			errors: parseError(err.errors)
		}));

});

export default router;