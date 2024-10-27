import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import MensagemErro from '../MensagemErro'
import { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import style from '../../../styles/loginCadastro.module.css'


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

	const [ showPassword, setShowPassword ] = useState(false)
	
	const { 
		register, 
		handleSubmit, 
		formState: { errors, isSubmitting } 
	} = useForm({
		resolver: zodResolver(loginUserFormSchema),
		mode: 'all'
	})


	const mudarVisibilidadeSenha = () => {
		setShowPassword(!showPassword)
	}

	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>

			<div className={style.containerCampos}>
				<label htmlFor="email">E-mail</label>
				<input 
					autoFocus
					className={style.input}
					type="email"
					{...register('email')}
				/>
				<div className={style.divErro}>
					{errors.email && <MensagemErro mensagem={errors.email.message} />}
				</div>
			</div>

			<div className={style.containerCampos}>
				<label htmlFor="password">Senha</label>
				<div className={style.containerSenha}>
					<input 
						className={style.inputSenha}
						type={showPassword ? 'text' : 'password'} 
						{...register('password')}
					/>
					<span className={style.iconeSenha} >{showPassword 
						? <Eye  onClick={mudarVisibilidadeSenha}/>
						: <EyeClosed onClick={mudarVisibilidadeSenha}/>}
					</span>
				</div>
				<div className={style.divErro}>
					{errors.password && <MensagemErro mensagem={errors.password.message} />}
				</div>
			</div>

			<button type="submit" className={style.button} disabled={isSubmitting}>
				{isSubmitting ? 'Aguarde...' : 'Entrar'}
			</button>

		</form>
	)
}

Formulario.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default Formulario