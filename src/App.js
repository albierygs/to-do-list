import { Route, Routes } from 'react-router-dom'

import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import AdicionarTarefa from './pages/AdicionarTarefa';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Inicio />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
        <Route path='/adicionartarefa' element={<AdicionarTarefa />}/>
      </Routes>
    </div>
  );
}

export default App;
