import style from '../../styles/loginCadastro.module.css'

const Title = ({ texto }) => {
  return (
    <h1 className={style.title}>{texto}</h1>
  )
} 

export default Title