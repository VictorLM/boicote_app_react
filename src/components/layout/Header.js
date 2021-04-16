import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import styled from 'styled-components';
import Menu from './Menu';
import { primaryColor, secondaryColor } from '../../config/colors';

const Header = () => (
  <HeaderStyled expand="lg">
    <Navbar.Brand className="py-1 pr-2">
      <Link to="/">
        <LogoHeader className="zoom-hover">
          boicote
          <span>.app</span>
        </LogoHeader>
      </Link>
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
      <span className="d-block d-md-none"><br /></span>
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
  color: ${primaryColor}!important;
  padding-right: .5rem!important;
  padding-left: .5rem!important;
  &:hover {
    color: ${(props) => props.twitter && '#1DA1F2!important'
      || props.facebook && '#3b5998!important'
      || props.instagram && '#E1306C!important'
};
  }
`;

const LogoHeader = styled.h3`
  padding: .5rem .5rem 0 0;
  color: ${primaryColor} !important;
  font-family: 'Poppins', sans-serif;
  font-weight: 700 !important;
  cursor: pointer;
  &:hover{
    color: ${primaryColor} !important;
  }
  & > span {
    color: ${secondaryColor} !important;
    font-weight: 500 !important;
  }
`;
