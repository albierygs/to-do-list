import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { z } from "zod";
import { toZonedTime } from 'date-fns-tz'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import style from '../styles/adicionar.module.css'
import MensagemErro from "../components/Form/MensagemErro";
import tasksService from '../services/tasks'



const schema = z.object({
	name: z.string()
		.min(1, 'O título é obrigatório'),
	description: z.string(),
  date: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, {
      message: 'Por favor, insira uma data válida',
    })
    .transform((date) => toZonedTime(new Date(date), 'Europe/London'))
})

function isValidMongoId(id) {
  if (typeof id !== 'string' || id.length !== 24) {
    return false;
  }

  const hexRegex = /^[0-9a-fA-F]{24}$/;
  return hexRegex.test(id);
}

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
    if (!(localStorage.getItem('toDoListToken') && isValidMongoId(id))) {
      navigate('/')
    }
  })

  const { 
		register, 
		handleSubmit, 
		formState: { errors, isSubmitting } 
	} = useForm({
		resolver: zodResolver(schema),
    defaultValues: {
      name: tarefa.name,
      description: tarefa.description,
      date: tarefa.date.split('T')[0]
    }
	})

  const submit = async (dados) => {
    if (dados.name === tarefa.name 
      && dados.date.toISOString() === tarefa.date 
      && dados.description === tarefa.description
    ) {
      navigate('/')
    } else {
      try {
        await tasksService.atualizarTarefa(dados, id)
        localStorage.removeItem('tasksUser')
        navigate('/')
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={style.container}>
      <h2 className={style.titulo}>Editar: {tarefa.name}</h2>
      <form id="task-form" onSubmit={handleSubmit(submit)}>
        <label htmlFor="task-title">Título</label>
        <input 
          autoFocus
          type="text" 
          {...register('name')}
          className={style.input}
        />
        <div className={style.divErro}>
          {errors.name && <MensagemErro mensagem={errors.name.message} />}
        </div>
        
        <label htmlFor="task-desc">Descrição (opcional)</label>
        <textarea 
          className={style.input}
          {...register('description')}
        ></textarea>
        <div className={style.divErro}>
          {errors.description && <MensagemErro mensagem={errors.description.message} />}
        </div>
        
        <label htmlFor="task-date">Data</label>
        <input 
          type="date" 
          className={style.input}
          {...register('date')}
        />
        <div className={style.divErro}>
          {errors.date && <MensagemErro mensagem={errors.date.message} />}
        </div>

        <button type="submit" className={style.botao} disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar mudanças'}
        </button>
        <button className={style.botaoCancelar} onClick={() => {navigate('/')}}>
          Cancelar
        </button>

    </form>
    </div>
  )
}

export default EditarTarefa