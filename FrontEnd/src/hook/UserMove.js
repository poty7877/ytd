import {createSearchParams, Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginPostAsync, logout} from "../slices/loginSlice";

const UserMove = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const moveToAgree = () => {
        navigate("../agree")
    }

    const moveToSign = () => {
        navigate("../sign")
    }

    const loginState = useSelector(state => state.loginSlice)

    const isLogin = !!loginState.email;

    const doLogin = async (loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam))
        return action.payload
    }

    const moveToPath = (path) => {
        navigate({pathname: path}, {replace: true})
    }

    const moveToLogin = () => {
        navigate({pathname: "/login"}, {replace: true})
    }

    const moveToLoginReturn = () => {
        return <Navigate replace to={"/login"}/>
    }

    const moveToFindPw = () => {
        navigate({pathname: "/findPw"}, {replace: true})
    }

    const doLogout = () => {
        dispatch(logout())
    }

    const moveToModify = () => {
        navigate({pathname: "/modify"}, {replace:true})
    }

    const exceptionHandle = (ex => {
        console.log("Exception")
        console.log(ex)
        const errorMsg = ex.response.data.error;
        const errorStr = createSearchParams({error: errorMsg}).toString()

        if(errorMsg === "REQUIRE_LOGIN"){
            alert("로그인 하세요")
            navigate({pathname:"/login", search:errorStr})
            return
        }

        if(ex.response.data.error === "ERROR_ACCESS_DENIED"){
            alert("해당메뉴를 사용할수 없습니다.")
            navigate({pathname:"/login", search:errorStr})
            return
        }
    })


    return (
        {
            moveToSign,
            moveToAgree,
            isLogin,
            doLogin,
            moveToPath,
            moveToLogin,
            moveToLoginReturn,
            exceptionHandle,
            moveToFindPw,
            doLogout,
            moveToModify
        }
    );
};



export default UserMove;