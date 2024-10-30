import { useEffect, useState } from 'react'


import BemVindo from './Bemvindo'
import Principal from './Principal'
import usersService from '../services/users'

const Inicio = () => {
  
  const [ user, setUser ] = useState(null)
  
  useEffect(() => {
    const pegarDadosUsuario = async () => {
      const token = localStorage.getItem('toDoListToken')
      
      if (token) {
        try {
          const response = await usersService.carregarUsuario()
          setUser(response)
        } catch (error) {
          localStorage.removeItem('toDoListToken')
          localStorage.removeItem('tasksUser')
          setUser(null)
          console.error('Erro ao buscar os dados do usuário');
        }
      } else {
        setUser(null)
      }
    }
    pegarDadosUsuario()
  }, [])
  
  
  return (
    <>
      {user == null 
        ? <BemVindo />
        : <Principal user={user}/>
      }
    </>
  )
}

export default Inicio