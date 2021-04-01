import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Menu = () => (
  <>
    <MenuStyled className="nav-link" to="/">Home</MenuStyled>
    <MenuStyled className="nav-link" to="/boicotes">Boicotes</MenuStyled>
    <MenuStyled className="nav-link" to="/novo-boicote">Criar Boicote</MenuStyled>
    <MenuStyled className="nav-link" to="/sobre">Sobre</MenuStyled>
  </>
);

export default Menu;

const MenuStyled = styled(Link)`
  color: #3B3A3A!important;
  padding-right: 1rem!important;
  padding-left: 1rem!important;
  transition: 0.3s ease-out;
  &:hover {
    background-color: #3B3A3A;
    color: #fff!important;
  }
`;
