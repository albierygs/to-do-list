import axios from 'axios'
const { urlApi } = require('../utils/config');

const login = async credenciais => {
    const response = await axios.post(`${urlApi}login`, credenciais)
    return response.data
}

const exp = { login }

export default exp