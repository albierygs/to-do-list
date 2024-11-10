import style from '../styles/modalAviso.module.css';
import ReactDOM from 'react-dom'
const ModalAviso = ({ 
  mudarEstado, 
  titulo, 
  mensagem, 
  metodoBotaoPrincipal ,
  botaoSecundario
}) => {

  metodoBotaoPrincipal = metodoBotaoPrincipal || mudarEstado

  return ReactDOM.createPortal(
    <div className={style.modalOverlay} onClick={mudarEstado}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{titulo}</h2>
        <p>{mensagem}</p>
        
        <div className={style.modalButtons}>
          {botaoSecundario && (
            <button
              className={style.secondaryButton}
              onClick={botaoSecundario.onClick}
            >
              {botaoSecundario.texto}
            </button>
          )}
          <button
            className={botaoSecundario ? style.primaryButtonInactive : style.primaryButton}
            onClick={metodoBotaoPrincipal}
          >
            {botaoSecundario ? 'Cancelar' : 'OK'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ModalAviso