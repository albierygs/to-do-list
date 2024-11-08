import { Link } from "react-router-dom"
import style from '../../styles/loginCadastro.module.css'

const Footer = ({ tela }) => {
  return (
    <>
      {tela === 'login'
        ? <div className={style.divFooter}>
            <p className={style.footer}>
              <Link to='/esqueci-senha'>Esqueci a senha</Link>
            </p>
            <p className={style.footer}>
              Ainda não possui conta? <Link to='/cadastro'>Cadastre-se agora.</Link>
            </p>
          </div>
        : <div className={style.divFooter}>
            <p className={style.footer}>
              Já possui conta? <Link to='/login'>Faça login.</Link>
            </p>
          </div>
      }
    </>
  )
}

export default Footer