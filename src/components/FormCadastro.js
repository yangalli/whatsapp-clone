import React from 'react';
import { Text, View, TextInput, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../actions/AutenticacaoActions';

const Estilos = {

  principal: {
    flex: 1,
    padding: 15
  },

  bg: {
    flex: 1,
    width: null
  },

  divFormCadastro: {
    flex: 4,
    justifyContent: 'center'
  },

  divBotao: {
    flex: 1
  },

  inputFormCadastro: {
    fontSize: 20,
    height: 45,
    color: '#fff'
  },

  textoErroCadastro: {
    color: 'red',
    fontSize: 18
  }

}

const background = require('../../assets/bg.png');

class FormCadastro extends React.Component {
  
  _cadastraUsuario() {

    const { nome, email, senha } = this.props;

    this.props.cadastraUsuario({ nome, email, senha });
  }

  renderBtnCadastro() {

    if (this.props.loadingCadastro) {
      return (
        <ActivityIndicator size='large' />
      )
    }

    return (
      <Button style={{ backgroundColor: 'green' }} title='Cadastrar' onPress={() => this._cadastraUsuario()} />
    )
  }
  
  render() {
    const { principal, bg, divFormCadastro, divBotao, inputFormCadastro, textoErroCadastro } = Estilos;
    return (
      <ImageBackground source={background} style={bg} >
        <View style={principal}>
          <View style={divFormCadastro}>
            <TextInput 
              value={this.props.nome} 
              onChangeText={texto => this.props.modificaNome(texto)} 
              style={inputFormCadastro} 
              placeholder='Nome' 
              placeholderTextColor='#fff' 
            />
            <TextInput 
              value={this.props.email} 
              onChangeText={texto => this.props.modificaEmail(texto)} 
              style={inputFormCadastro} 
              placeholder='E-mail' 
              placeholderTextColor='#fff'
            />
            <TextInput 
              secureTextEntry 
              value={this.props.senha} 
              onChangeText={texto => this.props.modificaSenha(texto)} 
              style={inputFormCadastro} 
              placeholder='Senha' 
              placeholderTextColor='#fff' 
            />
            <Text style={textoErroCadastro}>{this.props.erroCadastro}</Text>
          </View>

          <View style={divBotao}>
            {this.renderBtnCadastro()}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => (
  {
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroCadastro: state.AutenticacaoReducer.erroCadastro,
    loadingCadastro: state.AutenticacaoReducer.loadingCadastro
  }
)

export default connect(mapStateToProps, { modificaNome, modificaEmail, modificaSenha, cadastraUsuario})(FormCadastro);