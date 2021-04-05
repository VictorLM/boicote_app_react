import React from 'react';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';

import LoadingGrande from './LoadingGrande';

function NovoBoicoteForm({
  nome, email, marca, titulo, texto, tags, links,
  setNome, setEmail, setMarca, setTitulo, setTexto, setTags, setLinks,
  loading, cadastrarNovoBoicote, boicoteCadastradoComSucesso,
}) {
  if (boicoteCadastradoComSucesso) {
    return (
      <Card className="m-4 px-4" bg="secondary" border="dark">
        <Card.Body className="mt-2 pb-0">
          <h3 className="text-center">
            Boicote cadastrado com sucesso!
          </h3>
          <h1 className="text-center display-1">
            <FaCheckCircle className="text-success" />
          </h1>
          <h5 className="text-justify mt-4 mb-5">
            Para finalizar o cadastro ainda é necessário confirmar a
            mensagem que enviamos ao e-mail informado no cadastro.
          </h5>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="m-4" bg="secondary" border="dark">
      <Card.Body className="mt-2 px-4">

        {loading
          ? <LoadingGrande />
          : (
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
                    <SmallStyled>
                      Seu e-mail não será exibido.
                    </SmallStyled>
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formBasicNome">
                    <Form.Control type="text" value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Empresa/Marca" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-0" controlId="formBasicEmail">
                    <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
                  </Form.Group>
                </Col>
              </Row>
              <span className="d-block d-md-none"><br /></span>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicNome.ControlTextarea1">
                    <Form.Label>Texto:</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={texto}
                      rows={5}
                      onChange={(e) => setTexto(e.target.value)}
                    />
                    <SmallStyled>
                      Máximo 2000 caracteres.
                    </SmallStyled>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicNome">
                    <Form.Label>Tags:</Form.Label>
                    <Form.Control
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Separe as tags com uma vírgula: Racismo, Desigualdade, etc"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicNome.ControlTextarea2">
                    <Form.Label>Links:</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={links}
                      onChange={(e) => setLinks(e.target.value)}
                      placeholder="Separe on Links com uma vírgula: https://site.com/noticia-um, https://site.com/noticia-dois"
                    />
                    <SmallStyled>
                      Máximo três links.
                    </SmallStyled>
                  </Form.Group>
                </Col>
              </Row>

            </Form>
          )}

      </Card.Body>

      {!loading
        && (
        <Card.Footer className="text-right">
          <Button onClick={(e) => cadastrarNovoBoicote(e)} size="lg" variant="dark" type="submit">
            Enviar
          </Button>
        </Card.Footer>
        )}

    </Card>
  );
}

export default NovoBoicoteForm;

// Styled Components

const SmallStyled = styled(Form.Text)`
  color: lightgrey;
`;
