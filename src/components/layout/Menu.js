import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryColor, grayColor } from '../../config/colors';

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
  font-size: .85em;
  color: ${grayColor}!important;
  padding-right: 1rem!important;
  padding-left: 1rem!important;
  &:hover {
    background-color: ${primaryColor};
    color: #fff!important;
  }
`;
