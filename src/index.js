const express = require('express');
const app = express();
const { randomUUID } = require('crypto') //gera um id 
const fs = require('fs');
const cors = require('cors');
app.use(express.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");     
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-Type,Authorization");
    app.use(cors())
    next();    
  });
//const produtos = [];
//leitura de arquivo
let produtos = [];
fs.readFile("produto.json","utf8",(err,data)=>{
       produtos = JSON.parse(data);
})
app.post("/produto", (req, res) => {
    const { nome, preco, quantidade } = req.body;
    const produto = {
        nome,
        preco,
        quantidade,
        id: randomUUID()
    }
    produtos.push(produto);
     //gerando o arquivo e cadastrando
    // esta em formato json
    fs.writeFile("produto.json",JSON.stringify(produtos), (err)=>{
           if(err){
            console.log(err)
           }else{
                  
           }    
    })
  
    return res.json({
        error:false,
        message:"Produto cadastrado com sucesso!"
    });
});
app.get('/produtos', (req, res) => {
    return res.json(produtos);
});
app.get("/produto/:id", (req, res) => {
    const { id } = req.params;
    const item = produtos.find(produto => produto.id === id)
    return res.json({
        error:false,
        message:"Produto encontrado com sucesso!",
        produto: item
    });
});
app.put("/produto/:id", (req, res) => {
    const { id } = req.params;
    const { nome, preco, quantidade } = req.body;
    const produtoIndex = produtos.findIndex(produto => produto.id === id)
    produtos[produtoIndex] = {
        ...produtos[produtoIndex],
        nome,
        preco,
        quantidade
      
    }
    fs.writeFile("produto.json",JSON.stringify(produtos), (err)=>{
        if(err){
         console.log(err)
        }else{
               
        }    
 })

    return res.json({
        
        error: false,
        message: "produto alterado com sucesso!",
       
    });
});
app.delete("/produto/:id", (req, res) => {
    const { id } = req.params;
    const produtoIndex = produtos.findIndex(produto => produto.id === id)
    produtos.splice(produtoIndex, 1);

    fs.writeFile("produto.json",JSON.stringify(produtos), (err)=>{
        if(err){
         console.log(err)
        }
 })
    return res.json({
        error: false,
        message: "produto Apagado com sucesso!",
       
    });
});

app.listen(4002, function () {
    console.log("Rodando servidor");
})

