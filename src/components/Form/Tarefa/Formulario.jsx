import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import style from '../../../styles/adicionar.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const schema = z.object({
	name: z.string()
		.min(1, 'O título é obrigatório'),
	description: z.string(),
  date: z.preprocess((value) => {
    if (typeof value === 'string' || value instanceof Date) {
      const date = new Date(value)
      date.setUTCHours(0, 0, 0, 0);
      return date
    }
    return value
  }, z.date())
})

const Formulario = ({ onSubmit }) => {
  const [dataAtual] = useState(() => new Date().toISOString().split('T')[0])
  const navigate = useNavigate()

  const { 
		register, 
		handleSubmit, 
		formState: { errors, isSubmitting } 
	} = useForm({
		resolver: zodResolver(schema)
	})

  console.log(errors);

  return (
    <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="task-title">Título</label>
        <input 
          type="text" 
          {...register('name')}
          className={style.input}
        />
        
        <label htmlFor="task-desc">Descrição (opcional)</label>
        <textarea 
          className={style.input}
          {...register('description')}
        ></textarea>
        
        <label htmlFor="task-date">Data</label>
        <input 
          type="date" 
          defaultValue={dataAtual}
          className={style.input}
          {...register('date')}
        />
        <button type="submit" className={style.botao} disabled={isSubmitting}>
          {isSubmitting ? 'Adicionando...' : 'Adicionar tarefa'}
        </button>
        <button className={style.botaoCancelar} onClick={() => {navigate('/')}}>
          Cancelar
        </button>

    </form>
  )
}

export default Formulario