import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		index: true
	},
	passwordHash: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});


schema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.passwordHash);
}

schema.methods.setPassword = function setPassword(password) {
	this.passwordHash = bcrypt.hashSync(password, 10);
}


schema.methods.generateJWT = function generateJWT() {
	return jwt.sign({
		email: this.email
	}, process.env.JET_SECERT)
}

schema.methods.toAuthJSON = function toAuthJSON() {
	return {
		email: this.email,
		token: this.generateJWT()
	}
}

export default mongoose.model('user', schema);