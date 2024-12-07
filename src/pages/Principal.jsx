import { useEffect, useState } from "react"
import { isToday, isPast, isFuture } from 'date-fns'
import tasksService from '../services/tasks'
import style from '../styles/principal.module.css'
import Profile from "../components/Principal/Profile"
import ItemNavegacao from "../components/Principal/ItemNavegacao"
import PainelTarefas from "../components/Principal/PainelTarefas"
import Carregando from "./Carregando"

const Principal = ({ user }) => {
	
	const [ tarefas, setTarefas ] = useState([])
	const [ selecionadoNav, setSelecionadoNav ] = useState('Hoje')
  const [ loading, setLoading ] = useState(true);

	
	useEffect(() => {
		const carregarTarefasUsuario = async () => {
			try {
				localStorage.removeItem('tasksUser')
				const tarefas = await tasksService.carregarTarefasUsuario()
				setTarefas(tarefas)
				localStorage.setItem('tasksUser', JSON.stringify(tarefas))
			} catch (error) {
				console.error('Erro ao buscar tarefas', error);                    
			}
			setLoading(false)
		}
		carregarTarefasUsuario()
	}, [])

	const filtrarTarefas = () => {

		if (selecionadoNav === 'Hoje') {
			return tarefas
				.filter(tarefa => isToday(tarefa.dateTime))
		} else if (selecionadoNav === 'Em breve') {
			return tarefas
				.filter(tarefa =>  isFuture(tarefa.dateTime))
		} else if (selecionadoNav === 'Importantes') {
			return tarefas
				.filter(tarefa => tarefa.important)
		} else if (selecionadoNav === 'Concluídas') {
			return tarefas
				.filter(tarefa => tarefa.done)
		} else if (selecionadoNav === 'Atrasadas') {
			return tarefas
				.filter(tarefa => isPast(tarefa.dateTime) && !tarefa.done)
		} else if (selecionadoNav === 'Pendentes') {
			return tarefas
				.filter(tarefa => !tarefa.done)
		}

		return tarefas
	}

	if (loading) return <Carregando />;
	
	return (
		<div className={style.container}>
			<aside className={style.barraLateral}>
				<Profile nomeUsuario={user.name} />
				<nav className={style.nav}>
					<ul className={style.listNavegacao}>
						<ItemNavegacao 
							titulo='Hoje' 
							selecionado={selecionadoNav} 
							setSelecionado={setSelecionadoNav} 
						/>
						<ItemNavegacao 
							titulo='Em breve' 
							selecionado={selecionadoNav} 
							setSelecionado={setSelecionadoNav} 
						/>
						<ItemNavegacao 
							titulo='Concluídas' 
							selecionado={selecionadoNav} 
							setSelecionado={setSelecionadoNav} 
						/>
						<ItemNavegacao 
							titulo='Atrasadas' 
							selecionado={selecionadoNav} 
							setSelecionado={setSelecionadoNav} 
						/>
						<ItemNavegacao 
							titulo='Pendentes' 
							selecionado={selecionadoNav} 
							setSelecionado={setSelecionadoNav} 
						/>
						<ItemNavegacao 
							titulo='Importantes' 
							selecionado={selecionadoNav} 
							setSelecionado={setSelecionadoNav} 
						/>
						<ItemNavegacao 
							titulo='Todas' 
							selecionado={selecionadoNav} 
							setSelecionado={setSelecionadoNav} 
						/>
					</ul>
				</nav>
			</aside>
			<PainelTarefas 
				tarefasFiltradas={filtrarTarefas()} 
				titulo={selecionadoNav} 
				tarefas={tarefas}
				setTarefas={setTarefas}
			/>
		</div>
	)
}

export default Principal