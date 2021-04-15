import React from 'react';
import styled from 'styled-components';
import {
  Jumbotron, Card, Row, Col,
} from 'react-bootstrap';
import {
  FaSearch, FaThumbsUp, FaPlus, FaFlag, FaBullhorn,
  FaRegCheckCircle,
} from 'react-icons/fa';

import Boicotes from './Boicotes';
import {
  primaryColor, backgroundColor,
} from '../config/colors';

const Home = () => (
  <>
    <Jumbo>
      <JumboTitle className={`text-center text-primary zoom-hover ${window.innerWidth <= 576 ? 'display-4' : 'display-3'}`}>
        Consumir é um ato Político
      </JumboTitle>
      <JumboSubTitle className="text-center text-gray">Pratique o consumo consciente</JumboSubTitle>
    </Jumbo>

    <hr />

    <h2 className="text-center my-5 header">
      Como funciona?
    </h2>

    <Row className="">
      <Col sm={12} md={4} className="mb-4">
        <Card className="p-2 border-0 shadow h-100 zoom-hover">
          <Card.Body className="text-justify">
            <Card.Title className="text-primary">
              <FaSearch size={30} />
              {' '}
              Encontre
            </Card.Title>
            Aqui você encontra e organiza seus boicotes.
            Estamos desenvolvendo mais ferramentas e filtros
            para facilitar as pesquisas.
            Em breve haverá novidades, então, fique de olho.
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={4} className="mb-4">
        <Card className="p-2 border-0 shadow h-100 zoom-hover">
          <Card.Body className="text-justify">
            <Card.Title className="text-primary">
              <FaThumbsUp size={30} color={primaryColor} />
              {' '}
              Interaja
            </Card.Title>
            Interaja com a comunidade votando e comentando nos boicotes.
            Para votar nos boicotes, use as setas ao lado esquerdo do título.
            Para comentar, preencha o formulário na página do boicote.
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={4} className="mb-4">
        <Card className="p-2 border-0 shadow h-100 zoom-hover">
          <Card.Body className="text-justify">
            <Card.Title className="text-primary">
              <FaPlus size={30} color={primaryColor} />
              {' '}
              Crie
            </Card.Title>
            Você também pode criar o seu próprio boicote e interagir com a comunidade.
            É só acessar a opção Criar Boicote no menu localizado no topo da página e
            preencher o formulário.
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="">
      <Col sm={12} md={4} className="mb-4">
        <Card className="p-2 border-0 shadow h-100 zoom-hover">
          <Card.Body className="text-justify">
            <Card.Title className="text-primary">
              <FaFlag size={30} />
              {' '}
              Denuncie
            </Card.Title>
            Denuncie boicotes e comentários inapropriados.
            Utilize o link Denunciar, localizado à direita
            do rodapé tanto dos boicotes quanto dos comentários.
            Sua ajuda para manter a comunidade limpa será muito bem-vinda.
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={4} className="mb-4">
        <Card className="p-2 border-0 shadow h-100 zoom-hover">
          <Card.Body className="text-justify">
            <Card.Title className="text-primary">
              <FaBullhorn size={30} color={primaryColor} />
              {' '}
              Compartilhe
            </Card.Title>
            Compartilhe os boicotes nas redes sociais para ter um maior alcance e engajamento.
            Utilize o link Compartilhar, localizado à direita
            do rodapé dos boicotes.
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={4} className="mb-4">
        <Card className="p-2 border-0 shadow h-100 zoom-hover">
          <Card.Body className="text-justify">
            <Card.Title className="text-primary">
              <FaRegCheckCircle size={30} color={primaryColor} />
              {' '}
              Pratique
            </Card.Title>
            Boicote as empresas e marcas com seu poder de compra.
            Não de lucros para quem apoia, pratica ou corrobora com atos e ideias nocivas,
            fake news, discurso de ódio, etc. Pratique o consumo consciente.
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <hr />

    <Boicotes />

  </>
);

export default Home;

// Styled Components

const Jumbo = styled(Jumbotron)`
  padding: 5rem 2rem;
  border-radius: unset!important;
  background-color: ${backgroundColor}!important;
`;

const JumboTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
`;

const JumboSubTitle = styled.h2`
  font-family: 'Raleway', sans-serif;
`;
