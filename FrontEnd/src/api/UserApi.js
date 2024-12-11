import axios from "axios";

const API_SERVER_HOST = `http://localhost:8005/api`
const userHost = `${API_SERVER_HOST}/user`
const header = {headers: {"Content-Type": "application/x-www-form-urlencoded"}};
const jsonHeader = {headers: {"Content-Type": "application/json"}}

export const login = async (loginParam) => {
    const data = new URLSearchParams({
        username : loginParam.username,
        password : loginParam.password,
    })
    const response = await axios.post(`${userHost}/login`, data, header);
    
    return response.data;
}

export const sign = async (userDTO) => {
    try {
        const response = await axios.post(`${userHost}/sign`, userDTO, jsonHeader);
        return {success: true, data: response.data};
    } catch (error) {
        // 에러 처리: 백엔드에서 반환된 에러 메시지
        if (error.response && error.response.data) {
            return {success: false, errors: error.response.data};
        }
        // 기타 에러 처리
        return {success: false, errors: {message: "API 연결 오류"}};
    }
}