const delay = async (time) => new Promise((resolve, reject) => setTimeout(() => resolve(), time))

module.exports = {
	delay,
}