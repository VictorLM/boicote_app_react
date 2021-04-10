import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import {
  Card, Button, Row, Col,
} from 'react-bootstrap';
import {
  FaComment, FaArrowUp, FaArrowDown, FaFlag, FaShareSquare,
} from 'react-icons/fa';

import axios from '../config/axios';
import ModalDenunciaForm from './ModalDenunciaForm';
import CompartilharBtnsPopover from './CompartilharBtnsPopover';
import {
  primaryColor, secondaryColor, orange, grayColor,
} from '../config/colors';

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

      <Card className="border-0 shadow">
        <Card.Body className="pr-md-5">

          <Row>
            <Col xs={0} md={1} className="text-center d-none d-md-block">
              <span className="m-0 p-0 d-block">
                <ArrowUp voto={votoBoicote} onClick={() => votar(true)} size={30} title="Votor para cima" />
              </span>
              <span className="m-0 p-0 d-block">
                <span className="h6" title="Votos para cima"><b>{votosBoicoteCount}</b></span>
              </span>
              <span className="m-0 p-0 d-block">
                <ArrowDown voto={votoBoicote} onClick={() => votar(false)} size={30} title="Votor para baixo" />
              </span>
            </Col>

            <Col xs={12} md={11}>

              <Row>

                <Col xs={12} md={10} className="">

                  <small className="text-gray">
                    {Object.values(boicote.tags).map((tag, index) => (
                      <i key={tag}>
                        <b>
                          {tag}
                          {Object.values(boicote.tags).length !== index + 1 && ', '}
                        </b>
                      </i>
                    ))}
                  </small>

                  <Card.Title className="mt-1 mb-0">
                    {boicoteUnico
                      ? (
                        <h4 className="m-0 text-primary">{boicote.titulo}</h4>
                      ) : (
                        <Link to={`/boicotes/${boicote.id}`}>
                          <Title className="m-0">{boicote.titulo}</Title>
                        </Link>
                      )}
                  </Card.Title>
                  <small className="text-muted">
                    {' '}
                    Postado por
                    {' '}
                    <b>{boicote.autor.nome}</b>
                    {' '}
                    em
                    {' '}
                    {new Date(boicote.createdAt).toLocaleString().slice(0, 16)}
                  </small>

                </Col>

                <Col xs={12} md={2} className="text-gray text-center w-auto mt-2 mt-md-0">
                  <MarcaDiv className="vertical-center p-3 p-md-0">
                    <span className="text-pouco-menor">{boicote.marca}</span>
                  </MarcaDiv>
                </Col>

              </Row>

              <hr />

              <Card.Text className="text-justify my-3">
                {boicoteUnico ? boicote.texto : `${boicote.texto.substr(0, 235)}...`}
              </Card.Text>

              <hr />

              {boicoteUnico
              && (
              <>
                <Card.Text>
                  {Object.values(boicote.links).map((link) => (
                    <span className="mb-1 d-block" key={link.link}>
                      <a href={link.link} target="_blank" rel="noreferrer"><i>{link.link}</i></a>
                      {/* TODO LINK CONFIAVÉL - AJUSTAR API PRIMEIRO */}
                    </span>
                  ))}
                </Card.Text>
                <hr />
              </>
              )}

              <div className="text-center">

                <Row>

                  <Col xs={4} md={0} className="d-block d-md-none text-center">
                    <span className="m-0 p-0 d-block">
                      <ArrowUp voto={votoBoicote} onClick={() => votar(true)} size={30} title="Votor para cima" />
                    </span>
                    <span className="m-0 p-0 d-block">
                      <span className="h6" title="Votos para cima"><b>{votosBoicoteCount}</b></span>
                    </span>
                    <span className="m-0 p-0 d-block">
                      <ArrowDown voto={votoBoicote} onClick={() => votar(false)} size={30} title="Votor para baixo" />
                    </span>
                  </Col>

                  <Col xs={8} md={12} className="">

                    <Row>

                      <Col md={6} className="text-right text-md-left text-gray mb-2 mb-md-0">
                        <span className="ml-2 d-inline-flex text-pouco-menor">
                          <FaComment />
              &nbsp;
                          {boicote.comentariosCount}
                          {' '}
                          {boicote.comentariosCount > 1 ? 'comentários' : 'comentário' }
                        </span>
                      </Col>
                      <Col md={6} className="text-right">
                        {boicoteUnico
                          ? (
                            <>
                              {/* TODO - POPOVER NÃO FECHA AO CLICAR FORA DO TRIGGER */}
                              <CompartilharBtnsPopover
                                show={compartilharBtnsPopoverShow}
                                target={compartilharBtnsPopoverTarget}
                                url={window.location.href}
                              />
                              <LinkLikeSpan className="d-block d-md-inline" id="compartilhar-btn" onClick={() => setCompartilharBtnsPopoverShow(!compartilharBtnsPopoverShow)}>
                                <FaShareSquare />
                                <small> Compartilhar </small>
                              </LinkLikeSpan>
                              <LinkLikeSpan className="d-block d-md-inline" onClick={() => setModalDenunciaFormShow(true)}>
                                <FaFlag />
                                <small> Denunciar</small>
                              </LinkLikeSpan>
                            </>
                          ) : (
                            <>
                              <span className="d-block d-md-none"><br /></span>
                              <Link to={`/boicotes/${boicote.id}`}>
                                <Button className="btn-padrao" type="button" size="sm">Ver tudo</Button>
                              </Link>
                            </>
                          )}
                      </Col>

                    </Row>

                  </Col>

                </Row>

              </div>

            </Col>

          </Row>

        </Card.Body>
      </Card>
      {boicoteUnico
        && (
        <p className="text-justify text-muted px-2 mt-4">
          <small>
            Informações cadastradas sob responsabilidade dos usuários.
            O Boicote.App não se responsabiliza por qualquer tipo de
            informações cadastradas. Caso não esteja de acordo com alguma
            informação, denuncie o boicote ou comentário que a contém para que analisemos.
          </small>
        </p>
        )}
    </div>
  );
};

export default Boicote;

// Styled Components

const LinkLikeSpan = styled.span`
  cursor: pointer;
  margin-right: .5em;
  color: ${secondaryColor}!important;
  &:hover {
    color: ${primaryColor}!important;
  }
`;

const Title = styled.h4`
  color: ${primaryColor}!important;
  transition: 0.3s ease-out!important;
  &:hover {
    color: ${secondaryColor}!important;
  }
`;

const ArrowUp = styled(FaArrowUp)`
  color: ${(props) => (props.voto ? orange : grayColor)};
  cursor: pointer;
`;

const ArrowDown = styled(FaArrowDown)`
  color: ${(props) => (props.voto === 0 ? orange : grayColor)};
  cursor: pointer;
`;

const MarcaDiv = styled(Col)`
  // color: #FF6666;
  border: 2px solid #FF6666!important;
  min-height: 70px;
  // border-radius: 1.5rem;
  &::before, &::after {
    content: '';
    display: block;
    position: absolute;
    background: #fff;
  }
  &::before {
    top: -0.3em;
    bottom: -0.3em;
    left: 1em;
    right: 1em;
  }
  &::after{
    left: -0.3em;
    right: -0.3em;
    top: 1em;
    bottom: 1em;
  }
  > span {
    position: relative;
    z-index: 1;
  }
`;
