import {lazy} from "react";
import {Navigate} from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));


const Login = lazy(() => import("../pages/user/LoginPage"))
const Agree = lazy(() => import("../pages/user/AgreePage"));
const Sign = lazy(() => import("../pages/user/SignPage"));
const Modify = lazy(() => import("../pages/user/ModifyPage"));
const FindPw = lazy(() => import("../pages/user/FindPwPage"))
const Kakao = lazy(() => import("../pages/user/KakaoRedirectPage"));
const Google = lazy(() => import("../pages/user/GoogleRedirectPage"));
const Naver = lazy(() => import("../pages/user/NaverRedirectPage"));
/*****Routes******/

const ThemeRoutes = [
    {
        path: "/",
        element: <FullLayout/>,
        children: [
            {path: "/", element: <Navigate to="/starter"/>},
            {path: "/starter", exact: true, element: <Starter/>},
            {path: "/about", exact: true, element: <About/>},
            {path: "/alerts", exact: true, element: <Alerts/>},
            {path: "/badges", exact: true, element: <Badges/>},
            {path: "/buttons", exact: true, element: <Buttons/>},
            {path: "/cards", exact: true, element: <Cards/>},
            {path: "/grid", exact: true, element: <Grid/>},
            {path: "/table", exact: true, element: <Tables/>},
            {path: "/forms", exact: true, element: <Forms/>},
            {path: "/breadcrumbs", exact: true, element: <Breadcrumbs/>},
            {path: "/modify", exact: true, element: <Modify/>},
        ],
    },
    { path: "/login", element: <Login/> },
    { path: "/agree", element: <Agree/> },
    { path: "/sign", element: <Sign/> },
    { path: "/findPw", element: <FindPw/>},
    { path: "/member/kakao", element: <Kakao/> },
    { path: "/member/google", element: <Google/>},
    { path: "/member/naver", element: <Naver/>}
];

export default ThemeRoutes;
