import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato'

const Rotas = () => (
  <Router navigationBarStyle={{ backgroundColor: '#115E54' }} >
    <Scene>
      <Scene key='BoasVindas' component={BoasVindas} title='Bem-Vindo' hideNavBar={true} />      
      <Scene key='FormLogin' component={FormLogin} title='Login' hideNavBar={true} initial />
      <Scene key='FormCadastro' component={FormCadastro} title='Cadastro' titleStyle={{ color: '#fff', paddingLeft: 70 }} />
      <Scene key='Principal' component={Principal} title='Principal' hideNavBar={true} />
      <Scene key='AdicionarContato' component={AdicionarContato} title='Adicionar Contatos' titleStyle={{ color: '#fff'}} hideNavBar={false} />
    </Scene>
  </Router>
);

export default Rotas;
