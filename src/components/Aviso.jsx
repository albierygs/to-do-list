import style from '../styles/loginCadastro.module.css'

const Aviso = ({ mensagem }) => {
    if (mensagem === null) {
      return null
    }
  
    return (
      <p className={style.aviso}>
        {mensagem}
      </p>
    )
}

export default Aviso