import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import {
  Card, Badge, Button,
} from 'react-bootstrap';
import {
  FaCalendar, FaComment, FaArrowUp, FaArrowDown,
} from 'react-icons/fa';
import axios from '../config/axios';

function Boicote() {
  const [boicote, setBoicote] = useState([]);
  const [isError, setIsError] = useState(false);
  const { boicoteId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/boicotes/${boicoteId}`);
        setBoicote(response.data);
      } catch (error) {
        setIsError(error);
      }
    }
    console.log(isError); // TODO
    getData();
  }, []);

  if (boicote.length === 0) {
    return <h1 className="text-center mt-4">Carregando...</h1>;
  }

  return (
    <div key={String(boicote.id)} className="mb-4 mt-4">
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
            <h3 className="text-center m-0 ml-2 d-inline">{boicote.titulo}</h3>
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
            {boicote.texto}
          </Card.Text>
          <hr />
          <Card.Text>
            <span><b>Links:</b></span>
            {Object.values(boicote.links).map((link) => (
              <span className="mb-1 d-block" key={link.link}>
                <a href={link.link} className="text-white" target="_blank" rel="noreferrer"><i>{link.link}</i></a>
                {/* TODO LINK CONFIAVÉL */}
              </span>
            ))}
          </Card.Text>
          <hr />
          <Card.Text>
            <small>Tags:&nbsp;</small>
            {Object.values(boicote.tags).map((tag) => (
              <Badge key={tag} className="mr-1" pill variant="light">
                <i>{tag}</i>
              </Badge>
            ))}
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
              <Button variant="dark" type="button">Compartilhar</Button>
            </BoicoteLink>
          </div>
        </Card.Footer>
      </StyledCard>

      <br />

      <Title>Comentários</Title>

      <StyledCard>
        <Card.Body>
          <Card.Text>
            TESTE
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          LINKS PARA COMPARTILHAR
        </Card.Footer>
      </StyledCard>

    </div>
  );
}

export default Boicote;

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
