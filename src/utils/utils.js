export const hrefTo = (path) => {
	window.location.href = window.location.protocol + "//" + window.location.host + path
}

export const open = (path, ifSelf) => {
	let _ifSelf = ifSelf || "_self"
	window.open(window.location.protocol + "//" + window.location.host + path, _ifSelf)
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

//获取文件后缀
export const getFileType = (filename) => {
	var index1 = filename.lastIndexOf(".");
	var index2 = filename.length;
	var type = filename.substring(index1, index2);
	return type;
}