import axios from 'axios'
const { urlApi } = require('../utils/config');


/**
 * @typedef {Object} Credentials
 * @property {string} email
 * @property {string} password
 */
/**
 * Faz a requisição para o endpoint de login da API
 * @param {Credentials} credenciais - As credenciais para realizar o login
 * @returns {{ token: string }} O token de autorização
 */
const login = async credenciais => {
  const response = await axios.post(`${urlApi}login`, credenciais)
  return response.data
}

export default login