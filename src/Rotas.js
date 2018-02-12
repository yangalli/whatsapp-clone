import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';

const Rotas = () => (
  <Router>
    <Scene>
      <Scene key='FormLogin' component={FormLogin} title='Login' />
      <Scene key='FormCadastro' component={FormCadastro} title='Cadastro' />
      <Scene key='BoasVindas' component={BoasVindas} title='Bem-Vindo' initial />
    </Scene>
  </Router>
);

export default Rotas;
