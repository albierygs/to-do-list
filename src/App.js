import { Route, Routes } from 'react-router-dom'

import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import NaoEncontrado from './pages/NaoEncontrado';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Inicio />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
        <Route path='*' element={<NaoEncontrado />} />
      </Routes>
    </div>
  );
}

export default App;
