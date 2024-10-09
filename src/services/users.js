import axios from 'axios'
const { urlApi } = require('../utils/config');

const autorizacao = token => {
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}

const carregarUsuario = async token => {
  const config = autorizacao(token)
  
  const response = await axios.get(`${urlApi}users`, config)
  return response.data
}

const criarUsuario = async dados => {
  const response = await axios.post(`${urlApi}users`, dados)
  return response.data
}

const atualizarUsuario = async (novoUsuario, token, id) => {
  const config = autorizacao(token)
  
  const response = await axios.put(`${urlApi}users/${id}`, novoUsuario, config)
  return response.data
}

const excluirUsuario = async (token, id) => {
  const config = autorizacao(token)
  
  const response = await axios.delete(`${urlApi}users/${id}`, config)
  return response.data
}

const exp = { 
  carregarUsuario, 
  criarUsuario, 
  atualizarUsuario, 
  excluirUsuario 
}

export default exp