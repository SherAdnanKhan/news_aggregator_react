import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/Styling/LoginForm.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
const RegistrationForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register', userData);
            navigate('/login');
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="login-page-one bg-light">
            <Container>
                <Row>
                    <Col lg={10} className="offset-lg-1">

                        <div className="bg-white shadow rounded">
                            <Row className='' >
                                <Col md={7} className="pe-0">
                                    <div className="form-left h-100 py-5 px-5">
                                        <Form onSubmit={handleSubmit}>

                                            <Row className="g-4">
                                                <Col md={12}>
                                                    <h3 className="mb-3">Register Now</h3>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Name<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i className="ri-user-line"></i></div>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                            placeholder="Name"
                                                            value={userData.name}
                                                            onChange={handleChange}
                                                        />
                                                        <div className={`invalid-feedback ${errors.name ? 'd-block' : ''}`}>
                                                            {errors.name && errors.name.join(', ')}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Email<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i className="ri-mail-line"></i></div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            value={userData.email}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        />
                                                        <div className={`invalid-feedback ${errors.email ? 'd-block' : ''}`}>
                                                            {errors.email && errors.email.join(', ')}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i className="ri-key-line"></i></div>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            value={userData.password}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                        />
                                                        <div className={`invalid-feedback ${errors.password ? 'd-block' : ''}`}>
                                                            {errors.password && errors.password.join(', ')}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Confirm Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i className="ri-lock-line"></i></div>
                                                        <input
                                                            type="password"
                                                            name="password_confirmation"
                                                            placeholder="Confirm Password"
                                                            value={userData.password_confirmation}
                                                            onChange={handleChange}
                                                            className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                                        />
                                                    </div>
                                                    <div className={`invalid-feedback ${errors.password_confirmation ? 'd-block' : ''}`}>
                                                        {errors.password_confirmation && errors.password_confirmation.join(', ')}
                                                    </div>
                                                </Col>

                                                <Col md={12}>
                                                    <p className="mb-0">Already have an account? <a href='#' onClick={navigateToLogin} className="text-primary cursor-pointer">Login</a></p>
                                                </Col>
                                                <Col lg={12}>
                                                    <Button type="submit" className="btn btn-primary px-4 float-end mt-4">Register</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Col>
                                <Col md={5} className="ps-0 d-none d-md-block">
                                    <div className="form-right h-100 bg-primary text-white text-center pt-5">
                                        <i className="ri-survey-line"></i>
                                        <h2 className="fs-1">Welcome Back!!!</h2>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegistrationForm;
