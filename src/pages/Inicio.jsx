import { useState, useEffect } from 'react';
import usersService from '../services/users'
import BemVindo from './Bemvindo'
import Principal from './Principal'
import Carregando from './Carregando';

const Inicio = () => {
  
  const [user, setUser] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const pegarDadosUsuario = async () => {
      const token = localStorage.getItem('toDoListToken');
      
      if (token) {
        try {
          const response = await usersService.carregarUsuario();
          setUser(response);
        } catch (error) {
          localStorage.removeItem('toDoListToken');
          localStorage.removeItem('tasksUser');
          setUser(null);
          console.error('Erro ao buscar os dados do usuário');
        }
      }
      setLoading(false);
    };
    pegarDadosUsuario();
  }, []);

  if (loading) return <Carregando />;

  return user ? <Principal user={user} /> : <BemVindo />;
}

export default Inicio