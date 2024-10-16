import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import MensagemErro from '../MensagemErro'


const registerUserFormSchema = z.object({
	name: z.string()
		.min(1, 'O nome é obrigatório')
		.transform(name => {
			return name
				.trim()
				.split(' ')
				.map(subName => {
					return subName[0]
						.toLocaleUpperCase()
						.concat(subName.substring(1))
				})
				.join(' ')
		}),
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
		resolver: zodResolver(registerUserFormSchema)
	})

	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
		
			<label htmlFor="name">Nome</label>
			<input 
				type="text"
				{...register('name')}
			/>
			{errors.name && <MensagemErro mensagem={errors.name.message} />}
			
			<label htmlFor="email">Email</label>
			<input 
				type="email"
				{...register('email')}
			/>
			{errors.email && <MensagemErro mensagem={errors.email.message} />}

			<label htmlFor="password">Senha</label>
			<input 
				type="password" 
				placeholder='No mínimo 6 caracteres'
				{...register('password')}
			/>
			{errors.password && <MensagemErro mensagem={errors.password.message} />}
			
			<button type="submit">Cadastrar</button>
		
		</form>
	)
}

Formulario.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default Formulario