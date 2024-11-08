import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import MensagemErro from '../components/Form/MensagemErro';
import resetSenhaService from '../services/resetSenha';
import { useState } from "react";
import ModalAviso from "../components/ModalAviso";


const schema = z.object({
  email: z.string()
    .min(1, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
})


const EsqueciSenha = () => {

  const [ modalAberto, setModalAberto ] = useState(false)
  const [ tituloModal, setTituloModal ] = useState('')
  const [ mensagemModal, setMensagemModal ] = useState('')

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } ,
    getValues
  } = useForm({
    resolver: zodResolver(schema)
  })

  const submit = async (data) => {
    try {
      await resetSenhaService.enviarLink(data)
      setMensagemModal(`O link de redefinição foi enviado para ${getValues('email')}. Verifique a sua caixa de e-mail.`)
      setTituloModal('Link Enviado')
      setModalAberto(true)
    } catch (error) {
      setMensagemModal(`O e-mail ${getValues('email')} não está cadastrado.`)
      setTituloModal('Aviso')
      setModalAberto(true)
    }
  }

  return (
    <div>
      <h2>Redefinir senha</h2>
      <p>Informe o endereço de e-mail da sua conta para que seja enviado um link para redefinição de senha.</p>
      <form onSubmit={handleSubmit(submit)}>
        <input 
          autoFocus
          type="email" 
          {...register('email')} 
          placeholder="usuario@example.com"
        />
        {errors.email && <MensagemErro mensagem={errors.email.message} />}
        <button type="submit">
          {isSubmitting ? 'Enviando...' : 'Enviar link'}
        </button>
      </form>
      {modalAberto && 
        <ModalAviso 
          mensagem={mensagemModal} 
          titulo={tituloModal}
          mudarEstado={() => setModalAberto(false)} 
        />
      }
    </div>
  )
}

export default EsqueciSenha