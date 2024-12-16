import {Button, Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useState} from "react";
import {getCookie} from "../../util/cookieUtil";
import {modifyUser, sign} from "../../api/UserApi";

const ModifyComponent = () => {

    const token = getCookie("user");

    const [isOpen, setIsOpen] = useState(false);

    const [userDTO, setUserDTO] = useState({});

    const handleClickChangePwBtn = () => {
        setIsOpen(!isOpen);
    }
    // 에러 저장
    const [error, setError] = useState({});

    const handleChange = (e) => {
        setUserDTO(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const handleClickConfirmBtn = async () => {
        const formData = {
            mno: token.mno,
            pw: userDTO.newPassword,
            nickName: token.nickName,
            email: token.email
        }
        const response = await modifyUser(formData);
        if (response.success) {
            console.log(response);
        } else {
            setError(response.errors);
        }
    }

    console.log(token);
    return (
        <div className={"login-container"}>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            내 정보
                        </CardTitle>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">이메일
                                    </Label>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="이메일을 입력하세요"
                                        type="email"
                                        readOnly={true}
                                        value={token.email}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="nickName">닉네임
                                    </Label>
                                    <Input
                                        id="nickName"
                                        name="nickName"
                                        placeholder="닉네임 입력하세요"
                                        type="text"
                                        readOnly={true}
                                        value={token.nickName}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="social">소셜 회원
                                    </Label>
                                    <Input
                                        id="social"
                                        name="social"
                                        placeholder="이메일을 입력하세요"
                                        type="text"
                                        readOnly={true}
                                        value={token.social ? "소셜회원" : "일반회원"}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Button onClick={handleClickChangePwBtn}>비밀번호 변경</Button>
                                </FormGroup>
                            </Form>
                            {isOpen ?
                                <Form>
                                    <FormGroup>
                                        <Label for="currentPassword">{error.pw &&
                                            <small style={{color: "red"}}>{error.pw}</small>}</Label>
                                        <Input
                                            id="currentPassword"
                                            name="currentPassword"
                                            placeholder="현재 비밀번호"
                                            type="password"
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            id="newPassword"
                                            name="newPassword"
                                            placeholder="새 비밀번호"
                                            type="password"
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            id="newPasswordConfirm"
                                            name="newPasswordConfirm"
                                            placeholder="새 비밀번호 확인"
                                            type="password"
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <Label for="newPassword">{error.pw &&
                                        <small style={{color: "red"}}>{error.pw}</small>}</Label>
                                    <Button onClick={handleClickConfirmBtn}>비밀번호 저장</Button>
                                </Form> : <></>}

                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ModifyComponent;