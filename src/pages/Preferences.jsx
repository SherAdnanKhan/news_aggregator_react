import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/preferencesStyle.css";
import MultiSelect from "react-select";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Preferences = () => {
    const [sources, setSources] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    useEffect(() => {
        // Fetch sources
        axiosInstance.get('/user/get-preferences')
            .then(response => {
                setSelectedSources(response?.data?.preferred_sources);
                setSelectedCategories(response?.data?.preferred_categories.map(s => ({ value: s.id, label: s.name })));
                setSelectedAuthors(response?.data?.preferred_authors.map(s => ({ value: s.id, label: s.name })));
            })
            .catch(error => console.error('Error fetching sources', error));
        axiosInstance.get('/sources')
            .then(response => setSources(response.data))
            .catch(error => console.error('Error fetching sources', error));

        // Fetch categories
        axiosInstance.get('/categories')
            .then(response => setCategories(response.data.map(s => ({ value: s.id, label: s.name }))))
            .catch(error => console.error('Error fetching categories', error));

        // Fetch categories
        axiosInstance.get('/authors')
            .then(response => setAuthors(response.data.map(s => ({ value: s.id, label: s.name }))))
            .catch(error => console.error('Error fetching authors', error));
    }, []);

    const handleSourceChange = (sourceId) => {
        setSelectedSources(prev => prev.includes(sourceId) ? prev.filter(id => id !== sourceId) : [...prev, sourceId]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/user/update-preferences', {
                preferred_sources: selectedSources,
                preferred_categories: selectedCategories,
                preferred_authors: selectedAuthors,

            });
            toast.success('Preferences updated successfully!');
        } catch (error) {
            console.error('Error updating preferences', error);
            toast.error('Error updating preferences');
        }
    };

    return (
        <Container className="preferences-container my-4">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Card>
                        <Card.Header>
                            <h2 className="preferences-header">Preferences</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <div className="preferences-section mb-3">
                                    <h3>Sources</h3>
                                    {sources.map(source => (
                                        <Form.Check
                                            type="checkbox"
                                            id={`source-${source.id}`}
                                            label={source.name}
                                            checked={selectedSources.includes(source.id)}
                                            onChange={() => handleSourceChange(source.id)}
                                            key={source.id}
                                        />
                                    ))}
                                </div>
                                <div className="preferences-section mb-3">
                                    <h3>Authors</h3>
                                    <MultiSelect
                                        value={selectedAuthors}
                                        isMulti
                                        name="select"
                                        options={authors}
                                        className="basic-multi-select"
                                        placeholder="Select Authors"
                                        classNamePrefix="select"
                                        onChange={(selectedOptions) => {
                                            setSelectedAuthors(selectedOptions ? selectedOptions.map(option => ({ value: option.value, label: option.label })) : []);
                                        }}
                                    />
                                </div>
                                <div className="preferences-section mb-3">
                                    <h3>Categories</h3>
                                    <MultiSelect
                                        options={categories}
                                        isMulti
                                        className="basic-multi-select"
                                        name="select"
                                        classNamePrefix="select"
                                        placeholder="Select Categories"
                                        value={selectedCategories}
                                        onChange={(selectedOptions) => {
                                            setSelectedCategories(selectedOptions ? selectedOptions.map(option => ({ value: option.value, label: option.label })) : []);
                                        }} />
                                </div>
                                <Button type="submit" variant="primary" className="submit-button">Save Preferences</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer autoClose={5000} />
        </Container>
    );
};

export default Preferences;