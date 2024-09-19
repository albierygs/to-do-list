import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormularioCadastro from '../components/FormularioCadastro.jsx';
import style from '../styles/loginCadastro.module.css'

import usersService from '../services/users.js';
import loginService from '../services/login.js';
import lidarErro from'../utils/error'
import Aviso from '../components/Aviso.jsx';


const Cadastro = () => {

    const navigate = useNavigate()

    const [ aviso, setAviso ] = useState(null)
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
            <div>
                <h1>Cadastro</h1>
                <Aviso mensagem={aviso}/>
                <FormularioCadastro 
                    onSubmit={cadastrar} 
                    onChange={mudancaCampos} 
                    valueEmail={user.email} 
                    valuePassword={user.password}
                    valueName={user.name}
                />
            </div>
        </div>
    )
}

export default Cadastro