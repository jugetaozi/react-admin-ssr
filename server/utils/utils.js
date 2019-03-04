const { aesEncrypt } = require("./crypto")

const delay = async (time) => new Promise((resolve, reject) => setTimeout(() => resolve(), time))
const generatorFileName = () => {
	return aesEncrypt(Math.random() * 1000 + "a")
}
module.exports = {
	delay,
	generatorFileName
}