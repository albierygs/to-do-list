import BemVindo from '../components/Bemvindo'
import Principal from '../components/Principal'
import usersService from '../services/users'
import { useEffect, useState } from 'react'

const Inicio = () => {

    const [ token, setToken ] = useState(null)
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        const pegarDadosUsuario = async () => {
            const token = localStorage.getItem('toDoListToken')
            if (token) {
                try {
                    const response = await usersService.getUsuario(token)
                    if (response.status === 200) {
                        setToken(token)
                        setUser(response.data)
                    } else {
                        localStorage.removeItem('toDoListToken')
                    }
                } catch (error) {
                    console.error('Erro ao buscar os dados do usuário');
                }
            }
        }
        pegarDadosUsuario()
    }, [])

    return (
        <>
            <h1>Página Inicial</h1>
            {user == null 
                ? <BemVindo />
                : <Principal token={token}/>
            }
        </>
    )
}

export default Inicio