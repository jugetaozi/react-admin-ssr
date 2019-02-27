// import { postLoginCode } from "../action/userReducer";
import { getList } from 'api/keyword'
const init_state = {
	name: 'wudi',
};
export const getUserInfo = () => (dispatch, getState) => {
	return dispatch({
		type: 'API_GET_USER_INFO',
		payload: getList()
			.then(res => {
				localStorage.setItem('shareFlag', res.shareFlag);
				return res;
			}),
	});
};

export default function reducer (state = init_state, action) {
	switch (action.type) {
		case `API_GET_USER_INFO_FULFILLED`:
			return {
				...state,
				productinfo: action.payload,
			};
		default:
			return state;
	}
}