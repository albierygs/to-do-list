import axios from 'axios'
const { urlApi } = require('../utils/config');


const autorizacao = token => {
    return {
        headers: { Authorization: `Bearer ${token}` }
    }
}

const carregarTarefasUsuario = async token => {
    const config = autorizacao(token)

    const response = await axios.get(`${urlApi}task`, config)
    return response.data
}

const criarTarefa = async (tarefa, token) => {
    const config = autorizacao(token)

    const response = await axios.post(`${urlApi}task`, tarefa, config)
    return response.data
}

const atualizarTarefa = async (novaTarefa, token, id) => {
    const config = autorizacao(token)

    const response = await axios.put(`${urlApi}task/${id}`, novaTarefa, config)
    return response.data
}

const excluirTarefa = async (token, id) => {
    const config = autorizacao(token)

    const response = await axios.delete(`${urlApi}task/${id}`, config)
    return response.data
}


const exp = {
    carregarTarefasUsuario,
    criarTarefa,
    atualizarTarefa,
    excluirTarefa
}

export default exp