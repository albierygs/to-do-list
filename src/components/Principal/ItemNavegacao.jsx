import style from '../../styles/principal.module.css'
import { Pin, ListChecks, LayoutList, CalendarX, CalendarDays, Star, List } from 'lucide-react'

const ItemNavegacao = ({ titulo, selecionado, setSelecionado }) => {

  const icone = () => {
    switch (titulo) {
      case 'Hoje':
        return <Pin 
          size={15} 
          fill={selecionado === titulo ? 'gold' : 'none'} 
        />
    
      case 'Em breve':
        return <CalendarDays 
          size={15} 
          fill={selecionado === titulo ? 'gold' : 'none'}
        />
      
      case 'Importantes':
        return <Star 
          size={15} 
          fill={selecionado === titulo ? 'gold' : 'none'}
        />

      case 'Concluídas':
        return <ListChecks 
          size={15} 
          fill={selecionado === titulo ? 'gold' : 'none'}
        />

      case 'Pendentes':
        return <LayoutList 
          size={15} 
          fill={selecionado === titulo ? 'gold' : 'none'}
        />

      case 'Atrasadas':
        return <CalendarX 
          size={15} 
          fill={selecionado === titulo ? 'gold' : 'none'}
        />

      case 'Todas': 
        return <List 
          size={15}
          fill={selecionado === titulo ? 'gold' : 'none'}
        />

      default:
        return null
    }
  }


  return (
    <li>
      <button 
        onClick={() => setSelecionado(titulo)}
        className={titulo === selecionado ? style.itemNavSelecionado : style.itemNav}
      >
        {icone()} {titulo}
      </button>
    </li>
  )
}

export default ItemNavegacao