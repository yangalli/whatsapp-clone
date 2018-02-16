import React from 'react';
import { Text, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { contatosUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash';


class Contatos extends React.Component {
  
  componentWillMount() {
    this.props.contatosUsuarioFetch();
    // cria um array vazio, que será mandado para o dataSource
    this.criaFonteDeDados(this.props.contatos);
  }

  // é executado sempre que há alteração das propriedades -> é executado só após a renderização dos componentes 
  componentWillReceiveProps(nextProps) {
    // atualiza as propriedades de contatos
    this.criaFonteDeDados(nextProps.contatos);
  }
  
  criaFonteDeDados(contatos) {
    // é criado um datasource para verificar as mudancas dos registro -> começa vazio
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    // recebe o array vazio contatos
    this.fonteDeDados = ds.cloneWithRows(contatos);
  }


  render() {
    return(
      <ListView
        enableEmptySections
        dataSource={this.fonteDeDados}
        // recebe os dados contidos no dataSource do cloneWithRows
        renderRow={ data => (
            <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: '#CCC' }} >
              <Text style={{ fontSize: 25 }} >{data.nome}</Text>
              <Text style={{ fontSize: 18 }}>{data.email}</Text>
            </View>
          )
        }
      />
    );
  }
}

mapStateToProps = state => {

  const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
    return{ ...val, uid }
  })
  return { contatos }
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);
