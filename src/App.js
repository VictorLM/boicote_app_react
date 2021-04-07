import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Rotas from './components/Rotas';
import GlobalStyles from './styles/GlobalStyles';

ReactGA.initialize('G-PBHJSQFFL6');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (

    <Router>

      <GlobalStyles />
      <ToastContainer />

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
