import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import style from '../styles/adicionar.module.css'
import MensagemErro from "../components/Form/MensagemErro";
import tasksService from '../services/tasks'
import PesquisaLocalEditar from "../components/PesquisaLocalEditar";


const schema = z.object({
	name: z.string()
		.min(1, 'O título é obrigatório'),
	description: z.string().default(''),
  dateTime: z.coerce.date(),
  location: z.object({
    name: z.string().nullable().default(''),
    type: z.literal('Point').default('Point'),
    coordinates: z.array(z.number()).length(2).nullable().default(null)
  })
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

  const formTarefa = useForm({
		resolver: zodResolver(schema),
    defaultValues: {
      name: tarefa.name,
      description: tarefa.description,
      dateTime: new Date(tarefa.dateTime),
      location: tarefa.location
    }
	})

  const { 
		register, 
		handleSubmit, 
    getValues,
    setValue,
		formState: { errors, isSubmitting } 
	} = formTarefa

  const submit = async (dados) => {
    if (dados.name === tarefa.name 
      && new Date(dados.dateTime).toISOString() === tarefa.dateTime
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

  const handleDateTimeChange = (field, value) => {
    console.log(field, value);
  
    const currentDateTime = getValues('dateTime');
  
    let updatedDateTime;
  
    if (field === "date") {
      const [year, month, day] = value.split("-");
      updatedDateTime = new Date(
        year,
        month - 1,
        day,
        currentDateTime.getHours(),
        currentDateTime.getMinutes(),
        currentDateTime.getSeconds()
      );
    } else if (field === "time") {
      const [hours, minutes] = value.split(":");
      updatedDateTime = new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        currentDateTime.getDate(),
        parseInt(hours, 10),
        parseInt(minutes, 10),
        currentDateTime.getSeconds()
      );
    } else {
      console.error("Campo inválido:", field);
      return;
    }
  
    setValue('dateTime', updatedDateTime);
  };

  return (
    <FormProvider {...formTarefa}>
      <form onSubmit={handleSubmit(submit)}>
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
          defaultValue={tarefa.dateTime.split('T')[0]}
          type="date" 
          className={style.input}
          onChange={(e) => handleDateTimeChange('date', e.target.value)}
        />

        <label>Hora</label>
        <input 
          defaultValue={`${getValues('dateTime').getHours().toString().padStart(2, '0')}:${getValues('dateTime').getMinutes().toString().padStart(2, '0')}`}
          type="time" 
          className={style.input}
          onChange={(e) => handleDateTimeChange('time', e.target.value)}
        />

        <PesquisaLocalEditar location={tarefa.location} />
        <button type="submit" className={style.botao} disabled={isSubmitting}>
          {isSubmitting ? 'Atualizando...' : 'Atualizar tarefa'}
        </button>
        <button className={style.botaoCancelar} onClick={() => {navigate('/')}}>
          Cancelar
        </button>

      </form>
    </FormProvider>
  )
}

export default EditarTarefa