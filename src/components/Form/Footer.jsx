import { Link } from "react-router-dom"
import style from '../../styles/loginCadastro.module.css'

const Footer = ({ tela }) => {
  return (
    <>
      {tela === 'login'
        ? <p className={style.footer}>Ainda não possui conta? <Link to='/cadastro'>Cadastre-se agora.</Link></p>
        : <p className={style.footer}>Já possui conta? <Link to='/login'>Faça login.</Link></p>
      }
    </>
  )
}

export default Footer