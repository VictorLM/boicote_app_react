import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Rotas from './components/Rotas';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (

    <Router>

      <GlobalStyles />
      <ToastContainer />

      <Container className="container-main">

        <Header />
        <hr />
        <Rotas />
        <hr />
        <Footer />

      </Container>

    </Router>

  );
}

export default App;
