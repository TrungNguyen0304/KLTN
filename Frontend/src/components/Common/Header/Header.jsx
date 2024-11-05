import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../Header/header.css";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  // Sticky Header
  const isSticky = (e) => {
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 120 ? header.classList.add('is-sticky') :
      header.classList.remove('is-sticky');
  }

  const closeMenu = () => {
    if (window.innerWidth <= 991) {
      setOpen(false);
    }
  }

  return (
    <header className="header-section">
      <Container>
        <Navbar expand="lg" className="p-0">
          {/* Logo Section */}
          <Navbar.Brand>
            <NavLink to="/"> Weekendmonks</NavLink>
          </Navbar.Brand>
          {/* End Logo Section */}

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
            show={open}
          >
            {/* Mobile Logo Section */}
            <Offcanvas.Header>
              <h1 className="logo">Weekendmonks</h1>
              <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
              </span>
            </Offcanvas.Header>
            {/* End Mobile Logo Section */}

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="nav-link" to="/" onClick={closeMenu}>
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/about-us" onClick={closeMenu}>
                  ABOUT US
                </NavLink>
                <NavLink className="nav-link" to="/tours" onClick={closeMenu}>
                  TOURS
                </NavLink>

                <NavDropdown
                  title="DESTINATION"
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavLink className="nav-link text-dark" to="/destinations/spain" onClick={closeMenu}>
                    SPAIN TOURS
                  </NavLink>
                  <NavLink className="nav-link text-dark" to="/destinations/italy" onClick={closeMenu}>
                    ITALY TOURS
                  </NavLink>
                  <NavLink className="nav-link text-dark" to="/destinations/france" onClick={closeMenu}>
                    FRANCE TOURS
                  </NavLink>
                </NavDropdown>

                <NavLink className="nav-link" to="/gallery" onClick={closeMenu}>
                  GALLERY
                </NavLink>
                <NavLink className="nav-link" to="/contact-us" onClick={closeMenu}>
                  CONTACT
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <div className="ms-md-4 ms-2">
            <NavLink to="/login" className="primaryBtn d-none d-sm-inline-block">
              Login
            </NavLink>

            {/* User Icon Dropdown */}
            <NavDropdown
              title={<i className="bi bi-person-circle user-icon"></i>} // Styled User icon
              id="user-dropdown"
              align="end"
              className="d-inline-block ms-3"
            >
              <NavDropdown.Item as={NavLink} to="/my-bookings" onClick={closeMenu} className="user-dropdown-item">
                Kì nghỉ của tồi
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/profile" onClick={closeMenu} className="user-dropdown-item">
                Hồ sơ của tôi
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/logout" onClick={closeMenu} className="user-dropdown-item">
                Đăng Xuất
              </NavDropdown.Item>
            </NavDropdown>

            <li className="d-inline-block d-lg-none ms-3 toggle_btn">
              <i className={open ? "bi bi-x-lg" : "bi bi-list"} onClick={toggleMenu}></i>
            </li>
          </div>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
