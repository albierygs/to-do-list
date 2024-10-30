import style from '../../styles/principal.module.css'

const MenuSuspenso = () => {

  const sair = () => {
		localStorage.removeItem('toDoListToken')
		localStorage.removeItem('tasksUser')
		window.location.reload()
	}

  return (
    <ul className={style.menuSuspenso}>
      <li>
        <button className={style.botaoMenuSuspenso}>Configurações</button>
      </li>
      <li>
        <button className={style.botaoMenuSuspenso} onClick={sair}>Sair</button>
      </li>
    </ul>
  )
}

export default MenuSuspenso