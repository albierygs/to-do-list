import { Route, Routes } from 'react-router-dom'

import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import AdicionarTarefa from './pages/AdicionarTarefa';
import ResetSenha from './pages/ResetSenha';
import EsqueciSenha from './pages/EsqueciSenha';
import NaoEncontrado from './pages/NaoEncontrado';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Inicio />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
        <Route path='/adicionar-tarefa' element={<AdicionarTarefa />}/>
        <Route 
          path='/esqueci-senha' 
          element={<EsqueciSenha />} 
        />
        <Route path='/redefinir-senha/:token' element={<ResetSenha />} />
        <Route path='*' element={<NaoEncontrado />} />
      </Routes>
    </div>
  );
}

export default App;
