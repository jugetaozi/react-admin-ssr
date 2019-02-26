export const hrefTo = (path) => {
	window.location.href = window.location.protocol + "//" + window.location.host + path
}

export const hashTo = (path) => {
	window.location.href = window.location.protocol + "//" + window.location.host + '/#' + path
}

export const getStorage = (key) => {
	const ses = window.sessionStorage.getItem(key)
	if (ses) {
		return ses
	} else {
		return window.localStorage.getItem(key)
	}
}

export const removeStorage = (key) => {
	const session = window.sessionStorage.getItem(key)
	const local = window.sessionStorage.getItem(key)
	session && window.sessionStorage.removeItem(key)
	local && window.sessionStorage.removeItem(key)
}