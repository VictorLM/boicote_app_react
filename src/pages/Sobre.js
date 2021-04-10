import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { primaryColor } from '../config/colors';

const Sobre = () => (
  <>
    <h1 className="text-center my-4 header">SOBRE</h1>
    <Card className="px-4 border-0 shadow">
      <Card.Body className="mt-2 pb-0">

        <h3 className="text-center text-dark header">
          BOICOTE.APP - VERSÃO 1.0.0
        </h3>
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
          e as informações filtradas. Pratique o consumo consciente. Consumir é um ato político.
        </Card.Text>
        <Card.Text className="text-justify">
          Desenvolvido e mantido por mim, Victor Meireles, eterno Águia II.
          Você pode me encontrar no Twitter em
          {' '}
          <a href="https://twitter.com/IAmDinamite/" target="_blank" rel="noreferrer">@IAmDinamite</a>
          , ou através do e-mail
          {' '}
          <a href="mailto:boicoteapp@gmail.com">boicoteapp@gmail.com</a>
          .
        </Card.Text>
        <Card.Text className="text-justify">
          Esse é meu primeiro projeto desenvolvido em Java Script.
          Back-end em NodeJS + Express e front-end em React.
        </Card.Text>
        <Card.Text className="text-justify">
          Boicote.App é um projeto independente e sem fins lucrativos. Por favor, não quebre-o.
        </Card.Text>
        <blockquote className="blockquote">
          <p className="mb-0">É vivendo que se aprende.</p>
          <footer className="blockquote-footer">
            <cite title="Fonte">Pistoleiro Papaco</cite>
          </footer>
        </blockquote>
        <hr />
        <h3 className="text-center text-dark header mb-4">
          REDES SOCIAIS
        </h3>
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
