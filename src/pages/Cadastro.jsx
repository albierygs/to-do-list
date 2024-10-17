import { useNavigate } from 'react-router-dom'
import Form from '../components/Form/Cadastro/Formulario.jsx';
import style from '../styles/loginCadastro.module.css'

import usersService from '../services/users.js';
import loginService from '../services/login.js';
import { useEffect, useState } from 'react';
import Title from '../components/Form/Title.jsx';
import MensagemErro from '../components/Form/MensagemErro.jsx';
import Footer from '../components/Form/Footer.jsx';


const Cadastro = () => {
	
	const navigate = useNavigate()
	
	const [ emailError, setEmailError ] = useState(null)


	useEffect(() => {
		document.title = 'Cadastro'
	}, [])


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
				}, 10000)
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
		<main>
			{emailError && <MensagemErro mensagem={emailError} tipo='popup' />}
			<div className={style.cadastroBox}>
				<Title texto='Cadastro' />
				<Form onSubmit={cadastrar} />
				<Footer tela='cadastro'/>
			</div>
		</main>
	)
}

export default Cadastro