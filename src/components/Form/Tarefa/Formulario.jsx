import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import style from '../../../styles/adicionar.module.css'
import { useNavigate } from 'react-router-dom'
import PesquisaLocal from '../../PesquisaLocal'
import MensagemErro from '../MensagemErro'


const schema = z.object({
	name: z.string()
		.min(1, 'O título é obrigatório'),
	description: z.string().default(''),
  dateTime: z.preprocess((value) => {
    console.log(value);
    
    if (typeof value === 'object' && value !== null) {
      const { date, time } = value;

      if (typeof date === 'string') {
        const [year, month, day] = date.split('-').map(Number);

        if (typeof time === 'string') {
          const [hours, minutes] = time.split(':').map(Number);
          const combinedDate = new Date(year, month - 1, day, hours, minutes);
          return combinedDate;
        } else {
          const combinedDate = new Date(year, month - 1, day);
          return combinedDate;
        }
      }
    }
    return null;
  }, z.date().nullable()),
  location: z.object({
    name: z.string().nullable().default(''),
    type: z.literal('Point').default('Point'),
    coordinates: z.array(z.number()).length(2).nullable().default(null)
  })
})

const Formulario = ({ onSubmit }) => {
  const navigate = useNavigate()

  const formTarefa = useForm({
		resolver: zodResolver(schema)
	})

  const { 
		register, 
		handleSubmit, 
		formState: { errors, isSubmitting },
    setValue,
    getValues
	} = formTarefa

  const handleDateTimeChange = (field, value) => {
    console.log(field, value);

    const currentDateTime = getValues('dateTime') || { date: null, time: null }
    
    const updatedDateTime = { ...currentDateTime, [field]: value || null }

    setValue('dateTime', updatedDateTime);
  };

  console.log(errors);
  

  return (
    <FormProvider {...formTarefa}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Título</label>
        <input 
          autoFocus
          type="text" 
          {...register('name')}
          className={style.input}
        />
        <div className={style.divErro}>
          {errors.name && <MensagemErro mensagem={errors.name.message} />}
        </div>
        
        <label>Descrição (opcional)</label>
        <textarea 
          className={style.input}
          {...register('description')}
        ></textarea>
        <div className={style.divErro}>
          {errors.description && <MensagemErro mensagem={errors.description.message} />}
        </div>
        
        <label>Data</label>
        <input 
          type="date" 
          className={style.input}
          onChange={(e) => handleDateTimeChange('date', e.target.value)}
        />

        <label>Hora</label>
        <input 
          type="time" 
          className={style.input}
          onChange={(e) => handleDateTimeChange('time', e.target.value)}
        />

        <PesquisaLocal />
        <button type="submit" className={style.botao} disabled={isSubmitting}>
          {isSubmitting ? 'Adicionando...' : 'Adicionar tarefa'}
        </button>
        <button className={style.botaoCancelar} onClick={() => {navigate('/')}}>
          Cancelar
        </button>

      </form>
    </FormProvider>
  )
}

export default Formulario