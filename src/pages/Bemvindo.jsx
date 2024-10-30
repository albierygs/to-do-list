import { useEffect } from "react"
import { Link } from "react-router-dom"

const BemVindo = () => {

  useEffect(() => {
    document.title = 'Bem vindo ao ToDo list'
  }, [])

  return (
    <>
      <h1>Bem vindo</h1>
      <Link to={'/login'}>login</Link>
      <Link to={'/cadastro'}>Cadastro</Link>
    </>
  )
}

export default BemVindo