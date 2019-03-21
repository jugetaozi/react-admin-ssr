module.exports = function sleep(time) {
	return async function(ctx, next) {
		// console.log(
		// 	ctx.request.method === 'POST',
		// 	'ctx.request.methodctx.request.method'
		// )
		if (ctx.request.method === 'POST') {
			await new Promise((resolve, reject) => setTimeout(() => resolve(), time))
		}
		await next()
	}
}
