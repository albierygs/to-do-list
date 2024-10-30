import Form from "../components/Form/Tarefa/Formulario"
import style from '../styles/adicionar.module.css'
import tasksService from '../services/tasks'
import { useNavigate } from "react-router-dom"

const AdicionarTarefa = () => {

  const navigate = useNavigate()

  const submit = async dados => {
    try {
      await tasksService.criarTarefa(dados)
      localStorage.removeItem('tasksUser')
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className={style.container}>
        <h1  className={style.titulo}>Adiconar Tarefa</h1>
        <Form onSubmit={submit}/>
      </div>
    </>
  )
}

export default AdicionarTarefa