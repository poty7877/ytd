import {Button, Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useState} from "react";
import {checkEmail, checkNickName, sendEmail, sign, verifyEmail} from "../../api/UserApi";
import UserMove from "../../hook/UserMove";

const SignComponent = () => {

    // 객체 저장
    const [userDTO, setUserDTO] = useState({});

    // 에러 저장 
    const [error, setError] = useState({});

    // 이메일 인증시 인증번호 div 표시용
    const [showInput, setShowInput] = useState(false);

    // 이메일 중복확인 메시지 용
    const [checkEmailResult, setCheckEmailResult] = useState(false);

    // 닉네임 중복확인 메시지 용
    const [checkNickNameResult, setCheckNickNameResult] = useState(false);

    // 이메일 보내기 확인용
    const [checkSend, setCheckSend] = useState(false);

    // 코드 저장용
    const [code, setCode] = useState("");

    // 이메일 인증 확인용
    const [verifyResult, setVerifyResult] = useState(false);

    // 이동용
    const {moveToLogin} = UserMove();

    // 이메일 비밀번호 닉네임
    const handleChange = (e) => {
        setUserDTO(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    // 인증번호
    const handleChangeCode = (e) => {
        setCode(e.target.value);
    }

    // 이메일 인증 버튼 클릭
    const ClickVerifyEmailBtn = () => {
        checkEmail(userDTO.email).then(data => {
            if (!data) {
                setCheckEmailResult(false);
                setShowInput(true);
                sendEmail(userDTO.email).then(data => {
                    setCheckSend(data);
                });
            } else {
                setCheckEmailResult(true);
                setShowInput(false);
            }
        })
    }

    // 인증 확인 버튼 클릭
    const ClickVerifyEmailConfirm = () => {
        const formData = {
            email: userDTO.email,
            code: code
        }

        verifyEmail(formData).then(data => {
            if (data === "인증 성공") {
                setCheckSend(false);
                setShowInput(false);
                setVerifyResult(true);
            }
        })
    }

    // 닉네임 확인 버튼 클릭
    const ClickVerifyNickNameBtn = () => {
        checkNickName(userDTO.nickName).then(data => {
            if (!data) {
                setCheckNickNameResult(true);
            }
        })
    }


    // 회원가입 버튼 클릭
    const ClickSignBtn = async () => {
        const formData = {
            email: userDTO.email,
            pw: userDTO.pw,
            nickName: userDTO.nickName
        }

        const response = await sign(formData);
        if (response.success) {
            console.log(response);
            moveToLogin();
        } else {
            setError(response.errors);
        }
    }

    const isValid = verifyResult && checkNickNameResult;

    return (
        <div className={"login-container"}>
            <Row className={"justify-content-center align-items-center h-100"}>
                <Col lg={"5"}>
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            회원가입
                        </CardTitle>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">이메일 <Button color={"warning"} size={"sm"}
                                                                          onClick={ClickVerifyEmailBtn}>이메일
                                        인증</Button>
                                        {checkEmailResult &&
                                            <small style={{color: "red", marginLeft: 10}}>사용중인 이메일 입니다.</small>
                                        }
                                        {error.email &&
                                            <small style={{color: "red"}}>{error.email}</small>
                                        }
                                        {checkSend &&
                                            <small style={{color: "blue"}}>입력하신 주소로 인증메일을 보냈습니다.</small>
                                        }
                                        {verifyResult &&
                                            <small style={{color: "blue"}}>인증 완료</small>
                                        }
                                    </Label>
                                    {!verifyResult ?
                                        <Input
                                            id="exampleEmail"
                                            name="email"
                                            placeholder="이메일을 입력하세요"
                                            type="email"
                                            onChange={handleChange}
                                        /> : <Input
                                            id="exampleEmail"
                                            name="email"
                                            placeholder="이메일을 입력하세요"
                                            type="email"
                                            readOnly={true}
                                        />
                                    }
                                    {showInput &&
                                        <FormGroup style={{marginTop: 10}}>
                                            <Label>인증번호 입력 <Button size={"sm"} onClick={ClickVerifyEmailConfirm}>인증번호
                                                확인</Button></Label>
                                            <Input type={"text"} placeholder={"인증번호를 입력하세요"} name={"code"}
                                                   onChange={handleChangeCode}></Input>

                                        </FormGroup>}

                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">비밀번호{error.pw &&
                                        <small style={{color: "red"}}>{error.pw}</small>}</Label>
                                    <Input
                                        id="examplePassword"
                                        name="pw"
                                        placeholder="비밀번호를 입력하세요"
                                        type="password"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleNickName">닉네임 <Button color={"warning"} size={"sm"}
                                                                             onClick={ClickVerifyNickNameBtn}>중복
                                        확인</Button>
                                        {error.nickName &&
                                            <small style={{color: "red"}}>{error.nickName}</small>
                                        }
                                        { !checkNickNameResult ?
                                            <small style={{color: "red"}}>사용중인 닉네임 입니다.</small>
                                            : <small style={{color: "blue"}}>사용가능한 닉네임 입니다.</small>
                                        }

                                    </Label>
                                    <Input
                                        id="exampleNickName"
                                        name="nickName"
                                        placeholder="닉네임을 입력하세요"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            {isValid ?
                                <Button className={"w-100"} onClick={ClickSignBtn} color={"primary"}>회원가입</Button> :
                                <Button className={"w-100"} color={"secondary"} active={false}>회원가입</Button>}
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SignComponent;