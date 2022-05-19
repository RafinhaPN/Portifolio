import React, { useEffect, useState } from 'react'
import api from './servicos/produtoApi';
import { Link } from 'react-router-dom';

function Produtos() {
    const [produtos, setProdutos] = useState([])
    const PegarProduto = async () => {
        await api.get('/produtos').then((response) => {
            //console.log(response.data); 
            setProdutos(response.data);
        })
    }
    useEffect(() => {
        PegarProduto();
    }, [])
    const [status, setStatus] = useState({
        type: '',
        msg: ''
    });
    const Apagar = async (idproduto) => {
       // console.log(idproduto);
        await api.delete("/produto/" + idproduto).then((response) => {
            setStatus({
                type: "success",
                msg: response.data.message
            })
            PegarProduto();
        }).then((err) => {
            if (err.response) {
                setStatus({
                   // type: "error",
                   // msg: err.response.data.message
                })
            } else {
                setStatus({
                    type: "error",
                    msg: "Error : Tente mais tarde !"
                })
            }
        })
    }



    return (
        <div style={{ margin: "0px auto", padding: "10px" }}>

            <h1>Produtos</h1>
            <Link to={'/cadastrar/'}><button>Cadastrar</button></Link>
            {status.type === 'success' ? <p style={{ color: "green",fontSize:"25px" }} >{status.msg}</p> : ""}
      {status.type === 'error' ? <p style={{ color: "red" }} >{status.msg}</p> : ""}
            <hr />
            <table style={{ margin: "0px auto", padding: "10px" }}>

                <thead >

                    <tr style={{ textAlign: "center", padding: "3px" }}>

                        <td>ID</td>
                        <td>Nome</td>
                        <td>Preço</td>
                        <td>Quantidade</td>

                    </tr>

                </thead>

                {produtos.map(produto => (
                    <tbody key={produto.id}>

                        <tr style={{ textAlign: "center" }}>

                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.quantidade}</td>

                            <td style={{ margin: "5px" }}>
                                <Link to={'/editar/' + produto.id}><button>Editar</button></Link>
                                <Link to={'/visualizar/' + produto.id}><button>Visualizar</button></Link>
                                <button onClick={() => Apagar(produto.id)} >Apagar</button>
                            </td>
                        </tr>

                    </tbody>
                ))}


            </table>


        </div>
    )


}

export default Produtos;