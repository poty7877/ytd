import {Button, Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useState} from "react";
import {checkEmail, sendEmail2} from "../../api/UserApi";
import UserMove from "../../hook/UserMove";
import Loader from "../../layouts/loader/Loader";


const FindPwComponent = () => {

    const [loading, setLoading] = useState(false);

    // 객체 저장
    const [userDTO, setUserDTO] = useState({});

    // 에러 저장
    const [error, setError] = useState("");

    // 이동용
    const {moveToLogin} = UserMove();

    // 이메일 비밀번호 닉네임
    const handleChange = (e) => {
        setUserDTO(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    // 이메일 인증 버튼 클릭
    const ClickFindPwBtn = () => {
        checkEmail(userDTO.email).then(data => {
            if (!data) {
                setError("가입된 이메일이 없습니다.")
            } else {
                setLoading(true)
                sendEmail2(userDTO.email).then(data => {
                    alert("이메일로 임시 비밀번호를 전송하였습니다. 로그인 후 비밀번호를 변경해주세요.")
                    moveToLogin();
                    setLoading(false)
                });
            }
        })
    }

    return (
        <div className={"login-container"}>
            {loading && <Loader/>}
            <Row className={"justify-content-center align-items-center h-100"}>
                <Col lg={"3"}>
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            비밀번호 찾기
                        </CardTitle>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">이메일 {error &&
                                        <small style={{color: "red"}}>{error}</small>}
                                    </Label>
                                    <Input id="exampleEmail"
                                           name="email"
                                           placeholder="이메일을 입력하세요"
                                           type="email"
                                           onChange={handleChange}
                                    />
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button className={"w-100"} onClick={ClickFindPwBtn} color={"primary"}>비밀번호 찾기</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default FindPwComponent;