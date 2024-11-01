import { Search } from "lucide-react"
import style from '../../styles/principal.module.css'

const PesquisaTarefa = ({ pesquisa, setPesquisa }) => {
  return (
    <div className={style.divPesquisa}>
      <Search size={20} className={style.iconePesquisa} />
      <input 
        value={pesquisa}
        placeholder="Pesquise a tarefa"
        onChange={(event) => setPesquisa(event.target.value)}
      />
    </div>
  )
}

export default PesquisaTarefa