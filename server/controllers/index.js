module.exports = async (ctx) => {
	const title = 'home'
	console.log("home");
	await ctx.render("index", {
		title
	})
}
