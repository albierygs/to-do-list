import { useNavigate } from 'react-router-dom'

import FormularioLogin from "../components/FormularioLogin"
import style from '../styles/loginCadastro.module.css'

import loginService from'../services/login.js';


const Login = () => {
  		
	const navigate = useNavigate()
	
	const logar = async dados => {
		const response = await loginService(dados)					
		window.localStorage.setItem('toDoListToken', response.token)
		navigate('/')
	}
	
	
	return (
		<main className={style.form}>
			<div>
				<h1>Login</h1>
				<FormularioLogin onSubmit={logar} />
			</div>
		</main>
	)
}

export default Login