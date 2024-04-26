import { getCookie, setCookie } from "cookies-next";
import useAxios from "./useAxios";

const useRefreshToken = () => {
	const refreshToken = getCookie("refresh_token");
	const axiosClient = useAxios();
	const getRefreshToken = async () => {
		if (refreshToken) {
			const token = await axiosClient.get("/auth/refresh");
			setCookie("access_token", token.data.accessToken, { maxAge: 60 * 60 });
			return token.data.accessToken;
		} else {
			return null;
		}
	};
	return getRefreshToken;
};

export default useRefreshToken;
