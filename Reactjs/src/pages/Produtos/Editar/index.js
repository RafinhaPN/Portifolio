import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from '../servicos/produtoApi';
function Editar() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    const getProduto = async () => {
      await api.get("/produto/" + id).then((response) => {
        // console.log(response);
        setNome(response.data.produto.nome);
        setPreco(response.data.produto.preco);
        setQuantidade(response.data.produto.quantidade);
      })
    }

    getProduto();

  }, [id])
  
  const [status, setStatus] = useState({
    type: '',
    msg: ''
  });

  const editProduto = async e => {
    e.preventDefault();
    console.log("funciona!");
    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }
    await api.put("/produto/" + id, { nome, preco, quantidade }, headers).then((response) => {
      console.log(response);
      setStatus({
        type:'success',
        msg: response.data.message
      })
    }).catch((err)=>{
      if(err.response){
          setStatus({
            type:'error',
            msg: err.response.data.message
          })
      }else{
        setStatus({
          type:'error',
          msg: 'Error: tente mais tarde !'
        })
      }
    })


  }


  return (
    <div style={{ margin: "0px auto", padding: "10px" }} >
      <h1>Editar</h1>

      <Link to={'/'}><button>Voltar</button></Link>
      {status.type === 'success' ? <p style={{ color: "green",fontSize:"25px" }} >{status.msg}</p> : ""}
      {status.type === 'error' ? <p style={{ color: "red" }} >{status.msg}</p> : ""}
      <hr />
      <form onSubmit={editProduto} style={{ margin: "0px auto", padding: "10px" }}>

        <label>Nome</label><br />
        <input type="text" name='nome' placeholder='nome...' value={nome} onChange={e => setNome(e.target.value)} /><br />
        <label>preço</label><br />
        <input type="text" name='preco' placeholder='preco...' value={preco} onChange={e => setPreco(e.target.value)} /><br />
        <label>quantidade</label><br />
        <input type="text" name='quantidade' placeholder='quantidades...' value={quantidade} onChange={e => setQuantidade(e.target.value)} /><br />
        <input type="submit" value="Alterar" />
      </form><br />

    </div>

  );
}
export default Editar;