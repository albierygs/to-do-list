import { useEffect, useState } from "react"
import tasksService from '../services/tasks'

const Principal = ({ user, token }) => {

    const [ tarefas, setTarefas ] = useState(null)

    useEffect(() => {
        const carregarTarefasUsuario = async () => {
            const tarefas = await tasksService.carregarTarefasUsuario(token)
            setTarefas(tarefas)
            console.log(tarefas);
        }
        carregarTarefasUsuario()
    }, [])

    return (
        <h1>Aplicação</h1>
    )
}

export default Principal