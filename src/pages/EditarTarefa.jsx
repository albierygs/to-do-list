import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ObjectId } from 'bson'

const EditarTarefa = () => {
  
  const navigate = useNavigate()
  const { id } = useParams()
  const tarefas = localStorage.getItem('tasksUser')
  const tarefa = tarefas
    ? JSON
      .parse(tarefas)
      .find((tarefa) => tarefa.id === id)
    : null

  useEffect(() => {
    if (!(localStorage.getItem('toDoListToken') && ObjectId.isValid(id))) {
      navigate('/')
    }
  })

  return (
    <p>{JSON.stringify(tarefa, null ,2)}</p>
  )
}

export default EditarTarefa