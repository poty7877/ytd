import axios from "axios";

export const API_SERVER_HOST = `http://localhost:8005`
const userHost = `${API_SERVER_HOST}/api/user`
const header = {headers: {"Content-Type": "application/x-www-form-urlencoded"}};
const jsonHeader = {headers: {"Content-Type": "application/json"}}


// 로그인
export const loginApi = async (loginParam) => {
    const data = new URLSearchParams({
        username: loginParam.username,
        password: loginParam.password,
    })
    const response = await axios.post(`${userHost}/login`, data, header);

    return response.data;
}

// 회원가입
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

// 정보수정
export const modifyUser = async (userDTO) => {
    try {
        const response = await axios.put(`${userHost}/${userDTO.mno}`, userDTO, jsonHeader);
        return {success: true, data: response.data};
    } catch (error) {
        if (error.response && error.response.data) {
            return {success: false, errors: error.response.data};
        }
        // 기타 에러 처리
        return {success: false, errors: {message: "API 연결 오류"}};
    }
}

// 회원탈퇴
export const removeUser = async (mno) => {
    const response = await axios.delete(`${userHost}/${mno}`);
    return response.data;
}

// 이메일 중복 확인
export const checkEmail = async (email) => {
    const response = await axios.post(`${userHost}/checkEmail/${email}`);
    return response.data;
}

// 닉네임 중복 확인
export const checkNickName = async (nickName) => {
    const response = await axios.post(`${userHost}/checkNickName/${nickName}`);
    return response.data;
}

// 인증번호 보내기
export const sendEmail = async (email) => {
    const response = await axios.post(`${API_SERVER_HOST}/sendEmail`, {email:email}, jsonHeader);
    return response.data;
}

// 인증번호 보내기
export const sendEmail2 = async (email) => {
    const response = await axios.post(`${API_SERVER_HOST}/sendEmail2`, {email:email}, jsonHeader);
    return response.data;
}

// 이메일 인증
export const verifyEmail = async (formData) => {
    const response = await axios.post(`${API_SERVER_HOST}/verifyCode`, formData, jsonHeader);
    return response.data;
}