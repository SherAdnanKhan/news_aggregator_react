import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../src/assets/navigation.css'
const Navigation = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <>
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">NewsAggregator</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/feed">My Feed</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/preferences">Preferences</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/settings">Settings</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    )}
                    {!isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav> */}
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary nav-bg">
                <Container >
                    <Navbar.Brand href="/">NewsAggregator</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {isAuthenticated ? (
                        <>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/feed">My Feed</NavLink>
                                    <NavLink className="nav-link" to="/preferences">Preferences</NavLink>
                                    <NavLink className="nav-link" to="/settings">Settings</NavLink>
                                </Nav>
                                <Nav>

                                    <Nav.Link eventKey={2} >
                                        <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </>
                    ) : null}
                    {!isAuthenticated ? (
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className='me-auto'>
                                <NavLink className="nav-link " to="/login">Login</NavLink>
                            </Nav>
                        </Navbar.Collapse>

                    ) : null}
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;
