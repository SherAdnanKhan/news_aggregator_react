import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';
import ArticleDetails from './components/ArticleDetails';
import RegistrationForm from './components/RegistrationForm';
import LoginComponent from './components/LoginForm';
import Navigation from './components/Navigation';
import ArticlesPage from './components/ArticlesPage';
import Preferences from './pages/Preferences';
import Settings from './pages/Settings';
import './assets/bootstrap.min.css';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
    // State for managing authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to update authentication state
    const handleLogin = (token, userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('token', token);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
    };

    // Component to extract articleId from URL parameters
    const ArticleDetailsWrapper = () => {
        const { articleId } = useParams();
        return <ArticleDetails articleId={articleId} />;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token);
        } else {
            setIsLoading(false); // If no token, set loading to false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const validateToken = async (token) => {
        try {
            const response = await axios.get('http://localhost:8000/api/validate-token', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                handleLogin(token, response.data.user);
            }
        } catch (error) {
            console.error('Token validation failed', error);
            handleLogout();
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="loader"></div>
            </div>
        );
    }
    return (
        <Router>
            <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<ArticlesPage title={'Feed'} apiUrl={'http://localhost:8000/api/articles'} />} />
                <Route path="/login" element={<LoginComponent onLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/feed" element={isAuthenticated ? <ArticlesPage title={'Personalized Feed'} apiUrl={'http://localhost:8000/api/feed'} user={user} /> : <Navigate to="/login" />} />
                <Route path="/preferences" element={isAuthenticated ? <Preferences user={user} /> : <Navigate to="/login" />} />
                <Route path="/settings" element={isAuthenticated ? <Settings user={user} /> : <Navigate to="/login" />} />
                <Route path="/articles/:articleId" element={<ArticleDetailsWrapper />} />
            </Routes>
        </Router>
    );
};

export default App;
