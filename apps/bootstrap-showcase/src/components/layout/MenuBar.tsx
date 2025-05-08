"use client";

/**
 * Navigation menu bar for the application.
 */

// External Modules ----------------------------------------------------------

import { Images } from "lucide-react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function MenuBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <Images className="pe-2" size={38}/>
          React-Bootstrap Showcase
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/*<Nav.Link href="/showcase">Showcase</Nav.Link>*/}
            <NavDropdown title="Examples" id="basic-nav-dropdown">
              <NavDropdown.Item href="/buttons">Buttons</NavDropdown.Item>
              <NavDropdown.Item href="/toasts">Toasts</NavDropdown.Item>
{/*
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
*/}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
