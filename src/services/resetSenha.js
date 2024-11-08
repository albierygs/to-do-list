import axios from 'axios'
const { urlApi } = require('../utils/config');


const enviarLink = async emailOrId => {
  const response = await axios.post(`${urlApi}solicitar-redefinicao-senha`, emailOrId)
  return response.data
}

const redefinir = async (newPassword, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(`${urlApi}redefinir-senha`, newPassword, config);
  return response.data
}

const exp = {
  enviarLink,
  redefinir
}

export default exp