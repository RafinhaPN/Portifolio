import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../servicos/produtoApi';



function Cadastrar() {

  const [dados, setDados] = useState({
    nome: '',
    preco: '',
    quantidade: '',
  })

  const [status, setStatus] = useState({
    type: '',
    msg: ''
  });

  const InputValue = e => setDados({ ...dados, [e.target.name]: e.target.value });


  const addProduto = async e => {
    e.preventDefault();
    // console.log("funciona");
    if (!dados.nome || !dados.preco || !dados.quantidade) {
      alert("preencha os campos!");
      return;
    } else {
      const headers = {
        'headers': {
          'Content-Type': 'application/json'
        }
      }
      await api.post("/produto", dados, headers).then((response) => {
        console.log(response);
        setStatus({
          type: "success",
          msg: response.data.message
        });
      }).catch((err) => {
        if (err.response) {
          setStatus({
            type: "error",
            msg: "Error: Não foi possivel cadastrar"
          })
        } else {
          setStatus({
            type: "error",
            msg: "Error: Tente mais tarde!"
          })
        }
      })





    }
  }


  return (
    <div style={{ margin: "0px auto", padding: "10px" }}>
      <h1>Cadastre seu produto!</h1>
      {status.type === 'success' ? <p style={{ color: "green", fontSize: "25px" }} >{status.msg}</p> : ""}
      {status.type === 'error' ? <p style={{ color: "red" }} >{status.msg}</p> : ""}
      <hr />
      <form onSubmit={addProduto}>

        <label>Nome</label><br />
        <input type="text" name='nome' placeholder='nome...' onChange={InputValue} /><br />

        <label>preço</label><br />
        <input type="text" name='preco' placeholder='preco...' onChange={InputValue} /><br />

        <label>quantidade</label><br />
        <input type="text" name='quantidade' placeholder='quantidades...' onChange={InputValue} /><br /><br />

        <input type="submit" value="Cadastrar" />
      </form><br />

      <Link to={'/'}><button>Voltar</button></Link>

    </div>

  );
}
export default Cadastrar;