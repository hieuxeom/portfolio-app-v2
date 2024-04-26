import axios from "axios";

const useAxios = () => {
	const axiosClient = axios.create({
		baseURL: process.env.BASE_API_URL,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});

	return axiosClient;
};

export default useAxios;
