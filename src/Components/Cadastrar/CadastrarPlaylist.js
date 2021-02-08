import React from 'react'
import api from '../../Services/Api'
import '../Cadastrar/CadastrarPlaylist.css'
import { GlobalContext } from '../GlobalContext'

const CadastrarPlaylist = ({ShowModal}) => {
  const [form, setForm] = React.useState({title: '',img: ''})
  const [imgState, setImgState] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState()
  const [data, setData] = React.useState(false);
  const {searchAllPlayList} = React.useContext(GlobalContext)

  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title',form.title);
    formData.append('img',form.img);
    const response = await api.post('/cadastrar/playlist', formData, {headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token'),}});
    if(response.status === 201){
      setErro(null);
      setData(true)
      searchAllPlayList()
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

  function handleImg({target}){
    if(target.files[0] === undefined){
      setImgState('')
    }else{
      setImgState(target.files[0].name)
    }
    setForm({...form, [target.id]: target.files[0]})
  }

  React.useEffect(() => {
    if(!ShowModal){
      setForm({title: '',img: ''})
      setImgState('')
    } 
  },[ShowModal])


  return (
    <div className="cadastrarPlayList">
      <div>
        <form className="formMusic" onSubmit={handleSubmit}>
          <legend>Cadastrar Playlist</legend>
          <input type="text" value={form.title} placeholder="Nome da Playlist" autoComplete="off" id="title" onChange={handleChange} />
          <div className="formFile">
            <div>
              <label htmlFor="img"><span>{imgState ? imgState : 'Imagem'}</span></label>
              <input type="file" id="img" name="img" onChange={handleImg}/>
            </div>
          </div>
          {data ? <p className="messageSuccess">Cadastrardo com Sucesso</p> : ''}
          {erro ? <p className="messageError">{erro}</p> : ''}
          <button>{loading ? 'Carregando..' : 'Cadastrar'}</button>
        </form>
      </div>
    </div>
  )
}

export default CadastrarPlaylist
