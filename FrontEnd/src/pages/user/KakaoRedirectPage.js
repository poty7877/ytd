import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getAccessToken, getUserWithAccessToken} from "../../api/kakaoApi";
import UserMove from "../../hook/UserMove";
import {useDispatch} from "react-redux";
import {login} from "../../slices/loginSlice";

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();

    const authCode = searchParams.get("code")

    const dispatch = useDispatch();

    const {moveToPath} = UserMove();

    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken)

            getUserWithAccessToken(accessToken).then(userInfo => {
                console.log(userInfo);
                dispatch(login(userInfo));

                if(userInfo && !userInfo.social) {
                    moveToPath("/");
                } else {
                    moveToPath("/modify")
                }
            })
        })
    }, [authCode])

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    )
}

export default KakaoRedirectPage;