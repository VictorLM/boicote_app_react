import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Row, Col, Card, Button, Badge,
} from 'react-bootstrap';
import {
  FaComment, FaCalendar, FaArrowUp, FaArrowDown,
} from 'react-icons/fa';
// import { get } from 'lodash'; TODO
import axios from '../config/axios';

function Boicotes() {
  const [boicotes, setBoicotes] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('/boicotes');
        setBoicotes(response.data);
      } catch (error) {
        setIsError(error);
      }
    }
    console.log(isError); // TODO
    getData();
  }, []);

  if (boicotes.length < 1) {
    return (
      <>
        <hr />
        <Title id="boicotes-h1">Boicotes</Title>
        <hr />
        <h4 className="text-center">Não há boicotes cadastrados para exibir.</h4>
      </>
    );
  }

  return (
    <>
      <Row>
        <Col>
          <hr />
          <Title id="boicotes-h1">Boicotes</Title>
          <hr />
          {boicotes.map((boicote) => (

            <div key={String(boicote.id)} className="mb-4">
              <StyledCard bg="secondary" border="dark">
                <Card.Header className="py-0 d-flex">
                  <ArrowsDiv>
                    <SpanInlineBlock className="m-0 p-0">
                      <ArrowUp votado={1} size={15} title="Votor para cima" />
                    </SpanInlineBlock>
                    <SpanInlineBlock className="m-0 p-0">
                      <small title="Votos para cima"><b>{Number(boicote.cimaVotos) - Number(boicote.baixoVotos)}</b></small>
                    </SpanInlineBlock>
                    <SpanInlineBlock className="m-0 p-0">
                      <ArrowDown votado={0} size={15} title="Votor para baixo" />
                    </SpanInlineBlock>
                  </ArrowsDiv>
                  <BoicoteTitle>
                    <BoicoteLink to={`/boicotes/${boicote.id}`}>
                      <h3 className="text-center m-0 ml-2 d-inline">{boicote.titulo}</h3>
                    </BoicoteLink>
                  </BoicoteTitle>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="mb-1">
                    <span className="h5">
                      <small>Empresa:</small>
                      <Badge className="mr-2 ml-2" variant="light">
                        <b>
                          {' '}
                          {boicote.marca}
                        </b>
                      </Badge>
                      <small>Autor:</small>
                      <Badge className="ml-2" variant="light">
                        <b>
                          {' '}
                          {boicote.autor.nome}
                        </b>
                      </Badge>
                    </span>
                  </Card.Text>
                  <hr />
                  <Card.Text>
                    {boicote.texto.substr(0, 200)}
                    ...
                  </Card.Text>
                  <hr />
                  <Card.Text>
                    <small>Tags:&nbsp;</small>
                    {Object.values(boicote.tags).map((tag) => (
                      <Badge key={tag} className="mr-1" pill variant="light">
                        <i>{tag}</i>
                      </Badge>
                    ))}
                    <Badge pill variant="light" />
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="d-inline-flex">
                    <Span className="mr-2">
                      <FaCalendar />
                        &nbsp;
                      {new Date(boicote.createdAt).toLocaleString().slice(0, 16)}
                    </Span>
                    <Span className="ml-2">
                      <FaComment />
                        &nbsp;
                      {boicote.comentariosCount}
                      {' '}
                      comentários
                    </Span>
                  </div>
                  <div className="float-right">
                    <BoicoteLink to={`/boicotes/${boicote.id}`} className="float-right">
                      <Button variant="dark" type="button">Ver tudo</Button>
                    </BoicoteLink>
                  </div>
                </Card.Footer>
              </StyledCard>
            </div>
          ))}

        </Col>
      </Row>
    </>
  );
}

export default Boicotes;

// Styled Components

const Title = styled.h1`
  text-align: center;
  font-family: 'Syne Mono', monospace!important;
  font-weight: bold;
`;

const StyledCard = styled(Card)`
  margin: 0 1rem 0 1rem;
`;

const Span = styled.span`
  display: inline-flex;
  align-items: baseline;
`;

const SpanInlineBlock = styled.span`
  display: block;
`;

const ArrowsDiv = styled.div`
  float: left;
  text-align: center;
`;

const ArrowUp = styled(FaArrowUp)`
    color: ${(props) => props.votado && '#FF7F50'};
`;

const ArrowDown = styled(FaArrowDown)`
  color: ${(props) => props.votado && '#FF7F50'};
`;

const BoicoteTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left!important;
`;

const BoicoteLink = styled(Link)`
  color: #fff;;
`;
