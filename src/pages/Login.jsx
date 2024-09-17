import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FormularioLogin from "../components/FormularioLogin"
import style from '../styles/loginCadastro.module.css'
import Aviso from '../components/Aviso'

import loginService from'../services/login.js';
import lidarErro from'../utils/error'


const Login = () => {

    const navigate = useNavigate()

    const [ aviso, setAviso ] = useState(null)
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
            const mensagemErro = await lidarErro.loginCadastro(error)
            setAviso(mensagemErro)
            setTimeout(() => {
                setAviso(null)
            }, 5000)
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
        <div className={style.form}>
            <h1>Login</h1>
            <Aviso mensagem={aviso}/>
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