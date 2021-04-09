import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const Sobre = () => (
  <>
    <h1 className="text-center mb-3">Sobre</h1>
    <Card className="px-4" bg="secondary" border="dark">
      <Card.Body className="mt-2 pb-0">

        <h2 className="text-center">
          Boicote.App - versão 1.0.0
        </h2>
        <hr />
        <Card.Text className="text-justify">
          Boicote.App foi desenvolvido com o objetivo de centralizar os boicotes na internet.
          {' '}
          Com o sistema de votos,
          {' '}
          a comunidade pode validar cada boicote e também interagir nos comentários.
          {' '}
          Também há um sistema de denúncias, para manter a comunidade mais saudável
          {' '}
          e as informações filtradas. Patrique o consumo consciente. Consumir é um ato político.
        </Card.Text>
        <Card.Text className="text-justify">
          Desenvolvido e mantido por mim, Victor Meireles, eterno Águia II.
          Você pode me encontrar no Twitter em
          {' '}
          <StyledLink href="https://twitter.com/IAmDinamite/" target="_blank" rel="noreferrer">@IAmDinamite</StyledLink>
          , ou através do e-mail
          {' '}
          <StyledLink href="mailto:boicoteapp@gmail.com">boicoteapp@gmail.com</StyledLink>
          .
        </Card.Text>
        <Card.Text className="text-justify">
          Esse é meu primeiro projeto desenvolvido em Java Script.
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
  &:hover {
    color: ${(props) => props.twitter && '#1DA1F2!important'
      || props.facebook && '#3b5998!important'
      || props.instagram && '#E1306C!important'
};
  }
`;

const StyledLink = styled.a`
  color: #00bfff!important;
`;
