import style from '../styles/carregando.module.css'

const Carregando = () => {
  return (
    <div className={style.container}>
      <div className={style.loader}></div>
      <p>Carregando</p>
    </div>
  )
}

export default Carregando