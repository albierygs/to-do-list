import axios from 'axios'
const { urlApi } = require('../utils/config');

const getUsuario = async token => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const response = await axios.get(`${urlApi}user`, config)
    return response.data
}

const criarUsuario = async dados => {
    const response = await axios.post(`${urlApi}users`, dados)
    return response.data
}

const exp = { getUsuario, criarUsuario }

export default exp