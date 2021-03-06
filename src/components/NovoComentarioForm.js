import React from 'react';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import styled from 'styled-components';

import LoadingPequeno from './LoadingPequeno';

function NovoComentarioForm({
  loading, setNome, setEmail, setComentario, nome, email, comentario, comentar,
}) {
  return (
    <Card className="p-2 border-0 shadow">
      <Card.Body className="mt-2 pb-0 px-4">
        <Form>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicNome">
                <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-0" controlId="formBasicEmail">
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" />
                <SmallStyled className="text-muted">
                  Seu e-mail não será exibido.
                </SmallStyled>
              </Form.Group>
            </Col>
          </Row>
          <span className="d-block d-md-none"><br /></span>
          <Row>
            <Col>
              <Form.Group controlId="formBasicNome.ControlTextarea1">
                <Form.Label className="text-secondary">Comentário:</Form.Label>
                <Form.Control as="textarea" value={comentario} onChange={(e) => setComentario(e.target.value)} rows={2} />
                <SmallStyled className="text-muted">
                  Máximo 255 caracteres.
                </SmallStyled>
              </Form.Group>
            </Col>
          </Row>

        </Form>

      </Card.Body>
      <Card.Footer className="text-right bg-white">
        {loading
          ? <LoadingPequeno />
          : (
            <Button onClick={(e) => comentar(e)} className="btn-padrao" type="submit">
              Enviar
            </Button>
          )}
      </Card.Footer>
    </Card>
  );
}

export default NovoComentarioForm;

// Styled Components

const SmallStyled = styled(Form.Text)`
  color: lightgrey;
`;
