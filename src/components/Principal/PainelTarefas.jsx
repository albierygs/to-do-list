import { Plus } from "lucide-react"
import Tarefa from "./Tarefa"
import PesquisaTarefa from "./PesquisaTarefa"
import tasksService from '../../services/tasks'
import { useNavigate } from "react-router-dom"
import style from '../../styles/principal.module.css'
import { useState } from "react"

const PainelTarefas = ({ tarefasFiltradas, titulo, tarefas, setTarefas }) => {

  const [ pesquisa, setPesquisa ] = useState('')

  const navigate = useNavigate()

  const formatarData = () => {
    return new Date().toLocaleDateString('pt-Br', {
      weekday: 'long',
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    })
  }

  const excluirTarefa = async (id) => {
    try {
      await tasksService.excluirTarefa(id)
      setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
      tarefasFiltradas = tarefasFiltradas.filter(tarefa => tarefa.id !== id)
    } catch (error) {
      console.log(error);
    }
  } 

  const mudarConclusao = async id => {
    const tarefa = tarefas.find(t => t.id === id)

    try {
      await tasksService.atualizarTarefa({done: !tarefa.done}, id)
      setTarefas(tarefas.map(t => 
        t.id === id ? {...t, done: !t.done} : t
      ))
    } catch (error) {
      console.log(error);
    }
  }

  const mudarImportancia = async id => {
    const tarefa = tarefas.find(t => t.id === id)

    try {
      await tasksService.atualizarTarefa({important: !tarefa.important}, id)
      setTarefas(tarefas.map(t => 
        t.id === id ? {...t, important: !t.important} : t
      ))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={style.main}>
      <PesquisaTarefa
        setPesquisa={setPesquisa}
        pesquisa={pesquisa}
      />
      <button className={style.button} onClick={() => navigate('/adicionartarefa')}>
        <Plus /> Adicionar tarefa
      </button>
      <h2 className={style.titulo}>{titulo}</h2>
      {titulo === 'Hoje' ? <p className={style.data}>{formatarData()}</p> : null}
      {tarefasFiltradas
        .filter(t => t.name.includes(pesquisa))
        .map(tarefa => 
        <Tarefa 
          key={tarefa.id} 
          tarefa={tarefa} 
          excluirTarefa={excluirTarefa} 
          mudarConclusao={mudarConclusao}
          mudarImportancia={mudarImportancia}
        />
      )}
    </main>
  )
}

export default PainelTarefas