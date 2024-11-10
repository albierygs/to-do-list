import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import style from '../../../styles/adicionar.module.css'
import MensagemErro from '../MensagemErro'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toZonedTime } from 'date-fns-tz'


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
          defaultValue={dataAtual}
          className={style.input}
          {...register('date')}
        />
        <div className={style.divErro}>
          {errors.date && <MensagemErro mensagem={errors.date.message} />}
        </div>

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