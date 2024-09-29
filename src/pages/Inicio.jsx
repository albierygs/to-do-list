import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import BemVindo from './Bemvindo'
import Principal from './Principal'
import usersService from '../services/users'

const Inicio = () => {

    const [ user, setUser ] = useState(null)
    const [ token, setToken ] = useState(null)

    useEffect(() => {
        const pegarDadosUsuario = async () => {
            const token = localStorage.getItem('toDoListToken')
            
            if (token) {
                try {
                    const response = await usersService.carregarUsuario(token)
                    setUser(response)
                    setToken(token)
                } catch (error) {
                    localStorage.removeItem('toDoListToken')
                    setUser(null)
                    setToken(null)
                    console.error('Erro ao buscar os dados do usuário');
                }
            }
        }
        pegarDadosUsuario()
    }, [])


    return (
        <>
            <Link to={'/login'}>login</Link>
            <br />
            <Link to={'/cadastro'}>Cadastro</Link>
            {user == null 
                ? <BemVindo />
                : <Principal user={user} token={token}/>
            }
        </>
    )
}

export default Inicio