import React from "react";
import "../styles.css";
import Logo from "../img/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <a
            href="http://bvartcc.com"
            target="_blank"
            rel="noreferrer"
            className="logo"
          >
            <img src={Logo} alt="BVA" />
          </a>
          <h1>Facility Engineer Toolkit</h1>
        </div>
        <Navbar bg="dark" variant="dark" className="justify-content-center">
          <Nav>
            <Nav.Link active>Create a Sector File</Nav.Link>
            <Nav.Link>Convert to KML</Nav.Link>
            <Nav.Link>Convert FAA MVA/MIA</Nav.Link>
            <Nav.Link>Help</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
