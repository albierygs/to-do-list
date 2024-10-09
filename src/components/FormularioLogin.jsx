import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const loginUserFormSchema = z.object({
	email: z.string()
		.min(1, 'O e-mail é obrigatório')
		.email('Formato de e-mail inválido')
		.toLowerCase(),
	password: z.string()
		.min(6, 'O tamanho mínimo da senha é 6 caracteres')
})

const FormularioLogin = ({ onSubmit }) => {
	
	const { 
		register, 
		handleSubmit, 
		formState: { errors } 
	} = useForm({
		resolver: zodResolver(loginUserFormSchema)
	})
	
	const submit = async dados => {
		await onSubmit({
			email: dados.email,
			password: dados.password
		})
	}
	
	return (
		<form onSubmit={handleSubmit(submit)}>

			<label htmlFor="email">E-mail</label>
			<input 
				type="email"
				{...register('email')}
			/>
			{errors.email && <span className='avisoErro'>{errors.email.message}</span>}

			<label htmlFor="password">Senha</label>
			<input 
				type="password" 
				{...register('password')}
			/>
			{errors.password && <span className='avisoErro'>{errors.password.message}</span>}

			<button type="submit">Entrar</button>

		</form>
	)
}

export default FormularioLogin