import axios from 'axios'
const { urlApi } = require('../utils/config');


/**
 * Formata o objeto de autorização para a requisição 
 * @returns {Object}
 */
const autorizacao = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem('toDoListToken')}` }
  }
}


/**
 * Pega todas as tarefas de um usuário
 * @returns {Object} As tarefas
 */
const carregarTarefasUsuario = async () => {
  const config = autorizacao()
  
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
 * @returns {Object} A tarefa salva
 */
const criarTarefa = async (tarefa) => {
  const config = autorizacao()
  
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
 * @param {string} id - O ID da tarefa que será atualizada
 * @returns {Object}
 */
const atualizarTarefa = async (novaTarefa, id) => {
  const config = autorizacao()
  
  const response = await axios.put(`${urlApi}tasks/${id}`, novaTarefa, config)
  return response.data
}


/**
 * Excluí uma tarefa existente 
 * @param {string} id - O ID da tarefa que será excluída
 * @returns {number} O código HTTP da requisição
 */
const excluirTarefa = async (id) => {
  const config = autorizacao()
  
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