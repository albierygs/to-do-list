import React from 'react'
import classNames from 'classnames'
import style from '../../styles/principal.module.css'
import { Settings, LogOut } from 'lucide-react'

const MenuSuspenso = () => {

  const sair = () => {
		localStorage.removeItem('toDoListToken')
		localStorage.removeItem('tasksUser')
		window.location.reload()
	}

  return (
    <ul className={style.menuSuspenso}>
      <li>
        <button 
          className={classNames(style.botaoMenuSuspenso, style.button)}
        >
          <Settings size={15} />
          Configurações
        </button>
      </li>
      <li>
        <button 
          className={classNames(style.botaoMenuSuspenso, style.button)} 
          onClick={sair}
        >
          <LogOut size={15} />
          Sair
        </button>
      </li>
    </ul>
  )
}

export default MenuSuspenso