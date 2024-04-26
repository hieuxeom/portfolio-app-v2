import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosServer = () => {
	const accessToken = getCookie("access_token");

	const getRefreshToken = useRefreshToken();

	const axiosServer = axios.create({
		baseURL: process.env.BASE_API_URL,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});

	useEffect(() => {
		const requestIntercept = axiosServer.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axiosServer.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 401 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await getRefreshToken();
					prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
					return axiosServer(prevRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosServer.interceptors.request.eject(requestIntercept);
			axiosServer.interceptors.response.eject(responseIntercept);
		};
	}, [accessToken, getRefreshToken]);

	return axiosServer;
};

export default useAxiosServer;
