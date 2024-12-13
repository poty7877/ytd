import {Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useState} from "react";

const ModifyComponent = () => {

    // 객체 저장
    const [userDTO, setUserDTO] = useState({});

    // 이메일 비밀번호 닉네임
    const handleChange = (e) => {
        setUserDTO(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

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
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Form>
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