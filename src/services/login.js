import axios from 'axios'

const baseURL = '/login'

const login = async credenciais => {
    const response = await axios.post(baseURL, credenciais)
    return response.data
}

const exp = { login }

export default exp