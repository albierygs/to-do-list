import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormularioCasatro from '../components/FormularioCasatro.jsx';

const usersService = require('../services/users.js').default;
const loginService = require('../services/login.js').default;

const Cadastro = () => {

    const navigate = useNavigate()

    const [ user, setUser ] = useState({
        email: '',
        name: '',
        password: ''
    })

    const cadastrar = async event => {
        event.preventDefault()

        try {
            await usersService.criarUsuario(user)

            const logar = await loginService.login({
                email: user.email,
                password: user.password 
            })

            localStorage.setItem('toDoListToken', logar.token)
            navigate('/')
        } catch (error) {
            console.log(error.response.data.error);
        }
    }

    const mudancaCampos = ({ target }) => {
        const { name, value } = target

        setUser(dadosAnteriores => ({
            ...dadosAnteriores,
            [name]: value
        }))
    }

    
    return (
        <FormularioCasatro 
            onSubmit={cadastrar} 
            onChange={mudancaCampos} 
            valueEmail={user.email} 
            valuePassword={user.password}
            valueName={user.name}
        />
    )
}

export default Cadastro