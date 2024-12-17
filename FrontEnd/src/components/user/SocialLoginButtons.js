import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {getKakaoLoginLink} from "../../api/kakaoApi";
import {getGoogleLoginLink} from "../../api/GoogleApi";
import {getNaverLoginLink} from "../../api/NaverApi";

const SocialLoginButtons = () => {

    const navigate = useNavigate();

    const link = getKakaoLoginLink();
    const link2 = getGoogleLoginLink();
    const link3 = getNaverLoginLink();



    return (
        <div className="social-login-buttons">
            {/* 네이버 로그인 버튼 */}
            <button className="social-login-btn naver">
                <Link to={link3}> <img src="/btnG_완성형.png" alt="Naver Login"/></Link>
            </button>

            {/* 구글 로그인 버튼 */}
            <button className="social-login-btn google">
                <Link to={link2}> <img src="/web_neutral_sq_ctn@2x.png" alt="Google Login"/></Link>
            </button>

            {/* 카카오 로그인 버튼 */}
            <button className="social-login-btn kakao">
                <Link to={link}><img src="/kakao_login_large_narrow.png" alt="Kakao Login" /></Link>
            </button>
        </div>
    );
}

export default SocialLoginButtons;
