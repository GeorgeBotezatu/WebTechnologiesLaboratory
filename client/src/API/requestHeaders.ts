import { getToken } from "../Utils/utilFunctions";
const token = getToken();
export const REQUEST_HEADERS_WITH_BEARER = {
	headers: {
		authorization: `Bearer ${token}`,
		"Content-type": "application/json",
	},
};
