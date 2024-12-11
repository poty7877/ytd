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
import {login} from "../../api/UserApi";
import UserMove from "../../hook/UserMove";

const LoginComponent = () => {

    const [loginParam, setLoginParam] = useState({});
    const [error, setError] = useState({});
    const {moveToAgree} = UserMove();

    const handleChange = (e) => {
        setLoginParam(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const clickLoginBtn = () => {

        login(loginParam).then(data => {
            setError(data.error);
            console.log(data)
        });
    };

    return (
        <div className={"login-container"}>
            <Row className={"justify-content-center align-items-center h-100"}>
                <Col lg={"3"}>
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            로그인
                        </CardTitle>
                        {error === "ERROR_LOGIN" ? <small style={{color: "red", marginLeft:15}}> 아이디 또는 비밀번호를 잘못 입력했습니다. </small> : null}
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