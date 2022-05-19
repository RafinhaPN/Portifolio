import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from '../servicos/produtoApi';
function Visualizar() {
  const { id } = useParams();
//  console.log(id);
   const [data , setData]= useState("");


   useEffect(()=>{
    const DetalheProdutos = async () => {
      await api.get("/produto/"+ id).then((response)=>{
       // console.log(response.data);
        setData(response.data.produto);
      }).catch((err)=>{

      })   
    }
    DetalheProdutos();
   },[id])

    return (
    <div style={{ margin: "0px auto", padding: "10px" }}>
         <h1>Detalhes produto</h1>
         <Link to={'/'}><button>Voltar</button></Link> 
            <hr />

         <p>Nome:{' '}{data.nome}</p>
         <p>Preço:{' '}{data.preco}</p>
         <p>Quantidade:{' '}{data.quantidade}</p>

    </div>     
      
    );
  }
  export default Visualizar;