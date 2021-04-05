import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <FooterStyled className="">
    <p>Copyright &copy; 2021 - Boicote.App - Todos os direitos reservados</p>
  </FooterStyled>
);

export default Footer;

const FooterStyled = styled.footer`
  text-align: center;
  padding-bottom: .01em;
`;
