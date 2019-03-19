const crypto = require('crypto')
const config = require('../../config.js')
let secretkey = config.secretkey

function aesEncrypt(data, key) {
	let sKey = key || secretkey
	const cipher = crypto.createCipher('aes-256-cbc', sKey)
	var crypted = cipher.update(data, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

function aesDecrypt(encrypted, key) {
	let sKey = key || secretkey
	const decipher = crypto.createDecipher('aes-256-cbc', sKey)
	var decrypted = decipher.update(encrypted, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}

module.exports = {
	aesEncrypt,
	aesDecrypt,
}
