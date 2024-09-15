import { Link, Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio';
import NaoEncontrado from './pages/NaoEncontrado';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';


const App = () => {
  return (
    <div className="App">
      <div>
        <Link to={'/cadastro'}>Cadastro</Link>
      </div>
      <Routes>
        <Route index element={<Inicio />}/>
        <Route path='*' element={<NaoEncontrado />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
      </Routes>
    </div>
  );
}

export default App;
