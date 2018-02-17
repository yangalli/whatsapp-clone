import React from 'react';
import { Text, View, TextInput, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import { modificaMensagem, enviarMensagem } from '../actions/AppActions';

const iconeEnviarMensagem = require('../../assets/enviar_mensagem.png');

class Conversa extends React.Component{
  
  _enviarMensagem() {
    const { mensagem, contatoNome, contatoEmail } = this.props;

    this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
  }
  
  render() {
    return(
      <View style={{ flex: 1, backgroundColor: '#eee4dc' }}  >
        
        <View style={{ flex: 1, paddingBottom: 20 }} >

        </View>

        <View style={{ flexDirection: 'row', height: 60 }}>
          <TextInput
            value={this.props.mensagem}
            onChangeText={texto => this.props.modificaMensagem(texto) }
            style={{ flex: 4, backgroundColor: 'white', fontSize: 18 }}
          />
          <TouchableHighlight
            onPress={this._enviarMensagem.bind(this) } 
            underlayColor='white' 
          >
            <Image source={iconeEnviarMensagem} />
          </TouchableHighlight>

        </View>

      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    mensagem: state.AppReducer.mensagem
  }
)

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem })(Conversa);

