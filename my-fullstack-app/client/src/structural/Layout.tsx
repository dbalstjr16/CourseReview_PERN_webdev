import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import userContext from '../context/userContext';

function Layout() {

    const [expanded, setExpanded] = useState(false);
    const handleNavClick = () => setExpanded(false);

    const [loginStatus, setLoginStatus] = useState(false);

    // set Login Status to true, if token and cookie is still valid
    useEffect(() => {
        fetch('http://localhost:3000/users/me', {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            setLoginStatus(data.isLoggedIn);
        })
        .catch(() => setLoginStatus(false)) 
    }, []);

    return (
        <div>
        <Navbar bg="dark" variant="dark" expand="md" fixed="top" expanded={expanded} onToggle={(val) => setExpanded(val)}>
            <Container>
            <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>MySite</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link as={Link} to="/" onClick={handleNavClick}>Home</Nav.Link>
                
                {loginStatus ? (
                <>
                    <Nav.Link as={Link} to="/searchPage" onClick={handleNavClick}>Reviews</Nav.Link>
                    <Nav.Link as={Link} to="/logout" onClick={handleNavClick}>Logout</Nav.Link>                
                </>
                ) : (
                <>
                    <Nav.Link as={Link} to="/login" onClick={handleNavClick}>Login</Nav.Link>
                    <Nav.Link as={Link} to="/register" onClick={handleNavClick}>Register</Nav.Link>
                </>
                )}

                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        {/* Push content below the fixed navbar */}
        <div style={{ marginTop: '80px' }}>
            <userContext.Provider value={[loginStatus, setLoginStatus]}>
                <Container>
                    <Outlet />
                </Container>
            </userContext.Provider>
        </div>
        </div>
    );
}

export default Layout;
