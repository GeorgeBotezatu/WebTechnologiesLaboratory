import { getToken } from "../Utils/utilFunctions";

export const REQUEST_HEADERS_WITH_BEARER = {
	headers: {
		authorization: `Bearer ${getToken()}`,
		"Content-type": "application/json",
	},
};
