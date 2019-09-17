import React from 'react';
import { Container, Col, Row, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import useBootyForm from "./useBootyForm";


const BootyForm = () => {

    const { values, handleChange, handleSubmit, handleValidateEmail, handleValidatePhoneNo } = useBootyForm();

    return (
        <Container className="App">
            <h2>Add a booty!</h2>
            <Form onSubmit={handleSubmit}>
                <Row form>
                    <Col className="colStyle">
                        <FormGroup>
                            <Label>First name: </Label>
                            <Input type="text" required name='firstName'
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>

                    <Col className="colStyle">
                        <FormGroup>
                            <Label>Last name: </Label>
                            <Input type="text" required name="lastName"
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Col className="colStyle">
                    <FormGroup>
                        <Label>Skype handle: </Label>
                        <Input type="text" required name="skypeHandle"
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col>

                <Col className="colStyle">
                    <FormGroup>
                        <Label>Email address: </Label>
                        <Input type="text" required name="email"
                            onChange={handleValidateEmail}
                        />
                        <p className="errorMsg" id="errorEmail">Error: Please enter a valid email address</p>
                    </FormGroup>
                </Col>

                <Col className="colStyle">
                    <FormGroup>
                        <Label>Phone number: </Label>
                        <Input type="text" required name="phoneNo"
                            onChange={handleValidatePhoneNo}
                        />
                        <p className="errorMsg" id="errorPhone">Error: Please enter a valid phone number</p>
                    </FormGroup>
                </Col>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label>City: </Label>
                            <Input type="text" required name="city"
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <Label>Country: </Label>
                            <Input type="text" required name="country"
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Col className="colStyle">
                    <FormGroup>
                        <Label>Timezone</Label>
                        <Input type="select" required name="timezone"
                            onChange={handleChange}>
                            <option>time 1</option>
                            <option>time 2</option>
                            <option>time 3</option>
                            <option>time 4</option>
                            <option>time 5</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Button>Add that booty</Button>
            </Form>
        </Container>
    )
};

export default BootyForm;