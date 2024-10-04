import { useEffect, useState } from "react"
import tasksService from '../services/tasks'

const Principal = ({ user }) => {

    const [ tarefas, setTarefas ] = useState(null)

    useEffect(() => {
        const carregarTarefasUsuario = async () => {
            const tasksStorage = localStorage.getItem('tasksUser')

            if (tasksStorage) {
                setTarefas(JSON.parse(tasksStorage))
            } else {
                const token = localStorage.getItem('toDoListToken')
                const tarefas = await tasksService.carregarTarefasUsuario(token)
                setTarefas(tarefas)
                localStorage.setItem('tasksUser', JSON.stringify(tarefas))
            }
        }
        carregarTarefasUsuario()
    }, [])

    return (
        <h1>Aplicação</h1>
    )
}

export default Principal