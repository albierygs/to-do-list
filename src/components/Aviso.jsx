const Aviso = ({ mensagem }) => {
    if (mensagem === null) {
      return null
    }
  
    return (
      <div className='error'>
        {mensagem}
      </div>
    )
}

export default Aviso