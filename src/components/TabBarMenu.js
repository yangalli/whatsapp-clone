import React from 'react';
import { Text, View, StatusBar, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { habilitaInclusaoContato } from '../actions/AppActions';
import firebase from 'firebase';
import FormLogin from './FormLogin';

const Estilos = {
  divHeader: {
    backgroundColor: '#115E54',
    elevation: 4,
    marginBottom: 6
  },

  divTexto: {
    height: 50, 
    justifyContent: 'center'
  },

  divImagens: {
    flexDirection: 'row',
    marginRight: 20
  },

  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imagemAdicionaContato: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textoNavBar: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 20
  },

  divTabBar: {
    backgroundColor: '#115E54'
  },

  textoSair: {
    fontSize: 20,
    color: '#fff'
  },

  divSair: {
    justifyContent: 'center'
  }
}

const { containerHeader, divHeader, divTexto, textoNavBar, divTabBar, divImagens, imagemAdicionaContato, textoSair, divSair } = Estilos;

const adicionaContato = require('../../assets/adicionar-contato.png')

const TabBarMenu = props => (
  <View style={divHeader}>
    <StatusBar backgroundColor='#114D44' hidden={true} />
    
    <View style={containerHeader} >
      <View style={divTexto} >
        <Text style={textoNavBar}>WhatsApp Clone</Text>
      </View>

      <View style={divImagens} >
      
        <View style={imagemAdicionaContato} >
          <TouchableHighlight onPress={() => { Actions.AdicionarContato(); props.habilitaInclusaoContato() }} >
            <Image source={adicionaContato} />        
          </TouchableHighlight>
        </View>

        <View style={divSair} > 
          <TouchableHighlight
            onPress={ () => firebase.auth().signOut().then( () => Actions.FormLogin() )}
          >
            <Text style={textoSair}>Sair</Text>
          </TouchableHighlight>
        </View>
      
      </View>
    </View>
    
    <TabBar {...props} style={divTabBar} />
  </View>
)

export default connect(null, { habilitaInclusaoContato })(TabBarMenu)
