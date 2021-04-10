import React from 'react';
import {
  Modal, Form, Button,
} from 'react-bootstrap';
import styled from 'styled-components';

import LoadingPequeno from './LoadingPequeno';

// SETANDO animation={false} NO MODAL PORQUE COM ANIMAÇÃO ESTÁ LEVANTANDO UM ERRO DO REACT

function ModalDenunciaForm({
  loading, show, onHide, setNome, setEmail, setTexto, denunciar,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header className="bg-white" closeButton>
        <Modal.Title className="header" id="contained-modal-title-vcenter">
          ENVIAR UMA DENÚNCIA
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-white">
        <Form>

          <Form.Group controlId="formBasicNome">
            <Form.Control type="text" onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" />
            <SmallStyled className="text-muted">
              Seu e-mail não será exibido.
            </SmallStyled>
          </Form.Group>

          <Form.Group controlId="formBasicNome.ControlTextarea1">
            <Form.Label className="text-secondary">Motivo:</Form.Label>
            <Form.Control as="textarea" onChange={(e) => setTexto(e.target.value)} rows={2} />
            <SmallStyled className="text-muted">
              Máximo 255 caracteres.
            </SmallStyled>
          </Form.Group>

          <div className="text-right">
            {loading
              ? <LoadingPequeno />
              : (
                <Button onClick={(e) => denunciar(e)} className="btn-padrao" type="submit">
                  Enviar
                </Button>
              )}

          </div>

        </Form>

      </Modal.Body>
    </Modal>
  );
}

export default ModalDenunciaForm;

// Styled Components

const SmallStyled = styled(Form.Text)`
  color: lightgrey;
`;
