import { useEffect } from "react"
import { Link } from "react-router-dom"
// import style from '../styles/bemVindo.module.css'

const BemVindo = () => {

  useEffect(() => {
    document.title = 'Bem vindo ao ToDo list'
  }, [])

  useEffect(() => {
    document.body.style.background = 'none';
    document.body.style.animation = 'none';

    return () => {
      document.body.style.background =
        'linear-gradient(135deg, #021148, #4306ec, #6b39a9, #850091)';
      document.body.style.backgroundSize = '400% 400%';
      document.body.style.animation = 'gradientAnimation 40s ease infinite';
    };
  }, []);

  return (
    <div>
      <h1>Bem vindo</h1>
      <Link to={'/login'}>login</Link>
      <Link to={'/cadastro'}>Cadastro</Link>
    </div>
  )
}

export default BemVindo