import crypto from 'crypto'
import config from '../../config.js'

let secretkey = config.secretkey

export const aesEncrypt = function(data, key) {
	let sKey = key || secretkey
	const cipher = crypto.createCipher('aes-256-cbc', sKey)
	var crypted = cipher.update(data, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

export const aesDecrypt = function(encrypted, key) {
	let sKey = key || secretkey
	const decipher = crypto.createDecipher('aes-256-cbc', sKey)
	var decrypted = decipher.update(encrypted, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}
