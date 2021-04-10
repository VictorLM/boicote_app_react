import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { FaFlag } from 'react-icons/fa';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';

import axios from '../config/axios';
import ModalDenunciaForm from './ModalDenunciaForm';
import {
  primaryColor, secondaryColor,
} from '../config/colors';

function Comentario({ comentario }) {
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
    try {
      await axios.post(`/denuncias/comentario/${comentarioIdDenuncia}`, body, { withCredentials: true });
      setModalDenunciaFormShow(false);
      setLoadingDenunciar(false);
      toast.success('Denúncia enviada com sucesso. Obrigado por reportar.');
    } catch (err) {
      setModalDenunciaFormShow(false);
      setLoadingDenunciar(false);
      if (err.response) {
        // HOUVE RESPOSTA COM ERROR CODE
        const errors = err.response.data ?? []; // NÃO PEGA ERRO UNIQUE DO SEQUELIZE

        if (errors.length > 0 && typeof errors === 'object') { // PARA STRING NÃO DAR FATAL NO MAP
          errors.map((error) => toast.error(error.message));
        } else {
          toast.error(`Erro desconhecido ao enviar denúncia. Tente novamente mais tarde. Code: ${err.response.status}.`);
        }
      } else if (err.request) {
        // NÃO HOUVE RESPOSTA
        toast.error('Nossos servidores não estão respondendo. Tente novamente mais tarde.');
      }
      // console.error(err);
    }
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

      <Card className="border-0 shadow p-2">
        {/* TODO COMENTÁRIO CONFIAVÉL - AJUSTAR API PRIMEIRO */}
        <Card.Body>
          <Card.Text>
            <span className="text-gray text-pouco-menor">
              {' Postado por '}
              <b>{comentario.Autor.nome}</b>
              {' em '}
              {new Date(comentario.createdAt).toLocaleString().slice(0, 16)}
            </span>
          </Card.Text>
          <Card.Text>
            {comentario.comentario}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-white">
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
    </>
  );
}

export default Comentario;

// Styled Components

const LinkLikeSpan = styled.span`
  cursor: pointer;
  margin-right: .5em;
  color: ${secondaryColor}!important;
  &:hover {
    color: ${primaryColor}!important;
  }
`;
