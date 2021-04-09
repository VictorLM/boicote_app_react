import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Card } from 'react-bootstrap';

const Erro = ({ mensagem }) => (
  <Card className="px-4" bg="secondary" border="dark">
    <Card.Body className="mt-2 pb-0">
      <h1 className="text-center">Erro</h1>
      <h1 className="text-center display-1">
        <FaExclamationCircle className="text-danger" />
      </h1>
      <h4 className="text-center mt-4 mb-5">
        <b>{ mensagem }</b>
      </h4>
    </Card.Body>
  </Card>
);

export default Erro;
