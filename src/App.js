// import React, { useEffect, useState } from 'react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { CookiesProvider, useCookies } from 'react-cookie';
import { Container } from 'react-bootstrap';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Rotas from './components/Rotas';
import GlobalStyles from './styles/GlobalStyles';
// import axios from './config/axios';

function App() {
  /* const [visitanteId, setVisitanteId] = useCookies(['visitanteId']);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('/visitantes/novo-visitante');
        setVisitanteId('visitanteId', response.data);
      } catch (error) {
        setIsError(error);
      }
    }
    // eslint-disable-next-line
    console.log(isError); // TODO
    if (Object.keys(visitanteId).length === 0) {
      getData();
    }
  }, [visitanteId]);
  */
  return (

    <Router>

      <GlobalStyles />

      <Container className="container-main">

        <Header />

        <Rotas />

        <hr />

        <Footer />

      </Container>

    </Router>

  );
}

export default App;
