import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { FaCalendar, FaFlag } from 'react-icons/fa';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';

import axios from '../config/axios';
import ModalDenunciaForm from './ModalDenunciaForm';

function Comentarios({ comentarios }) {
  const [comentarioIdDenuncia, setComentarioIdDenuncia] = useState('');
  // MODAL DENUNCIAR
  const [modalDenunciaFormShow, setModalDenunciaFormShow] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [texto, setTexto] = useState('');
  const [loadingDenunciar, setLoadingDenunciar] = useState(false);

  async function denunciar(e) {
    e.preventDefault();
    // VALIDANDO FORM
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }
    if (texto.length < 3 || texto.length > 255) {
      formErrors = true;
      toast.error('Motivo deve ter entre 3 e 255 caracteres');
    }
    if (formErrors) return;

    const body = {
      nome,
      email,
      texto,
    };

    setLoadingDenunciar(true);

    // ENVIANDO REQUEST PARA API
    await axios.post(`/denuncias/comentario/${comentarioIdDenuncia}`, body, { withCredentials: true })
      .then((response) => { //eslint-disable-line
        setModalDenunciaFormShow(false);
        setLoadingDenunciar(false);
        // TODO - LOADING NO BOTÃO
        toast.success('Denúncia enviada com sucesso. Obrigado por reportar.');
      })
      .catch((error) => {
        setModalDenunciaFormShow(false);
        setLoadingDenunciar(false);
        // eslint-disable-next-line
        console.log(error);
        toast.error('Erro interno. Por favor, tente novamente mais tarde.');
      })
      .then(() => {
      // always executed
      });
  }

  if (comentarios.length < 1) {
    return <h5 className="text-center">Não há comentários cadastrados. Seja o primeiro a comentar!</h5>;
  }

  return (
    <>
      <ModalDenunciaForm
        loading={loadingDenunciar}
        show={modalDenunciaFormShow}
        onHide={() => setModalDenunciaFormShow(false)}
        setNome={setNome}
        setEmail={setEmail}
        setTexto={setTexto}
        denunciar={denunciar}
      />

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
              <LinkLikeSpan onClick={() => {
                setModalDenunciaFormShow(true);
                setComentarioIdDenuncia(comentario.id);
              }}
              >
                <FaFlag />
                <small> Denunciar</small>
              </LinkLikeSpan>
            </div>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
}

export default Comentarios;

// Styled Components

const Span = styled.span`
  display: inline-flex;
  align-items: baseline;
`;

const LinkLikeSpan = styled.span`
  cursor: pointer;
  transition: 0.3s ease-out;
  margin: 0 .5em 0 .5em;
  &:hover {
    color: lightgrey!important;
  }
`;
