import React from 'react'
import api from '../../Services/Api'

const CadastrarAlbum = () => {
  const [imgStates, setImgStates] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState()
  const [data, setData] = React.useState(false);
  const [form, setForm] = React.useState({titulo: '',image: ''})


  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title',form.titulo);
    formData.append('img',form.image);
    const response = await api.post('/cadastrar/album', formData, {headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token'),}});
    if(response.status === 201){
      setErro(null);
      setData(true)
      setLoading(false);
    }else if(response.status === 200){
      setLoading(false);
      setErro(response.data);
    }
  }
  function handleChange({target}){
    const {id, value} = target;
    setForm({...form, [id]: value})
  }
  function handleImgs({target}){
    if(target.files[0] === undefined){
      setImgStates('')
    }else{
      setImgStates(target.files[0].name)
    }
    setForm({...form, [target.id]: target.files[0]})
  }
 
  return (
    <div className="cadastrarMusica">
      <div>
        <div>
          {erro ? <h2>{erro}</h2> : <h2>{loading ? 'Carregando..' : data ? 'Álbum Cadastrada com Sucesso!' : 'Cadastre os seus Álbuns'}</h2>}
        </div>
        <form className="formMusic" onSubmit={handleSubmit} method="POST" >
          <input type="text" placeholder="Nome do álbum" autoComplete="off" id="titulo" name="titulo" onChange={handleChange} />
          <div className="formFile">
            <div>
              <label htmlFor="image"><span>{imgStates ? imgStates : 'Imagem'}</span></label>
              <input type="file" id="image" name="image" onChange={handleImgs}/>
            </div>
          </div>
          {loading ? 
            <button disabled>Carregando..</button>:
            <button>Cadastrar</button>
          }
        </form>
      </div>
    </div>
  )
  
}

export default CadastrarAlbum