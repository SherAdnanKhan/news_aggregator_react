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

    return (
        // <div className="container mt-5">
        //     <div className="row">
        //         <div className="col-md-6 offset-md-3">
        //             <h2 className="mb-4">Register</h2>
        //             <form onSubmit={handleSubmit}>
        //                 <div className="form-group">
        //                     <input
        //                         type="text"
        //                         name="name"
        //                         placeholder="Name"
        //                         value={userData.name}
        //                         onChange={handleChange}
        //                         className="form-control"
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <input
        //                         type="email"
        //                         name="email"
        //                         placeholder="Email"
        //                         value={userData.email}
        //                         onChange={handleChange}
        //                         className="form-control"
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <input
        //                         type="password"
        //                         name="password"
        //                         placeholder="Password"
        //                         value={userData.password}
        //                         onChange={handleChange}
        //                         className="form-control"
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <input
        //                         type="password"
        //                         name="password_confirmation"
        //                         placeholder="Confirm Password"
        //                         value={userData.password_confirmation}
        //                         onChange={handleChange}
        //                         className="form-control"
        //                     />
        //                 </div>
        //                 {Object.keys(errors).length > 0 && (
        //                     <div className="alert alert-danger">
        //                         {Object.entries(errors).map(([key, value]) => (
        //                             <p key={key}>{value}</p>
        //                         ))}
        //                     </div>
        //                 )}
        //                 <button type="submit" className="btn btn-primary">Register</button>
        //                 <button 
        //                     type="button" 
        //                     className="btn btn-link" 
        //                     onClick={() => navigate('/login')}>
        //                     Back to Login
        //                 </button>
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
                                                    <h3 className="mb-3">Register Now</h3>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Name<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i class="ri-user-line"></i></div>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            placeholder="Name"
                                                            value={userData.name}
                                                            onChange={handleChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Email<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i class="ri-mail-line"></i></div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            value={userData.email}
                                                            onChange={handleChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i class="ri-key-line"></i></div>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            value={userData.password}
                                                            onChange={handleChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={12} >
                                                    <label>Confirm Password<span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-text"><i class="ri-lock-line"></i></div>
                                                        <input
                                                            type="password"
                                                            name="password_confirmation"
                                                            placeholder="Confirm Password"
                                                            value={userData.password_confirmation}
                                                            onChange={handleChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </Col>

                                                <Col md={12}>
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

export default RegistrationForm;
