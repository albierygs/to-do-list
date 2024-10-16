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
 * Pega todas as tarefas de um usuário
 * @param {string} token - O token de autorização
 * @returns {Object} As tarefas
 */
const carregarTarefasUsuario = async token => {
  const config = autorizacao(token)
  
  const response = await axios.get(`${urlApi}tasks`, config)
  return response.data
}


/**
 * @typedef {Object} Tarefa
 * @property {string} name
 * @property {Date} date
 * @property {string} description
 * @property {boolean} done
 * @property {boolean} important
 */
/**
 * Salva a tarefa
 * @param {Tarefa} tarefa - Os dados da tarefa a ser criada
 * @param {string} token - O token de autorização
 * @returns {Object} A tarefa salva
 */
const criarTarefa = async (tarefa, token) => {
  const config = autorizacao(token)
  
  const response = await axios.post(`${urlApi}tasks`, tarefa, config)
  return response.data
}


/**
 * @typedef {Object} Tarefa
 * @property {string} name
 * @property {Date} date
 * @property {string} description
 * @property {boolean} done
 * @property {boolean} important
 */
/**
 * Atualiza uma tarefa existente
 * @param {Tarefa} novaTarefa - A nova tarefa
 * @param {string} token - O token de autorização
 * @param {string} id - O ID da tarefa que será atualizada
 * @returns {Object}
 */
const atualizarTarefa = async (novaTarefa, token, id) => {
  const config = autorizacao(token)
  
  const response = await axios.put(`${urlApi}tasks/${id}`, novaTarefa, config)
  return response.data
}


/**
 * Excluí uma tarefa existente 
 * @param {string} token - O token de autorização
 * @param {string} id - O ID da tarefa que será excluída
 * @returns {number} O código HTTP da requisição
 */
const excluirTarefa = async (token, id) => {
  const config = autorizacao(token)
  
  const response = await axios.delete(`${urlApi}tasks/${id}`, config)
  return response.status
}


const exp = {
  carregarTarefasUsuario,
  criarTarefa,
  atualizarTarefa,
  excluirTarefa
}

export default exp