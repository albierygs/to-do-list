import { useEffect, useState } from "react"
import { isToday, isPast, isFuture } from 'date-fns'
import tasksService from '../services/tasks'
import style from '../styles/principal.module.css'
import Profile from "../components/Principal/Profile"
import ItemNavegacao from "../components/Principal/ItemNavegacao"
import PainelTarefas from "../components/Principal/PainelTarefas"

const Principal = ({ user }) => {
	
	const [ tarefas, setTarefas ] = useState([])
	const [ selecionadoNav, setSelecionadoNav ] = useState('Hoje')
	
	useEffect(() => {
		const carregarTarefasUsuario = async () => {
			const tasksStorage = localStorage.getItem('tasksUser')
			
			if (tasksStorage) {
				setTarefas(JSON.parse(tasksStorage))
			} else {
				try {
					const token = localStorage.getItem('toDoListToken')
					const tarefas = await tasksService.carregarTarefasUsuario(token)
					setTarefas(tarefas)
					localStorage.setItem('tasksUser', JSON.stringify(tarefas))
				} catch (error) {
					console.error('Erro ao buscar tarefas', error);                    
				}
			}
		}
		carregarTarefasUsuario()
	}, [])

	const filtrarTarefas = () => {

		if (selecionadoNav === 'Hoje') {
			return tarefas
				.filter(tarefa => isToday(tarefa.date))
		} else if (selecionadoNav === 'Em breve') {
			return tarefas
				.filter(tarefa =>  isFuture(tarefa.date))
		} else if (selecionadoNav === 'Importantes') {
			return tarefas
				.filter(tarefa => tarefa.important)
		} else if (selecionadoNav === 'Concluídas') {
			return tarefas
				.filter(tarefa => tarefa.done)
		} else if (selecionadoNav === 'Atrasadas') {
			return tarefas
				.filter(tarefa => isPast(tarefa.date) && !tarefa.done)
		} else if (selecionadoNav === 'Pendentes') {
			return tarefas
				.filter(tarefa => !tarefa.done)
		}

		return tarefas
	}
	
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