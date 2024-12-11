import {Button, Card, CardBody, CardFooter, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import UserMove from "../../hook/UserMove";

const AgreeComponent = () => {

    const [allAgree, setAllAgree] = useState(false);
    const [firstAgree, setFirstAgree] = useState(false);
    const [secondAgree, setSecondAgree] = useState(false);
    const [thirdAgree, setThirdAgree] = useState(false);

    const {moveToSign} = UserMove();

    useEffect(() => {
        if (allAgree) {
            setFirstAgree(true);
            setSecondAgree(true);
            setThirdAgree(true);
        } else {
            setFirstAgree(false);
            setSecondAgree(false);
            setThirdAgree(false);
        }
    }, [allAgree])

    const isAllAgrred = firstAgree && secondAgree && thirdAgree;


    return (
        <div className={"login-container"}>
            <Row className={"justify-content-center align-items-center h-100"}>
                <Col lg={"3"}>
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            <Input type={"checkbox"} checked={allAgree}
                                   onChange={() => setAllAgree(!allAgree)}></Input> 전체 동의하기
                        </CardTitle>

                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail"> <Input type={"checkbox"} checked={firstAgree}
                                                                      onChange={() => setFirstAgree(!firstAgree)}></Input>
                                        <small style={{color: "blue"}}>[필수]</small> 이용약관 </Label>
                                    <Input
                                        name="first"
                                        type="textarea"
                                        value={"이용약관\n" +
                                            "\n" +
                                            "본 약관은 YTD (이하 \"YTD\")의 이용에 대한 기본적인 규칙을 정의합니다. 서비스 이용자는 본 약관에 동의해야 하며, 동의하지 않으면 서비스를 이용할 수 없습니다.\n" +
                                            "\n" +
                                            "제 1조 (목적)\n" +
                                            "본 약관은 [YTD] 서비스의 이용과 관련된 권리, 의무 및 책임을 규정합니다.\n" +
                                            "\n" +
                                            "제 2조 (서비스 제공)\n" +
                                            "본 서비스는 사용자가 가입하고 로그인하여 다양한 기능을 이용할 수 있도록 제공됩니다. 서비스의 구체적인 내용은 서비스 운영자의 판단에 따라 변경될 수 있습니다.\n" +
                                            "\n" +
                                            "제 3조 (회원 가입)\n" +
                                            "회원 가입 시 제공되는 정보는 이메일 주소, 비밀번호 등입니다.\n" +
                                            "가입 시 제공한 정보가 부정확하거나 허위일 경우 서비스 이용에 제한이 있을 수 있습니다.\n" +
                                            "제 4조 (회원의 의무)\n" +
                                            "회원은 본 약관을 준수해야 하며, 서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.\n" +
                                            "회원은 자신의 개인정보를 안전하게 관리할 책임이 있습니다.\n" +
                                            "제 5조 (서비스 이용)\n" +
                                            "서비스는 24시간 이용할 수 있으나, 시스템 점검이나 오류로 인해 일시적으로 중단될 수 있습니다.\n" +
                                            "사용자는 서비스 이용 시 법적인 책임을 지며, 서비스를 이용한 결과 발생하는 모든 법적 책임은 사용자가 부담합니다.\n" +
                                            "제 6조 (약관 변경)\n" +
                                            "본 약관은 서비스에 공지되며, 사용자는 이에 동의하는 것이 서비스 이용을 위한 조건이 됩니다. 약관이 변경될 경우, 사용자에게 고지합니다.\n" +
                                            "\n" +
                                            "제 7조 (책임 제한)\n" +
                                            "서비스 제공자는 서비스 중단이나 오류로 인한 손해에 대해 책임을 지지 않습니다. 서비스의 이용은 사용자 본인의 책임 하에 이루어집니다."}
                                        readOnly={true}
                                        rows={10}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail"> <Input type={"checkbox"} checked={secondAgree}
                                                                      onChange={() => setSecondAgree(!secondAgree)}></Input>
                                        <small style={{color: "blue"}}>[필수]</small> 개인정보처리방침 </Label>
                                    <Input
                                        name="second"
                                        type="textarea"
                                        value={"개인정보처리방침\n" +
                                            "\n" +
                                            "[YTD] (이하 \"YTD\")는 사용자의 개인정보를 중요하게 생각하며, 개인정보 보호법을 준수합니다. 이 개인정보처리방침은 사용자의 개인정보를 어떻게 수집하고, 이용하며, 보호하는지에 대한 정보를 제공합니다.\n" +
                                            "\n" +
                                            "제 1조 (개인정보의 수집 항목)\n" +
                                            "서비스는 회원 가입 시 이메일 주소, 비밀번호 등 기본적인 정보를 수집합니다. 사용자가 제공한 정보 외에도, 서비스 이용 중 발생하는 정보(예: 접속 로그, 이용 기록 등)를 수집할 수 있습니다.\n" +
                                            "\n" +
                                            "제 2조 (개인정보의 이용 목적)\n" +
                                            "수집된 개인정보는 다음 목적을 위해 사용됩니다:\n" +
                                            "\n" +
                                            "서비스 가입 및 관리\n" +
                                            "서비스 제공 및 개선\n" +
                                            "회원과의 커뮤니케이션 (알림, 이벤트, 안내 등)\n" +
                                            "서비스 이용과 관련된 통계적 분석\n" +
                                            "제 3조 (개인정보의 보유 및 이용 기간)\n" +
                                            "개인정보는 회원 탈퇴 시까지 보유되며, 이용 목적이 달성되면 즉시 파기됩니다. 다만, 법적인 이유로 보관이 필요한 경우 해당 기간 동안 보관됩니다.\n" +
                                            "\n" +
                                            "제 4조 (개인정보의 제공)\n" +
                                            "서비스는 원칙적으로 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법적인 요구나 사용자의 동의가 있는 경우 제공될 수 있습니다.\n" +
                                            "\n" +
                                            "제 5조 (쿠키의 사용)\n" +
                                            "서비스는 쿠키를 사용하여 사용자의 방문 기록을 추적하고, 맞춤형 서비스를 제공할 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키를 차단할 수 있습니다.\n" +
                                            "\n" +
                                            "제 6조 (개인정보의 보호)\n" +
                                            "서비스는 개인정보 보호를 위해 적절한 기술적, 관리적 조치를 취하고 있습니다. 또한, 개인정보에 접근할 수 있는 인원을 최소화하고, 관리적 절차를 마련하여 보호하고 있습니다.\n" +
                                            "\n" +
                                            "제 7조 (개인정보 처리 방침의 변경)\n" +
                                            "서비스는 개인정보 처리 방침을 변경할 수 있으며, 변경 사항은 서비스 내에 게시되거나 다른 방법으로 통지됩니다.\n" +
                                            "\n"}
                                        readOnly={true}
                                        rows={10}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail"> <Input type={"checkbox"} checked={thirdAgree}
                                                                      onChange={() => setThirdAgree(!thirdAgree)}></Input>
                                        <small style={{color: "blue"}}>[필수]</small> 이메일 알림 수신 동의 </Label>
                                    <Input
                                        name="third"
                                        type="textarea"
                                        value={"이메일 알림 수신 동의\n" +
                                            "\n" +
                                            "본 서비스는 이메일을 통해 사용자에게 알림을 보낼 수 있습니다. 알림에는 서비스 관련 정보나 중요한 업데이트가 포함될 수 있습니다. 이메일 알림 수신에 동의하시면, 아래의 사항에 동의한 것으로 간주됩니다:\n" +
                                            "\n" +
                                            "서비스 운영 관련 알림\n" +
                                            "이벤트 및 프로모션 알림\n" +
                                            "이메일 인증 및 로그인\n"}
                                        readOnly={true}
                                        rows={10}
                                    />
                                </FormGroup>

                            </Form>

                        </CardBody>
                        <CardFooter>
                            {isAllAgrred ? <Button className={"w-100"} color={"primary"} onClick={moveToSign}>다음</Button> : <Button className={"w-100"} color={"secondary"} active={false}>다음</Button>}
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AgreeComponent;