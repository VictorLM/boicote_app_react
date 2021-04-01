import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Boicotes from './Boicotes';

const Home = () => (
  <>
    <Row>
      <Col>
        <BgDiv className="mainDiv">
          <Row>
            <Col>
              <Title className={`text-center ${window.innerWidth <= 576 ? 'display-4' : 'display-1'}`}>
                Consumir
                <small> é um ato </small>
                político
              </Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <Title2 className="text-justify">
                Aqui você encontra e organiza seus boicotes. Você pode votar e comentar em um
                boicote já criado, ou criar o seu próprio e interagir com a comunidade.
              </Title2>
            </Col>
          </Row>

        </BgDiv>
      </Col>
    </Row>

    <Boicotes />
    <br />
  </>
);

export default Home;

// Styled Components

const BgDiv = styled.div`
  min-height: ${window.innerHeight - 80}px;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Syne Mono', monospace!important;
  font-weight: bold;
  padding: 0 1rem 0 1rem;
`;

const Title2 = styled.h4`
  padding: 0rem 1rem 0 1rem;
`;
