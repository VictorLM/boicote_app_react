import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import {
  Card, Badge, Button, Row, Col,
} from 'react-bootstrap';
import {
  FaCalendar, FaComment, FaArrowUp, FaArrowDown, FaFlag, FaShareSquare,
} from 'react-icons/fa';

import axios from '../config/axios';
import ModalDenunciaForm from './ModalDenunciaForm';
import CompartilharBtnsPopover from './CompartilharBtnsPopover';

const Boicote = ({ boicote, boicoteUnico, voto }) => {
  const [votoBoicote, setVotoBoicote] = useState(voto);
  const [votosBoicoteCount, setVotosBoicoteCount] = useState(
    Number(boicote.cimaVotos) - Number(boicote.baixoVotos),
  );
  // MODAL DENUNCIAR
  const [modalDenunciaFormShow, setModalDenunciaFormShow] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [texto, setTexto] = useState('');
  const [loadingDenunciar, setLoadingDenunciar] = useState(false);
  // POPOVER COMPARTILHAR
  const [compartilharBtnsPopoverShow, setCompartilharBtnsPopoverShow] = useState(false);
  const compartilharBtnsPopoverTarget = document.getElementById('compartilhar-btn');

  function setNovoVotosBoicoteCount(votoIsCima) {
    if (votoBoicote === null) {
      setVotosBoicoteCount(votoIsCima ? votosBoicoteCount + 1 : votosBoicoteCount - 1);
    } else {
      setVotosBoicoteCount(votoIsCima ? votosBoicoteCount + 2 : votosBoicoteCount - 2);
    }
  }

  async function votar(votoIsCima) {
    // TODO - ADD OPÇÃO DE DESVOTAR - PRIMEIRO LÁ NA API
    // ENVIANDO REQUEST PARA API
    try {
      const response = await axios.post(`/votos/${boicote.id}`, { cima: votoIsCima }, { withCredentials: true });
      setNovoVotosBoicoteCount(response.data.cima);
      setVotoBoicote(response.data.cima ? 1 : 0);
    } catch (err) {
      if (err.response) {
        // HOUVE RESPOSTA COM ERROR CODE
        const errors = err.response.data ?? []; // NÃO PEGA ERRO UNIQUE DO SEQUELIZE

        if (errors.length > 0 && typeof errors === 'object') { // PARA STRING NÃO DAR FATAL NO MAP
          errors.map((error) => toast.error(error.message));
        } else {
          toast.error(`Erro desconhecido ao enviar voto. Tente novamente mais tarde. Code: ${err.response.status}.`);
        }
      } else if (err.request) {
        // NÃO HOUVE RESPOSTA
        toast.error('Nossos servidores não estão respondendo. Tente novamente mais tarde.');
      }
      // console.error(err);
    }
  }

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
      await axios.post(`/denuncias/boicote/${boicote.id}`, body, { withCredentials: true });
      setLoadingDenunciar(false);
      setModalDenunciaFormShow(false);
      toast.success('Denúncia enviada com sucesso. Obrigado por reportar.');
    } catch (err) {
      setLoadingDenunciar(false);
      setModalDenunciaFormShow(false);
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
    <div className="mb-2 mt-4">

      <ModalDenunciaForm
        loading={loadingDenunciar}
        show={modalDenunciaFormShow}
        onHide={() => setModalDenunciaFormShow(false)}
        setNome={setNome}
        setEmail={setEmail}
        setTexto={setTexto}
        denunciar={denunciar}
      />

      <Card className="" bg="secondary" border="dark">
        <Card.Header className="py-0 d-flex">
          <ArrowsDiv>
            <SpanInlineBlock className="m-0 p-0">
              <ArrowUp voto={votoBoicote} onClick={() => votar(true)} size={15} title="Votor para cima" />
            </SpanInlineBlock>
            <SpanInlineBlock className="m-0 p-0">
              <small title="Votos para cima"><b>{votosBoicoteCount}</b></small>
            </SpanInlineBlock>
            <SpanInlineBlock className="m-0 p-0">
              <ArrowDown voto={votoBoicote} onClick={() => votar(false)} size={15} title="Votor para baixo" />
            </SpanInlineBlock>
          </ArrowsDiv>
          <BoicoteTitle>
            {boicoteUnico
              ? (
                <h3 className="m-0 ml-3 d-inline text-center text-md-left">{boicote.titulo}</h3>
              ) : (
                <BoicoteLink className="text-center text-md-left" to={`/boicotes/${boicote.id}`}>
                  <h3 className="m-0 ml-3 d-inline">{boicote.titulo}</h3>
                </BoicoteLink>
              )}
          </BoicoteTitle>
        </Card.Header>
        <Card.Body>
          <div className="d-block d-md-inline mr-2">
            Empresa:
            <span className="h5">
              <Badge className="mr-2 ml-2" variant="light">
                <b>
                  {' '}
                  {boicote.marca}
                </b>
              </Badge>
            </span>
          </div>
          <div className="d-block d-md-inline">
            Autor:
            <span className="d-xs-block d-md-none">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="h5">
              <Badge className="ml-2" variant="light">
                <b>
                  {' '}
                  {boicote.autor.nome}
                </b>
              </Badge>
            </span>
          </div>
          <hr />
          <Card.Text className="text-justify">
            {boicoteUnico ? boicote.texto : `${boicote.texto.substr(0, 200)}...`}
          </Card.Text>
          {boicoteUnico
            && (
            <>
              <hr />
              <Card.Text>
                <span><b>Links:</b></span>
                {Object.values(boicote.links).map((link) => (
                  <span className="mb-1 d-block" key={link.link}>
                    <a href={link.link} className="text-white" target="_blank" rel="noreferrer"><i>{link.link}</i></a>
                    {/* TODO LINK CONFIAVÉL - AJUSTAR API PRIMEIRO */}
                  </span>
                ))}
              </Card.Text>
            </>
            )}

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
        <Card.Footer className="text-center">

          <Row>
            <Col md={6} className="text-md-left">
              <span className="d-inline-flex align-items-baseline mr-2">
                <FaCalendar />
              &nbsp;
                {new Date(boicote.createdAt).toLocaleString().slice(0, 16)}
              </span>
              <span className="d-inline-flex align-items-baseline ml-2">
                <FaComment />
              &nbsp;
                {boicote.comentariosCount}
                {' '}
                comentários
              </span>
            </Col>
            <Col md={6} className="text-md-right">
              {boicoteUnico
                ? (
                  <>
                    {/* TODO - POPOVER NÃO FECHA AO CLICAR FORA DO TRIGGER */}
                    <CompartilharBtnsPopover
                      show={compartilharBtnsPopoverShow}
                      target={compartilharBtnsPopoverTarget}
                      url={window.location.href}
                    />
                    <LinkLikeSpan id="compartilhar-btn" onClick={() => setCompartilharBtnsPopoverShow(!compartilharBtnsPopoverShow)}>
                      <FaShareSquare />
                      <small> Compartilhar</small>
                    </LinkLikeSpan>
                    <LinkLikeSpan onClick={() => setModalDenunciaFormShow(true)}>
                      <FaFlag />
                      <small> Denunciar</small>
                    </LinkLikeSpan>
                  </>
                ) : (
                  <>
                    <span className="d-block d-md-none"><br /></span>
                    <BoicoteLink to={`/boicotes/${boicote.id}`}>
                      <Button variant="dark" type="button" size="sm">Ver tudo</Button>
                    </BoicoteLink>
                  </>
                )}
            </Col>
          </Row>

        </Card.Footer>
      </Card>

    </div>
  );
};

export default Boicote;

// Styled Components

const LinkLikeSpan = styled.span`
  cursor: pointer;
  margin-right: .5em;
  &:hover {
    color: lightgrey!important;
  }
`;

const SpanInlineBlock = styled.span`
  display: block;
`;

const ArrowsDiv = styled.div`
  float: left;
  text-align: center;
`;

const ArrowUp = styled(FaArrowUp)`
  color: ${(props) => props.voto && '#FF7F50'};
  cursor: pointer;
`;

const ArrowDown = styled(FaArrowDown)`
  color: ${(props) => props.voto === 0 && '#FF7F50'};
  cursor: pointer;
`;

const BoicoteTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoicoteLink = styled(Link)`
  color: #fff;
  margin: 0 .5em 0 .5em;
`;
