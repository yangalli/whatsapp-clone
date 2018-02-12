import React from 'react';
import { Text, View, TextInput, Button, ImageBackground, Image } from 'react-native';
import FormLogin from './FormLogin';
import { Actions } from 'react-native-router-flux'

const Estilos = {

  principal: {
    flex: 1,
    padding: 15
  },

  bg: {
    flex: 1,
    width: null
  },

  divImagem: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  divLogin: {
    flex: 1
  },

  textoBemVindo: {
    fontSize: 20,
    color: '#fff'
  }

}

const { principal, bg, divImagem, divLogin, textoBemVindo } = Estilos;

const logo = require('../../assets/logo.png');

const background = require('../../assets/bg.png');

export default props => (
  <ImageBackground source={background} style={bg} >
    <View style={principal} >
      <View style={divImagem} >
        <Text style={textoBemVindo}>Seja Bem Vindo!</Text>
        <Image source={logo} />
      </View>

      <View style={divLogin} >
        <Button 
          title='Fazer Login'
          onPress={ () => Actions.FormLogin() }
        />
      </View>
    </View>
  </ImageBackground>
);
