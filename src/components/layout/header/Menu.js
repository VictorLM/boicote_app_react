import React from 'react';
import { MenuStyled } from './MenuStyled';

const Menu = () => (
  <>
    <MenuStyled className="nav-link" to="/">Home</MenuStyled>
    <MenuStyled className="nav-link" to="/boicotes">Boicotes</MenuStyled>
    <MenuStyled className="nav-link" to="/novo-boicote">Criar Boicote</MenuStyled>
    <MenuStyled className="nav-link" to="/sobre">Sobre</MenuStyled>
  </>
);

export default Menu;
