import React from 'react';
import { Text, View, TextInput, Button, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

const Estilos = {
  
  principal: {
    flex: 1,
    padding: 15
  },

  bg: {
    flex: 1,
    width: null
  },

  divHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  divFormLogin: {
    flex: 2
  },

  divAcesso: {
    flex: 2
  },

  tituloHeader: {
    fontSize: 25,
    color: '#fff'
  },

  inputFormLogin: {
    fontSize: 20,
    height: 45
  },

  textoFormLogin: {
    fontSize: 17,
    color: 'gray'
  },

  btnDivAcesso: {
    color: 'green'
  }

}

const background = require('../../assets/bg.png');

class FormLogin extends React.Component {
  
  _autenticarUsuario() {
    
    const { email, senha } = this.props;
    this.props.autenticarUsuario({ email, senha });
  }
  
  render() {
    const { principal, bg, divHeader, divFormLogin, divAcesso, tituloHeader, inputFormLogin, textoFormLogin, btnDivAcesso } = Estilos;    
    return (
      <ImageBackground source={background} style={bg}>
        <View style={principal}>
          <View style={divHeader}>
            <Text style={tituloHeader}>WhatsApp Clone</Text>
          </View>
  
          <View style={divFormLogin}>
            <TextInput value={this.props.email} onChangeText={texto => this.props.modificaEmail(texto)} style={inputFormLogin} placeholder='E-mail' placeholderTextColor='#fff' />
            <TextInput secureTextEntry value={this.props.senha} onChangeText={texto => this.props.modificaSenha(texto)} style={inputFormLogin} placeholder='Password' placeholderTextColor='#fff' />
            <Text 
              style={textoFormLogin}
              onPress={() => Actions.FormCadastro()}>
              Ainda não possui cadastro? Cadastre-se
            </Text>
            {/* <TouchableHighlight onPress={() => Actions.FormCadastro()}>
              <Text style={textoFormLogin}>Ainda não possui cadastro? Cadastre-se</Text>
            </TouchableHighlight> */}
          </View>
          
          <View style={divAcesso}>
            <Button 
              style={btnDivAcesso} 
              title='Acessar'
              onPress={() => this._autenticarUsuario()} 
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => (
  {
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha
  }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(FormLogin); 
