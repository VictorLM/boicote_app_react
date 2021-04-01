import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FaCalendar, FaFlag } from 'react-icons/fa';
import axios from '../config/axios';

function Comentarios({ boicoteId }) {
  const [comentarios, setComentarios] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!boicoteId) return;
    async function getData() {
      try {
        const response = await axios.get(`/comentarios/${boicoteId}`);
        setComentarios(response.data);
      } catch (error) {
        setIsError(error);
      }
    }
    // eslint-disable-next-line
    console.log(isError); // TODO
    getData();
  }, []);

  if (comentarios.length < 1) {
    return <h4 className="text-center">Não há comentários para exibir.</h4>;
  }

  return (
    <>
      {comentarios.map((comentario) => (

        <Card key={String(comentario.id)} className="m-3" bg="secondary" border="dark">
          {/* TODO COMENTÁRIO CONFIAVÉL */}
          <Card.Body>
            <Card.Text>
              {comentario.comentario}
            </Card.Text>
            <Card.Text>
              <span>
                <i>
                  {'- '}
                  {comentario.Autor.nome}
                </i>
              </span>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="d-inline-flex">
              <Span className="mr-2">
                <FaCalendar />
                  &nbsp;
                {new Date(comentario.createdAt).toLocaleString().slice(0, 16)}
                {/* ARRUMAR O UTC. ESTA EXIBINDO A HORA UTC-3 POR CAUSA DO LOCALE */}
              </Span>
            </div>
            <div className="float-right">
              <ComentarioLink to={`/comentarios/reportar/${comentario.id}`}>
                <FaFlag />
                <small> Reportar</small>
                {/* TODO BACKEND REPORT */}
              </ComentarioLink>
            </div>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
}

export default Comentarios;

const Span = styled.span`
  display: inline-flex;
  align-items: baseline;
`;

const ComentarioLink = styled(Link)`
  color: #fff;
  margin: 0 .5em 0 .5em;
`;
