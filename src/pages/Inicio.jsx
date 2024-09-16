import BemVindo from './Bemvindo'
import Principal from './Principal'
import usersService from '../services/users'

import { useEffect, useState } from 'react'

const Inicio = () => {

    const [ user, setUser ] = useState(null)

    useEffect(() => {
        const pegarDadosUsuario = async () => {
            const token = localStorage.getItem('toDoListToken')
            if (token) {
                try {
                    const response = await usersService.getUsuario(token)
                    if (response.status === 200) {
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
                : <Principal user={user}/>
            }
        </>
    )
}

export default Inicio