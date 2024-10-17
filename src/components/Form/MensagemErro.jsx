import style from '../../styles/loginCadastro.module.css'
import { TriangleAlert } from 'lucide-react'

const MensagemErro = ({ mensagem, tipo = 'padrao' }) => {
  return (
    <>
      {tipo === 'popup' 
        ? <div className={style.divErroPopup}>
            <span><TriangleAlert size={20} /> {mensagem}</span>
          </div>
        : <span className={style.erro}>{mensagem}</span> 
      }
    </>
  )
}

export default MensagemErro