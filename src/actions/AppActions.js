import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO, 
  ADICIONA_CONTATO_SUCESSO, LISTA_CONTATO_USUARIO
 } from './types';
import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';

export const modificaAdicionaContatoEmail = texto => {
  return {
    type: MODIFICA_ADICIONA_CONTATO_EMAIL,
    payload: texto
  }
}

export const adicionaContato = email => {
  
  return dispatch => {
    let emailB64 = b64.encode(email);

    firebase.database().ref(`/contatos/${emailB64}`)
      .once('value') // o evento on e o once retornam um snapshot
      .then(snapshot => {
        if (snapshot.val()) {

          // transforma o objeto em array e pega o primeiro valor do array, que é o nome
          const dadosUsuario = _.first(_.values(snapshot.val()));

          const { currentUser } = firebase.auth();
          let emailUsuarioB64 = b64.encode(currentUser.email);

          firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .push({ email, nome: dadosUsuario.nome })
            .then(() => AdicionaContatoSucesso(dispatch))
            .catch(erro => adicionaContatoErro(erro.message, dispatch))

        } else {
          dispatch(
            { 
              type: ADICIONA_CONTATO_ERRO, 
              payload: 'O E-mail informado não corresponde a um usuário válido!' 
            }
          )
        }
      })
  }
}

const adicionaContatoErro = (erro, dispatch) => {
  dispatch(
    {
      type: ADICIONA_CONTATO_ERRO,
      payload: erro
    }
  )
}

const AdicionaContatoSucesso = dispatch => (
  dispatch(
    {
      type: ADICIONA_CONTATO_SUCESSO,
      payload: true
    }
  )
)

export const habilitaInclusaoContato = () => (
  {
    type: ADICIONA_CONTATO_SUCESSO,
    payload: false
  }
)

export const contatosUsuarioFetch = () => {
  
  const { currentUser } = firebase.auth();

  return(dispatch) => {
    let emailUsuarioB64 = b64.encode(currentUser.email);

    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
      .on('value', snapshot => {
        dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
      })

  }
}