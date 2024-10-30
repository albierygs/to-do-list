import style from '../../styles/principal.module.css'
import { CircleUserRound, ChevronDown } from 'lucide-react'
import MenuSuspenso from './MenuSuspenso'
import { useState } from 'react'

const Profile = ({ nomeUsuario }) => {

  const [ visibilidadeMenu, setVisibilidadeMenu ] = useState(false)

  const mudarVisibilidade = () => {
    setVisibilidadeMenu(!visibilidadeMenu)
  }

  return (
    <>
      <button onClick={mudarVisibilidade} className={style.botaoPerfil}>
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