const crypto = require('crypto');
const config = require('../../config.js')
let key = config.secretkey

function aesEncrypt (data, key) {
	const cipher = crypto.createCipher('aes-256-cbc', key);
	var crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

function aesDecrypt (encrypted, key) {
	const decipher = crypto.createDecipher('aes-256-cbc', key);
	var decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}