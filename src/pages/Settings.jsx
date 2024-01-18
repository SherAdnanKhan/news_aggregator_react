import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import '../assets/settingsStyle.css';
import { Button, Form, FormGroup, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const Settings = ({ user }) => {
    const [settings, setSettings] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/user/settings', settings);
            setErrors({});
            toast.success('Settings updated successfully!');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating settings', error);
                setErrors({ general: 'Error updating settings' });
            }
        }
    };

    useEffect(() => {
        if (user) {
            setSettings({ name: user.name, email: user.email });
        }
    }, [user]);

    return (
        <Container className="settings-container my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white">
                            <i className="ri-user-settings-line"></i> Settings
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit} className="settings-form">
                                <FormGroup>
                                    <Form.Label htmlFor="name">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={settings.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className={errors.name ? 'is-invalid' : ''}
                                        id="name"
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name.join(', ')}</div>}
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={settings.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className={errors.email ? 'is-invalid' : ''}
                                        id="email"
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email.join(', ')}</div>}
                                </FormGroup>

                                <Button type="submit" variant="primary" className="mt-3">Save Settings</Button>

                                {errors.general && (
                                    <Alert variant="danger" className="mt-3">
                                        {errors.general}
                                    </Alert>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};


export default Settings;
