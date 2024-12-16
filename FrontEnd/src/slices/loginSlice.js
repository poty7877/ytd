import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginApi} from "../api/UserApi";
import {getCookie, removeCookie, setCookie} from "../util/cookieUtil";

const initState = {
    email: ""
}
const loadUserCookie = () => {
    const userInfo = getCookie("user")

    if(userInfo && userInfo.nickName) {
        userInfo.nickName = decodeURIComponent(userInfo.nickName);
    }
    return userInfo;
}

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {return loginApi(param)})

const loginSlice = createSlice({
    name: "LoginSlice",
    initialState: loadUserCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login");
            const data = action.payload;
            return {email: data.email};
        },
        logout: (state, action) => {
            console.log("logout");
            removeCookie("user")
            return {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled");
            const payload = action.payload;
            if(!payload.error) {
                setCookie("user", JSON.stringify(payload), 1);
            }
            return payload;
        }).addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending");
        }).addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected");
        })
    }
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;