import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FormularioLogin from "../components/FormularioLogin"
import loginCadastro from '../styles/loginCadastro.css'

const loginService = require('../services/login.js').default;


const Login = () => {

    const navigate = useNavigate()

    const [ user, setUser ] = useState({
        email: '',
        password: ''
    })

    const logar = async event => {
        event.preventDefault()

        try {
            const response = await loginService.login({
                email: user.email,
                password: user.password 
            })

            window.localStorage.setItem('toDoListToken', response.token)
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
        <div style={loginCadastro}>
            <h1>Login</h1>
            <FormularioLogin 
                onSubmit={logar} 
                onChange={mudancaCampos} 
                valueEmail={user.email} 
                valuePassword={user.password}
            />
        </div>
    )
}

export default Login