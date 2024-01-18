import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/Styling/LoginForm.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
const LoginForm = ({ onLogin, isAuthenticated }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate('/feed');
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', credentials);
            onLogin(response?.data?.token, response?.data?.user);
            navigate('/feed');
        } catch (error) {
            console.log(error.response)
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || error.response.data);
            } else {
                setErrors(error?.response);
            }
        }

    };

    const navigateToRegister = () => {
        navigate('/register');
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
                                                    <h3 className="mb-3">Login Now</h3>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Email<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i className="ri-mail-line"></i></div>
                                                        <input
                                                            type="email"
                                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                            id="email"
                                                            name="email"
                                                            value={credentials.email}
                                                            onChange={handleChange}
                                                            placeholder="Enter Email"
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
                                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                            id="password"
                                                            name="password"
                                                            value={credentials.password}
                                                            onChange={handleChange}
                                                            placeholder="Enter Password"
                                                        />
                                                        <div className={`invalid-feedback ${errors.password ? 'd-block' : ''}`}>
                                                            {errors.password && errors.password.join(', ')}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    {errors.error && (
                                                        <div className="alert alert-danger" role="alert">
                                                            {errors.error}
                                                        </div>
                                                    )}
                                                </Col>
                                                <Col md={12}>
                                                    <p className="mb-0">Don't have an account? <a href="#" onClick={navigateToRegister} className="text-primary">Register</a></p>
                                                </Col>
                                                <Col lg={12}>
                                                    <Button type="submit" className="btn btn-primary px-4 float-end mt-4">login</Button>
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

export default LoginForm;
