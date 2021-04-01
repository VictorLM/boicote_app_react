import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Home from './pages/Home';
import Boicotes from './pages/Boicotes';
import Boicote from './pages/Boicote';
import Sobre from './pages/Sobre';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <Router>

      <GlobalStyles />

      <Container className="container-main">

        <Header />

        <Switch>
          <Route path="/sobre">
            <Sobre />
          </Route>
          <Route path="/boicotes/:boicoteId">
            <Boicote />
          </Route>
          <Route path="/boicotes">
            <Boicotes />
          </Route>
          <Route path="/novo-boicote">
            <h1>Novo Boicote Form - INFORMAR DADOS QUE SERÃO EXPOSTOS</h1>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <hr />

        <Footer />

      </Container>

    </Router>
  );
}

export default App;
