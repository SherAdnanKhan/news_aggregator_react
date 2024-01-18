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
    const [error, setError] = useState('');
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
            console.log(error)
            if (error.response && error.response.data) {
                setError(error.response.data.error || 'An error occurred');
            } else {
                setError('An error occurred');
            }
        }

    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        // <div className="container">
        //     <div className="row justify-content-center">
        //         <div className="col-md-6">
        //             <form onSubmit={handleSubmit} className="mt-5">
        //                 <div className="mb-3">
        //                     <label htmlFor="email" className="form-label">Email</label>
        //                     <input
        //                         type="email"
        //                         className="form-control"
        //                         id="email"
        //                         name="email"
        //                         value={credentials.email}
        //                         onChange={handleChange}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="password" className="form-label">Password</label>
        //                     <input
        //                         type="password"
        //                         className="form-control"
        //                         id="password"
        //                         name="password"
        //                         value={credentials.password}
        //                         onChange={handleChange}
        //                     />
        //                 </div>
        //                 {error && <div className="alert alert-danger">{error}</div>}
        //                 <button type="submit" className="btn btn-primary">Login</button>
        //                 <button type="button" className="btn btn-secondary ml-2" onClick={navigateToRegister}>Register</button>
        //             </form>
        //         </div>
        //     </div>
        // </div>
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
                                                        <div className="input-group-text"><i class="ri-mail-line"></i></div>
                                                        {/* <input type="email" className="form-control" value={credentials.email} onChange={handleChange} placeholder="Enter Email"/> */}
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            name="email"
                                                            value={credentials.email}
                                                            onChange={handleChange}
                                                            placeholder="Enter Email"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i class="ri-key-line"></i></div>
                                                        {/* <input type="text" className="form-control" placeholder="Enter Password"/> */}
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="password"
                                                            name="password"
                                                            value={credentials.password}
                                                            onChange={handleChange}
                                                            placeholder="Enter Password"
                                                        />
                                                    </div>
                                                </Col>

                                                <Col md={12}>
                                                    <a onClick={navigateToRegister} className="float-end text-primary">Register</a>
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
                                    <i class="ri-survey-line"></i>
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
