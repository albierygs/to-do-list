import { SquarePen, Trash2, Star, CircleCheckBig } from 'lucide-react'
import style from '../../styles/principal.module.css'
import { useNavigate } from 'react-router-dom'

const Tarefa = ({ tarefa, excluirTarefa, mudarImportancia, mudarConclusao }) => {

  const navigate = useNavigate()

  const editarTarefa = () => {
    navigate(`/editar-tarefa/${tarefa.id}`)
  }
  
  return (
    <div className={style.divTarefa}>
      <p>{tarefa.name}</p>
      <div title={tarefa.important ? 'Marcar como não importante' : 'Marcar como importante'}>
        <Star 
          fill={tarefa.important ? 'gold' : 'none'}  
          onClick={() => mudarImportancia(tarefa.id)} className={style.iconesTarefa}
        />
      </div>
      <div title={tarefa.done ? 'Marcar como não concluída' : 'Marcar como concluída'}>
        <CircleCheckBig 
          fill={tarefa.done ? 'gold' : 'none'} 
          onClick={() => mudarConclusao(tarefa.id)}  className={style.iconesTarefa}
        />
      </div>
      <div title='Editar tarefa'>
        <SquarePen 
          className={style.iconesTarefa} 
          onClick={editarTarefa}
        />
      </div>
      <div title='Excluir tarefa'>
        <Trash2 onClick={() => excluirTarefa(tarefa.id)} className={style.iconesTarefa} />
      </div>
    </div>
  )
}

export default Tarefa