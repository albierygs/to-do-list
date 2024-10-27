import { useEffect } from "react"

const BemVindo = () => {

  useEffect(() => {
    document.title = 'Bem vindo ao ToDo list'
  }, [])

  return (
    <h1>Bem vindo</h1>
  )
}

export default BemVindo