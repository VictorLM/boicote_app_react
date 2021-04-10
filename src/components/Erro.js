import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Card } from 'react-bootstrap';

const Erro = ({ mensagem }) => (
  <Card className="p-4 my-5 border-0 shadow">
    <Card.Body className="mt-2 pb-0">
      <h1 className="text-center header">ERRO</h1>
      <h1 className="text-center display-1">
        <FaExclamationCircle className="text-danger" />
      </h1>
      <h4 className="text-center text-primary mt-4 mb-5">
        { mensagem }
      </h4>
    </Card.Body>
  </Card>
);

export default Erro;
