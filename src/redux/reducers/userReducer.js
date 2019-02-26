import { postLoginCode } from "../action/userReducer";
const init_state = {
	productinfo: '',
};

export default function reducer (state = init_state, action) {
	switch (action.type) {
		case `${API_GET_USER_ADDR}_FULFILLED`:
			return {
				...state,
				productinfo: action.payload,
			};
		default:
			return state;
	}
}