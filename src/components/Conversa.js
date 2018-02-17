import React from 'react';
import { Text, View, TextInput, TouchableHighlight, Image, ListView } from 'react-native';
import { connect } from 'react-redux';
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash';

const iconeEnviarMensagem = require('../../assets/enviar_mensagem.png');

class Conversa extends React.Component{
  
  componentWillMount() {
    this.props.conversaUsuarioFetch(this.props.contatoEmail);
    // criacao do dataSource para que o List view saiba no que se basear para listar os dados
    // esse array é inicializado vazio, mas vai sendo atualizado pela função ComponentWillReceiveProps
    this.criaFonteDeDados( this.props.conversa );
  }

  componentWillReceiveProps(nextProps) {
    // corrigi o caso de navegar rapidamente por conversas com contatos diferentes
    // analisa se o email antes e depois do ComponentWillReceiveProps é diferente -> se for, a
    // caixa de mensagens deve ser alterada para a correta
    if(this.props.contatoEmail != nextProps.contatoEmail)
      this.props.conversaUsuarioFetch(nextProps.contatoEmail);

    // atualiza as propriedades das conversas
    this.criaFonteDeDados( nextProps.conversa );
    
  }
  
  renderRow(texto) {
    if(texto.tipo === 'e'){
      return(
        <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginRight: 20, marginLeft: 40  }} >
          <Text style={{ fontSize: 18, color: 'black', padding: 10, backgroundColor: '#dbf5b4', elevation: 1 }} >
            {texto.mensagem}
          </Text>
        </View>
      )
    } 
    if(texto.tipo === 'r') {
      return (
        <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40, marginLeft: 20 }} >
          <Text style={{ fontSize: 18, color: 'black', padding: 10, backgroundColor: '#f7f7f7', elevation: 1 }} >
            {texto.mensagem}
          </Text>
        </View>
      )
    }
    
  }

  criaFonteDeDados(conversa) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.dataSource = ds.cloneWithRows(conversa);
  }

  _enviarMensagem() {
    const { mensagem, contatoNome, contatoEmail } = this.props;

    this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
  }
  
  render() {
    return(
      <View style={{ flex: 1, backgroundColor: '#eee4dc' }}  >
        
        <View style={{ flex: 1, paddingBottom: 20 }} >
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
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

const mapStateToProps = state => {
  
  // conversao do objeto para um array
  const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
    return { ...val, uid }
  });
  
  return(
    {
      conversa,
      mensagem: state.AppReducer.mensagem
    }
  )
}

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaUsuarioFetch })(Conversa);

