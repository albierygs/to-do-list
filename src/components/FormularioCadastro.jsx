import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const registerUserFormSchema = z.object({
	name: z.string()
		.min(1, 'O nome é obrigatório')
		.transform(name => {
			return name.trim().split(' ').map(subName => {
				return subName[0].toLocaleUpperCase().concat(subName.substring(1))
			}).join(' ')
		}),
	email: z.string()
		.min(1, 'O e-mail é obrigatório')
		.email('Formato de e-mail inválido')
		.toLowerCase(),
	password: z.string()
		.min(6, 'O tamanho mínimo da senha é 6 caracteres')
})


const FormularioCadastro = ({ onSubmit }) => {
	
	const { 
		register, 
		handleSubmit, 
		formState: { errors } 
	} = useForm({
		resolver: zodResolver(registerUserFormSchema)
	})
	
	const submit = async dados => {
		await onSubmit({
			name: dados.name,
			email: dados.email,
			password: dados.password
		})
	}
	
	
	return (
		<form onSubmit={handleSubmit(submit)}>
		
			<label htmlFor="name">Nome</label>
			<input 
				type="text"
				{...register('name')}
			/>
			{errors.name && <span className='avisoErro'>{errors.name.message}</span>}
			
			<label htmlFor="email">Email</label>
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
			
			<button type="submit">Cadastrar</button>
		
		</form>
	)
}

export default FormularioCadastro