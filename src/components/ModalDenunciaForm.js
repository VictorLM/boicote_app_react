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
      <Modal.Header className="bg-secondary border-dark" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enviar uma denúncia
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary border-dark">
        <Form>

          <Form.Group controlId="formBasicNome">
            <Form.Control type="text" onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" />
            <SmallStyled>
              Nunca exibiremos seu e-mail sem permissão.
            </SmallStyled>
          </Form.Group>

          <Form.Group controlId="formBasicNome.ControlTextarea1">
            <Form.Label>Motivo:</Form.Label>
            <Form.Control as="textarea" onChange={(e) => setTexto(e.target.value)} rows={2} />
            <SmallStyled>
              Máximo 255 caracteres.
            </SmallStyled>
          </Form.Group>

          <div className="text-right">
            {loading
              ? <LoadingPequeno />
              : (
                <Button onClick={(e) => denunciar(e)} variant="dark" type="submit">
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
