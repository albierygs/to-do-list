import style from '../../styles/loginCadastro.module.css'

const MensagemErro = ({ mensagem }) => {
  return (
    <span className={style.erro}>{mensagem}</span>
  )
}

export default MensagemErro