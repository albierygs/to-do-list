import axios from 'axios'
const { urlApi } = require('../utils/config');


/**
 * Formata o objeto de autorização para a requisição 
 * @param {string} token - O token de autorização
 * @returns {Object}
 */
const autorizacao = token => {
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}


/**
 * Pega as informações de um usuário
 * @param {string} token - O token de autorização
 * @returns {Object}
 */
const carregarUsuario = async token => {
  const config = autorizacao(token)
  
  const response = await axios.get(`${urlApi}users`, config)
  return response.data
}


/**
 * @typedef {Object} Dados
 * @property {string} name
 * @property {string} email
 * @property {string} password
 */
/**
 * Cria um usuário
 * @param {Dados} dados - Os dados do usuário 
 * @returns {Object} 
 */
const criarUsuario = async dados => {
  const response = await axios.post(`${urlApi}users`, dados)
  return response.data
}


/**
 * Atualiza um usuário existente 
 * @param {Dados} novoUsuario - O novo usuário
 * @param {string} token - O token de autorização
 * @param {string} id - O ID do usuário
 * @returns {Object}
 */
const atualizarUsuario = async (novoUsuario, token, id) => {
  const config = autorizacao(token)
  
  const response = await axios.put(`${urlApi}users/${id}`, novoUsuario, config)
  return response.data
}


/**
 * Excluí um usuário existente
 * @param {string} token - O token de autorização
 * @param {string} id - O ID do usuário
 * @returns {number} O código HTTP da requisição
 */
const excluirUsuario = async (token, id) => {
  const config = autorizacao(token)
  
  const response = await axios.delete(`${urlApi}users/${id}`, config)
  return response.status
}

const exp = { 
  carregarUsuario, 
  criarUsuario, 
  atualizarUsuario, 
  excluirUsuario 
}

export default exp