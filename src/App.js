import { Route, Routes } from 'react-router-dom'

import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Inicio />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
      </Routes>
    </div>
  );
}

export default App;
