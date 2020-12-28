import React from 'react'
import api from '../Services/Api'
import './Cadastrar.css'
import { GlobalContext} from './GlobalContext'

const Cadastrar = () => {
  const {menu, setMenu} = React.useContext(GlobalContext)
  const [imgState, setImgState] = React.useState('');
  const [audioState, setAudioState] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(false);
  const [form, setForm] = React.useState({autor: '',titulo: '',img: '',musica: ''})

  setMenu(false);

  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('titulo',form.titulo);
    formData.append('autor',form.autor);
    formData.append('img',form.img);
    formData.append('img',form.musica);
    const response = await api.post('/cadastrar', formData);
    if(response.status === 201){
      setData(true)
      setLoading(false);
    }
  }
  function handleChange({target}){
    const {id, value} = target;
    setForm({...form, [id]: value})
  }
  function handleImg({target}){
    if(target.files[0] === undefined){
      if(target.id === 'img') setImgState('')
      else setAudioState('')
    }else{
      if(target.id === 'img') setImgState(target.files[0].name)
      else setAudioState(target.files[0].name)
    }
    setForm({...form, [target.id]: target.files[0]})
  }
 
  return (
    <>
    <div className="cadastrarMusica">
      <div>
        <div>
          <h2>{loading ? 'Carregando..' : data ? 'Música Cadastrada com Sucesso!' : 'Cadastre as suas músicas'}</h2>
        </div>
        <form  onSubmit={handleSubmit} method="POST" >
          <input type="text" placeholder="Autor" autoComplete="off" id="autor" name="autor" onChange={handleChange} />
          <input type="text" placeholder="Título" autoComplete="off" id="titulo" name="titulo" onChange={handleChange} />
          <div className="formFile">
            <div>
              <label htmlFor="img"><span>{imgState ? imgState : 'Imagem'}</span></label>
              <input type="file" id="img" name="img" accept=".jpg" onChange={handleImg}/>
            </div>
            <div>
              <label htmlFor="musica"><span>{audioState ? audioState : 'Música'}</span></label>
              <input type="file" id="musica" name="musica" accept=".mp3" onChange={handleImg} />
            </div>
          </div>
          {loading ? 
            <button disabled>Carregando..</button>:
            <button>Cadastrar</button>
          }
        </form>
      </div>
    </div>
    </>
  )
}

export default Cadastrar
