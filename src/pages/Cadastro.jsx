import { useNavigate } from 'react-router-dom'
import Form from '../components/Form/Cadastro/Formulario.jsx';
import style from '../styles/loginCadastro.module.css'

import usersService from '../services/users.js';
import loginService from '../services/login.js';
import { useState } from 'react';
import Title from '../components/Form/Title.jsx';
import MensagemErro from '../components/Form/MensagemErro.jsx';
import Footer from '../components/Form/Footer.jsx';


const Cadastro = () => {
	
	const navigate = useNavigate()
	
	const [ emailError, setEmailError ] = useState(null)


	/**
	 * @typedef {Object} Dados
	 * @property {string} name - O nome do usuário
	 * @property {string} email - O email do usuário
	 * @property {string} password - A senha do usuário
	 */
	/**
	 * Envia os dados para serem registrados no banco de dados
	 * @param {Dados} dados - Os dados inseridos no formulário
	 * @returns {void}
	 */
	const cadastrar = async dados => {		
		try {
			await usersService.criarUsuario(dados)
			setEmailError(null)
		} catch ({ response }) {
			if (response.data.error.includes('to be unique')) {
				setEmailError('E-mail já cadastrado')
				setTimeout(() => {
					setEmailError(null)
				}, 5000)
			}
		}
		
		try {
			const response = await loginService({
				email: dados.email,
				password: dados.password 
			})
			
			localStorage.setItem('toDoListToken', response.token)
			navigate('/')
		} catch (error) {
			console.log(error);
		}
	}
	
	
	return (
		<main className={style.form}>
			<div>
				{emailError && <MensagemErro mensagem={emailError} />}
				<Title texto='Cadastro' />
				<Form onSubmit={cadastrar} />
				<Footer tela='cadastro'/>
			</div>
		</main>
	)
}

export default Cadastro