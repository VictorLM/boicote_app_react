import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import axios from '../config/axios';
import visitanteCheck from '../config/visitanteCheck';
import BoicoteUnico from '../components/Boicote';
import Comentarios from '../components/Comentarios';

function Boicote() {
  const [boicote, setBoicote] = useState([]);
  const [isError, setIsError] = useState(false);
  const { boicoteId } = useParams();

  useEffect(() => {
    if (!boicoteId) return;
    async function getData() {
      try {
        const response = await axios.get(`/boicotes/${boicoteId}`);
        setBoicote(response.data);
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

  if (boicote.length === 0) {
    return <h1 className="text-center mt-4">Carregando...</h1>;
  }

  return (
    <div key={String(boicote.id)} className="mb-2 mt-4">
      <BoicoteUnico key={String(boicote.id)} boicote={boicote} boicoteUnico />
      <hr />
      <Title>Comentários</Title>
      <hr />
      <Comentarios boicoteId={boicote.id} />
    </div>
  );
}

export default Boicote;

// Styled Components

const Title = styled.h2`
  text-align: center;
  font-family: 'Syne Mono', monospace!important;
  font-weight: bold;
`;
