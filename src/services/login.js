import axios from 'axios'
const { urlApi } = require('../../config');

const login = async credenciais => {
    const response = await axios.post(urlApi, credenciais)
    return response.data
}

const exp = { login }

export default exp