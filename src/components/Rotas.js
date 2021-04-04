import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Boicotes from '../pages/Boicotes';
import Boicote from '../pages/Boicote';
import ConfirmarBoicote from '../pages/ConfirmarBoicote';
import Sobre from '../pages/Sobre';

const Rotas = () => (
  <Switch>
    <Route path="/sobre">
      <Sobre />
    </Route>
    <Route path="/boicotes/confirmar/:boicoteId/:token">
      <ConfirmarBoicote />
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
);

export default Rotas;
