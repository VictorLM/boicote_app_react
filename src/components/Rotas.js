import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import Home from '../pages/Home';
import Boicotes from '../pages/Boicotes';
import Boicote from '../pages/Boicote';
import ConfirmarBoicote from '../pages/ConfirmarBoicote';
import NovoBoicote from '../pages/NovoBoicote';
import Sobre from '../pages/Sobre';
import Pagina404 from '../pages/Pagina404';

function Rotas() {
  //
  ReactGA.initialize(process.env.REACT_APP_GA4_UNIVERSAL_ID);

  function googleAnalytics() {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  return (
    <Switch>

      <Route
        path="/sobre"
        render={() => {
          googleAnalytics();
          return <Sobre />;
        }}
      />
      <Route
        path="/boicotes/confirmar/:boicoteId/:token"
        render={() => {
          googleAnalytics();
          return <ConfirmarBoicote />;
        }}
      />
      <Route
        path="/boicotes/:boicoteId"
        render={() => {
          googleAnalytics();
          return <Boicote />;
        }}
      />
      <Route
        path="/boicotes"
        render={() => {
          googleAnalytics();
          return <Boicotes />;
        }}
      />
      <Route
        path="/novo-boicote"
        render={() => {
          googleAnalytics();
          return <NovoBoicote />;
        }}
      />
      <Route
        exact
        path="/"
        render={() => {
          googleAnalytics();
          return <Home />;
        }}
      />
      <Route component={Pagina404} />

    </Switch>
  );
}

export default Rotas;
