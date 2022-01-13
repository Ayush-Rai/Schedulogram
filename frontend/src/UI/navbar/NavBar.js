import { Navbar, Nav, Container } from "react-bootstrap";

import styles from "./NavBar.module.css";

const NavBar = (props) => {
  return (
    <Navbar className={styles.navbar} expand="xxl" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className={styles.navBrand} href="#home">
          <h1>Schedulogram</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={styles.navLink} href="/create">
              Create
            </Nav.Link>
            <Nav.Link className={styles.navLink} href="/table">
              Table
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
