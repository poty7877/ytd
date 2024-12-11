import {Button, Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useState} from "react";
import UserMove from "../../hook/UserMove";
import {login, sign} from "../../api/UserApi";

const SignComponent = () => {

    const [userDTO, setUserDTO] = useState({});
    const [error, setError] = useState({});

    const handleChange = (e) => {
        setUserDTO(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const ClickSignBtn = async () => {
        const formData = {
            email: userDTO.email,
            pw: userDTO.pw,
            nickName: userDTO.nickName
        }

        const response = await sign(formData);
        if(response.success){
            console.log(response);
        } else {
            setError(response.errors);
        }
    }

    return (
        <div className={"login-container"}>
            <Row className={"justify-content-center align-items-center h-100"}>
                <Col lg={"4"}>
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            회원가입
                        </CardTitle>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">이메일 <Button color={"warning"} size={"sm"}>이메일 인증</Button></Label>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="이메일을 입력하세요"
                                        type="email"
                                        onChange={handleChange}
                                    />

                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">비밀번호</Label>
                                    <Input
                                        id="examplePassword"
                                        name="pw"
                                        placeholder="비밀번호를 입력하세요"
                                        type="password"
                                        onChange={handleChange}
                                    />

                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleNickName">닉네임 <Button color={"warning"} size={"sm"}>중복 확인</Button></Label>
                                    <Input
                                        id="examplePassword"
                                        name="nickName"
                                        placeholder="닉네임을 입력하세요"
                                        type="text"
                                        onChange={handleChange}
                                    />

                                </FormGroup>
                            </Form>
                            {error.email &&
                                <div>
                                <small style={{color: "red"}}>{error.email}</small> </div>}
                            {error.nickName &&
                                <div>
                                <small style={{color: "red"}}>{error.nickName}</small> </div>}
                            {error.pw &&
                                <div>
                                <small style={{color: "red"}}>{error.pw}</small> </div>}
                        </CardBody>
                        <CardFooter>
                            <Button className={"w-100"} onClick={ClickSignBtn} color={"primary"}>회원가입</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SignComponent;