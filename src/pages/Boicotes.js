import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import axios from '../config/axios';
import visitanteCheck from '../config/visitanteCheck';
import BoicotesMultiplos from '../components/Boicote';

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
    // eslint-disable-next-line
    console.log(isError); // TODO
    getData();
  }, []);

  // CHECA COOKIE VISITANTEID
  useEffect(() => {
    visitanteCheck();
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
    <Row>
      <Col>
        <hr />
        <Title id="boicotes-h1">Boicotes</Title>
        <hr />
        {boicotes.map((boicote) => (
          <BoicotesMultiplos key={String(boicote.id)} boicote={boicote} boicoteUnico={false} />
        ))}
      </Col>
    </Row>
  );
}

export default Boicotes;

// Styled Components

const Title = styled.h1`
  text-align: center;
  font-family: 'Syne Mono', monospace!important;
  font-weight: bold;
`;
