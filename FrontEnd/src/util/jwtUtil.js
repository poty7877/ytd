import axios from "axios";
import {getCookie, setCookie} from "./cookieUtil";
import {API_SERVER_HOST} from "../api/UserApi"

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST
    const header = {headers: {Authorization: `Bearer ${accessToken}`}}

    const response = await axios.get(`${host}/api/user/refresh?refreshToken=${refreshToken}`, header);
    console.log(response.data);
    return response.data;
}


const beforeReq = (config) => {
    console.log("beforeReq");
    const userInfo = getCookie("user")

    if (!userInfo) {
        console.log("User Not Found")
        return Promise.reject(
            {
                response:
                    {
                        data:
                            {error: "REQUIRE_LOGIN"}
                    }
            }
        );
    }

    const {accessToken} = userInfo;

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}

const requestFail = (error) => {
    console.log("requestFail");
    return Promise.reject(error);
}

const beforeRes = async (response) => {
    console.log("beforeRes");

    const data = response.data;

    if(data && data.error === "ERROR_ACCESS_TOKEN") {
        const userCookieValue = getCookie("user");

        const result = await refreshJWT(userCookieValue.accessToken, userCookieValue.refreshToken);
        console.log(result);

        userCookieValue.accessToken = result.accessToken;
        userCookieValue.refreshToken = result.refreshToken;

        setCookie("user", JSON.stringify(userCookieValue), 1);

        const originalRequest = response.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return axios(originalRequest);
    }
    return response;
}

const responseFail = (error) => {
    console.log("responseFail");
    return Promise.reject(error);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);
export default jwtAxios;
