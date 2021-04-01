import React from 'react';
import { Nav, Navbar, Image } from 'react-bootstrap';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import styled from 'styled-components';
import Menu from './Menu';
import Logo from '../../assets/images/logo-png-sm.png';

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

const HeaderStyled = styled(Navbar)`
  font-size: 1.5rem;
  padding-top: 0;
  padding-bottom: 0;
`;

const MenuStyledNavLink = styled(Nav.Link)`
  color: #3B3A3A!important;
  padding-right: .5rem!important;
  padding-left: .5rem!important;
  transition: 0.3s ease-out;
  &:hover {
    color: ${(props) => props.twitter && '#1DA1F2!important'
      || props.facebook && '#3b5998!important'
      || props.instagram && '#E1306C!important'
};
  }
`;