import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const Sobre = () => (
  <>
    <hr />
    <h1 className="text-center">Sobre</h1>
    <hr />
    <Card className="m-4 px-4" bg="secondary" border="dark">
      <Card.Body className="mt-2 pb-0">

        <h2 className="text-center">
          Boicote.App - versão 1.0.0
        </h2>
        <hr />
        <Card.Text className="text-justify">
          Desenvolvido e mantido por mim, Victor Meireles, eterno Águia II.
          Você pode me encontrar no Twitter:
          {' '}
          <a href="https://twitter.com/IAmDinamite/" target="_blank" rel="noreferrer">@IAmDinamite</a>
          .
        </Card.Text>
        <Card.Text className="text-justify">
          Esse é meu primeirio projeto desenvolvido em Java Script.
          Back-end em NodeJS + Express e front-end em React.
        </Card.Text>
        <Card.Text className="text-justify">
          Boicote.App é um projeto independente e sem fins lucrativos. Por favor, não quebre-o.
        </Card.Text>
        <Card.Text className="text-justify">
          &#8220;
          <i> É vivendo que se aprende </i>
          &#8222;
          &nbsp;&nbsp; — Pistoleiro Papaco.
        </Card.Text>
        <hr />
        <h2 className="text-center">
          Redes sociais
        </h2>
        <hr />
        <Card.Text className="text-center mb-4">
          <MenuStyledLink twitter="true" className="d-inline" href="https://twitter.com/boicoteapp/" target="_blank" rel="noreferrer">
            <FaTwitter size={50} />
          </MenuStyledLink>
          <MenuStyledLink facebook="true" className="d-inline" href="https://facebook.com/boicoteapp/" target="_blank" rel="noreferrer">
            <FaFacebook size={50} />
          </MenuStyledLink>
          <MenuStyledLink instagram="true" className="d-inline" href="https://instagram.com/boicoteapp/" target="_blank" rel="noreferrer">
            <FaInstagram size={50} />
          </MenuStyledLink>
        </Card.Text>
      </Card.Body>
    </Card>
  </>
);

export default Sobre;

const MenuStyledLink = styled.a`
  color: #fff!important;
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
