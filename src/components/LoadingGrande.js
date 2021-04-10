import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingGrande = () => (
  <div className="text-center text-primary mt-4">
    <Spinner style={{ width: '5rem', height: '5rem' }} animation="border" role="status">
      <span className="sr-only">Carregando...</span>
    </Spinner>
  </div>
);

export default LoadingGrande;
