import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Card } from 'react-bootstrap';

function Pagina404() {
  return (

    <Card className="m-4 px-4" bg="secondary" border="dark">
      <Card.Body className="mt-2 pb-0">

        <h3 className="text-center">
          Página não encontrada.
        </h3>
        <h1 className="text-center display-1 text-danger">
          <FaExclamationCircle />
          {' '}
          404
        </h1>
        <h5 className="text-center mt-4 mb-5">
          Verifique o endereço acessado.
        </h5>

      </Card.Body>
    </Card>
  );
}

export default Pagina404;
