import { useNavigate } from 'react-router-dom'

import Form from "../components/Form/Login/Formulario.jsx"
import Title from '../components/Form/Title.jsx';
import style from '../styles/loginCadastro.module.css'

import loginService from'../services/login.js';
import { useState } from 'react';
import MensagemErro from '../components/Form/MensagemErro.jsx';
import Footer from '../components/Form/Footer.jsx';


const Login = () => {
  		
	const navigate = useNavigate()

	const [ credenciaisError, setCredenciaisError ] = useState(null)
	

	/**
	 * @typedef {Object} Dados
	 * @property {string} email - O email do usuário
	 * @property {string} password - A senha do usuário
	 */
	/**
	 * Envia os dados para realizar o login
	 * @param {Dados} dados - Os dados inseridos no formulário
	 * @returns {void}
	 */
	const logar = async dados => {
		try {
			const response = await loginService(dados)					
			setCredenciaisError(null)
			window.localStorage.setItem('toDoListToken', response.token)
			navigate('/')
		} catch ({ response }) {
			if (response.status === 401) {
				setCredenciaisError('E-mail ou senha incorretos')
				setTimeout(() => {
					setCredenciaisError(null)
				}, 5000)
			}
		}
	}
	
	
	return (
		<main className={style.form}>
			<div>
				{credenciaisError && <MensagemErro mensagem={credenciaisError} />}
				<Title texto='Login' />
				<Form 
					onSubmit={logar} 
					setCredenciaisError={setCredenciaisError} 
				/>
				<Footer tela='login'/>
			</div>
		</main>
	)
}

export default Login