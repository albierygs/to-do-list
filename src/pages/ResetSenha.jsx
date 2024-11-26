import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeClosed } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import MensagemErro from "../components/Form/MensagemErro"
import ModalAviso from '../components/ModalAviso';
import resetSenhaService from '../services/resetSenha';
import style from '../styles/adicionar.module.css'
import styleInput from '../styles/loginCadastro.module.css';

const schema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'A senha é obrigatória')
      .min(6, 'O tamanho mínimo é 6 caracteres'),
    confirmNewPassword: z.string()
  })
  .refine((campos) => campos.newPassword === campos.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'As senhas precisam ser iguais'
  })

const ResetSenha = () => {

  const navigate = useNavigate()
  const { token } = useParams() 
  
  const [ showPassword, setShowPassword ] = useState(false)
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)
  const [ modalAberto, setModalAberto ] = useState(false)
  const [ tipoModal, setTipoModal ] = useState('')
  
  useEffect(() => {
    document.title = 'Redefinir senha'
  }, [])

  useEffect(() => {
    try {
      jwtDecode(token)
    } catch (error) {
      navigate('/')
    }
  })

  const { 
    register, 
    handleSubmit, 
    formState : { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(schema)
  })

  const mudarVisibilidadeSenha = (type) => {
    if (type === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword)
    } else {
      setShowPassword(!showPassword)
    }
	}

  const carregarModal = () => {
    if (tipoModal === 'ok') {
      return <ModalAviso 
        titulo='Senha redefinida' 
        mensagem='A sua senha foi redefinida com sucesso! Você será redirecionado para a página de login.'
        mudarEstado={() => {
          setModalAberto(false)
          navigate('/login')
        }}
      />

    } else if (tipoModal === 'erro') {
      return <ModalAviso 
        titulo='Link inválido'
        mensagem='Esse link está expirado. Deseja receber outro link de redefinição?'
        mudarEstado={() => setModalAberto(false)}
        metodoBotaoPrincipal={() => navigate('/')}
        botaoSecundario={{
          texto: 'Enviar outro link',
          onClick: async () => {
            try {
              const decodedToken = jwtDecode(token)
              await resetSenhaService.enviarLink({ userId: decodedToken.id })
              setTipoModal('link')
            } catch (error) {
              console.log(error);
            }
          }
        }}
      />
    } else if (tipoModal === 'link') {
      return <ModalAviso 
        titulo='Link enviado'
        mensagem='Outro link de redefinição foi enviado ao seu e-mail. Verifique sua caixa de entrada.'
        mudarEstado={() => setModalAberto(false)}
      />
    }
  }

  const submit = async (data) => {
    try {
      await resetSenhaService.redefinir(data, token)
      localStorage.removeItem('toDoListToken');
      localStorage.removeItem('tasksUser');
      setTipoModal('ok')
      setModalAberto(true)
    } catch (error) {
      setTipoModal('erro')
      setModalAberto(true)
    }
  }

  return (
    <div className={style.container}>
      <h2 className={style.titulo}>Redefina a sua senha</h2>
      <div>
      <form onSubmit={handleSubmit(submit)}>

        <div className={styleInput.containerCampos}>
          <label htmlFor="newPassword">Nova senha</label>
          <div className={styleInput.containerSenha}>
            <input 
              className={styleInput.inputSenha}
              type={showPassword ? 'text' : 'password'} 
              {...register('newPassword')}
            />
            <span className={styleInput.iconeSenha} >{showPassword 
              ? <Eye  onClick={() => mudarVisibilidadeSenha('pass')}/>
              : <EyeClosed onClick={() => mudarVisibilidadeSenha('pass')}/>}
            </span>
          </div>
          <div className={styleInput.divErro}>
            {errors.newPassword && <MensagemErro mensagem={errors.newPassword.message} />}
          </div>
        </div>

        <div className={styleInput.containerCampos}>
          <label htmlFor="confirmPassword">Confirme nova senha</label>
          <div className={styleInput.containerSenha}>
            <input 
              style={{ width: '270px' }}
              className={styleInput.inputSenha}
              type={showConfirmPassword ? 'text' : 'password'} 
              {...register('confirmNewPassword')}
            />
            <span className={styleInput.iconeSenha} >{showConfirmPassword 
              ? <Eye  onClick={() => mudarVisibilidadeSenha('confirm')}/>
              : <EyeClosed onClick={() => mudarVisibilidadeSenha('confirm')}/>}
            </span>
          </div>
          <div className={styleInput.divErro}>
            {errors.confirmNewPassword && <MensagemErro mensagem={errors.confirmNewPassword.message} />}
          </div>
        </div>

        <button 
          type="submit" 
          style={{ marginTop: '0' }}
          className={style.botao} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>

      </form>
      </div>
      {modalAberto && carregarModal()}
    </div>
  )
}

export default ResetSenha