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
            <Nav.Link
              className={this.props.page === 0 ? "active" : ""}
              onClick={() => this.props.setPage(0)}
            >
              Create a Sector File
            </Nav.Link>
            <Nav.Link
              className={this.props.page === 1 ? "active" : ""}
              onClick={() => this.props.setPage(1)}
            >
              Convert to KML
            </Nav.Link>
            <Nav.Link
              className={this.props.page === 2 ? "active" : ""}
              onClick={() => this.props.setPage(2)}
            >
              Convert FAA MVA/MIA
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
