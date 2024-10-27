import style from '../../styles/loginCadastro.module.css'
import { TriangleAlert, CircleAlert } from 'lucide-react'

const MensagemErro = ({ mensagem, tipo = 'padrao' }) => {
  return (
    <>
      {tipo === 'popup' 
        ? <div className={style.divErroPopup}>
            <span><TriangleAlert size={20} /> {mensagem}</span>
          </div>
        : <span className={style.erro}><CircleAlert size={14} /> {mensagem}</span> 
      }
    </>
  )
}

export default MensagemErro