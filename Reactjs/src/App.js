import React from 'react'
//import Home from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Produtos from './pages/Produtos';
import Editar from './pages/Produtos/Editar';
import Cadastrar from './pages/Produtos/Cadastrar';
import Visualizar from './pages/Produtos/Visualizar';
function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Produtos />} />
      <Route path="/editar/:id" element={<Editar />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/visualizar/:id" element={<Visualizar />} />
   </Routes>
  </BrowserRouter>
   
    
  );
}



export default App;
