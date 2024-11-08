import style from '../../styles/principal.module.css'
import { CircleUserRound, ChevronDown } from 'lucide-react'
import MenuSuspenso from './MenuSuspenso'
import { useState } from 'react'
import classNames from 'classnames'

const Profile = ({ nomeUsuario }) => {

  const [ visibilidadeMenu, setVisibilidadeMenu ] = useState(false)

  const mudarVisibilidade = () => {
    setVisibilidadeMenu(!visibilidadeMenu)
  }

  return (
    <>
      <button 
        onClick={mudarVisibilidade} 
        className={classNames(style.botaoPerfil, style.button)}
      >
        <div className={style.divPerfil}>
          <CircleUserRound />
          <p>{nomeUsuario}</p>
          <ChevronDown />
        </div>
      </button>
      {visibilidadeMenu ? <MenuSuspenso /> : null}
    </>
  )
}

export default Profile