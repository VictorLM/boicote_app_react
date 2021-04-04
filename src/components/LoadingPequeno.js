import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingPequeno = () => (

  <Spinner animation="border" role="status">
    <span className="sr-only">Carregando...</span>
  </Spinner>
);

export default LoadingPequeno;
