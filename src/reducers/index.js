import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducer from './AppReducer';
import ListaContatosReducer from './ListaContatosReducer';
import ListaConversaReducer from './ListaConversaReducer'


export default combineReducers({
  AutenticacaoReducer,
  AppReducer,
  ListaContatosReducer,
  ListaConversaReducer
});