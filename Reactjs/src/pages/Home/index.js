import React,{useState} from 'react'
import api from '../servicos/Api';


function Home() {
/*
    const [data , setData] = useState([]); 
   async function Listar(){
       await api.get('/posts').then((response)=>{
         console.log(response);
       }).catch((err)=>{
         console.log(err);
       })
   } 

   useEffect(()=>{
      Listar();
   },[]);
*/
   const [dados, setDados  ] = useState({
    nome:'',
    email:'',
  })

 const  InputValor = e =>setDados({ ... dados,[e.target.name]: e.target.value}); 



  const Cadastrar = async e =>{
    e.preventDefault();
    //console.log(dados.nome);
    //console.log(dados.email);

    if(dados.nome == "" && dados.email==""){
        alert("preencha os campo");
        return;
    }


    const headers = {
        'headers':{
            'Content-Type': 'application/json'
         }
      }

     await api.post('/Cadastro',dados,headers).then((response)=>{
           alert("cadastro efetuado com sucesso!");
           console.log(response);          
     }).then((err)=>{
         
     }) 
   }
  return (
  <div className='container' >
  
      <h1>Cadastre se  no chat:</h1>
      <hr/>

      <form onSubmit={Cadastrar}>
          <label>Nome:</label><br/>
          <input  type="text" name='nome' onChange={InputValor} placeholder='Apelido ou nome ...'/><br/>
          <label>E-mail</label><br/>
          <input  type="email" name='email' onChange={InputValor} placeholder='digite seu email...'/><br/><br/>
          <button  type='submit'>Cadastrar</button>
      </form>


    
  </div>     
    
  );
}



export default Home;
