import { useNavigate } from 'react-router-dom'
import FormularioCadastro from '../components/FormularioCadastro.jsx';
import style from '../styles/loginCadastro.module.css'

import usersService from '../services/users.js';
import loginService from '../services/login.js';


const Cadastro = () => {
	
	const navigate = useNavigate()
	
	const cadastrar = async dados => {		
		await usersService.criarUsuario(dados)
		
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
		<div className={style.form}>
			<div>
				<h1>Cadastro</h1>
				<FormularioCadastro 
					onSubmit={cadastrar} 
				/>
			</div>
		</div>
	)
}

export default Cadastro