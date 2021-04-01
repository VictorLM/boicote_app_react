import React from 'react';
import { Nav, Navbar, Image } from 'react-bootstrap';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Menu from './Menu';
import Logo from '../../../assets/images/logo-png-sm.png';
import { HeaderStyled } from './headerStyled';
import { MenuStyledNavLink } from './MenuStyled';

const Header = () => (
  <HeaderStyled bg="light" border="rounded" expand="lg">
    <Navbar.Brand className="py-1">
      <Image src={Logo} rounded />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Menu />
      </Nav>
      <Nav className="d-inline">
        <MenuStyledNavLink twitter="true" className="d-inline" href="https://twitter.com/boicoteapp/" target="_blank">
          <FaTwitter />
        </MenuStyledNavLink>
        <MenuStyledNavLink facebook="true" className="d-inline" href="https://facebook.com/boicoteapp/" target="_blank">
          <FaFacebook />
        </MenuStyledNavLink>
        <MenuStyledNavLink instagram="true" className="d-inline" href="https://instagram.com/boicoteapp/" target="_blank">
          <FaInstagram />
        </MenuStyledNavLink>
      </Nav>
    </Navbar.Collapse>
  </HeaderStyled>
);

export default Header;
