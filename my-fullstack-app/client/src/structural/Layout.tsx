import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useState } from 'react';

function Layout() {

    const [expanded, setExpanded] = useState(false);

    const handleNavClick = () => setExpanded(false);

    return (
        <div>
        <Navbar bg="dark" variant="dark" expand="md" fixed="top" expanded={expanded} onToggle={(val) => setExpanded(val)}>
            <Container>
            <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>MySite</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link as={Link} to="/" onClick={handleNavClick}>Home</Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={handleNavClick}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={handleNavClick}>Register</Nav.Link>
                <Nav.Link as={Link} to="/logout" onClick={handleNavClick}>Logout</Nav.Link>
                <Nav.Link as={Link} to="/reviews" onClick={handleNavClick}>Reviews</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        {/* Push content below the fixed navbar */}
        <div style={{ marginTop: '80px' }}>
            <Container>
            <Outlet />
            </Container>
        </div>
        </div>
    );
}

export default Layout;
