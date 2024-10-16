import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import MensagemErro from '../MensagemErro'


const loginUserFormSchema = z.object({
	email: z.string()
		.min(1, 'O e-mail é obrigatório')
		.email('Formato de e-mail inválido')
		.toLowerCase(),
	password: z.string()
		.min(1, 'A senha é obrigatória')
		.min(6, 'O tamanho mínimo da senha é 6 caracteres')
})

const Formulario = ({ onSubmit }) => {
	
	const { 
		register, 
		handleSubmit, 
		formState: { errors } 
	} = useForm({
		resolver: zodResolver(loginUserFormSchema)
	})

	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>

			<label htmlFor="email">E-mail</label>
			<input 
				type="email"
				{...register('email')}
			/>
			{errors.email && <MensagemErro mensagem={errors.email.message} />}

			<label htmlFor="password">Senha</label>
			<input 
				type="password" 
				{...register('password')}
			/>
			{errors.password && <MensagemErro mensagem={errors.password.message} />}

			<button type="submit">Entrar</button>

		</form>
	)
}

Formulario.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default Formulario