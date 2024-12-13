import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import React, {useState} from "react";
import UserMove from "../../hook/UserMove";

const LoginComponent = () => {

    const [loginParam, setLoginParam] = useState({});
    const [error, setError] = useState({});
    const {moveToAgree, doLogin, moveToPath} = UserMove();

    const handleChange = (e) => {
        setLoginParam(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const clickLoginBtn = () => {
        doLogin(loginParam)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    moveToPath("/")
                }
            })
    };

    return (
        <div className={"login-container"}>
            <Row className={"justify-content-center align-items-center h-100"}>
                <Col lg={"3"}>
                    <p style={{textAlign: "center", marginBottom: 20}}>
                        YTD 사이트는 팀의 작업과 프로젝트 관리를 돕기 위해 만들어졌습니다.</p>
                    <p style={{textAlign: "center", marginBottom: 20}}>
                        효율적인 일정 관리와 협업 도구를 제공합니다.</p>
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            로그인
                        </CardTitle>
                        {error === "ERROR_LOGIN" ?
                            <small style={{color: "red", marginLeft: 15}}> 아이디 또는 비밀번호를 잘못 입력했습니다. </small> : null}
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">이메일</Label>
                                    <Input
                                        id="exampleEmail"
                                        name="username"
                                        placeholder="이메일을 입력하세요"
                                        type="email"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">비밀번호</Label>
                                    <Input
                                        id="examplePassword"
                                        name="password"
                                        placeholder="비밀번호를 입력하세요"
                                        type="password"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Form>
                            <Button color="primary" className={"w-100"} onClick={clickLoginBtn}>로그인</Button>
                        </CardBody>
                        <CardFooter>
                            <div className="footer-links">
                                <span className="footer-link">아이디 찾기</span>
                                <span className="footer-link">비밀번호 찾기</span>
                                <span className="footer-link" onClick={moveToAgree}>회원가입</span>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LoginComponent;