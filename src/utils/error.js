const loginCadastro = async error => {
    const name = error.response.data.error

    if (
        name === 'email inválido'
        || name === 'senha inválida'
    ) {
        return 'Email ou senha incorretos'
    } else if (name.includes('to be unique')) {
        return 'Email já cadastrado'
    } else if (name.includes('password deve ter no mínimo 6 caracteres')) {
        return 'A senha deve ter pelo menos 6 caracteres'
    }
    return null
}


const exp = { loginCadastro }

export default exp