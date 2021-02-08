import React from 'react'
import { Link } from 'react-router-dom'
import './ListaAlbum.css'
import api from '../../Services/Api'

const ListaAlbum = () => {
  const [songs, setSongs] = React.useState()
  const [album, setAlbum] = React.useState({title: '', id: ''})
  const [form, setForm] = React.useState({title: '',song: '', id:''})
  const [audioState, setAudioState] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState()
  const [data, setData] = React.useState(false);

  React.useEffect(() => {
    async function searchAlbum(){
      const response = await api.get('/procurar/albuns', {headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token'),}})
      setSongs(response.data)
    }
    searchAlbum()
  },[])

  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title',form.title);
    formData.append('img',form.song);
    formData.append('album',album.id);
    const response = await api.post('/cadastrar/musica', formData, {headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token'),}});
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

  function handleImg({target}){
    if(target.files[0] === undefined){
      setAudioState('')
    }else{
      setAudioState(target.files[0].name)
    }
    setForm({...form, [target.id]: target.files[0]})
  }

  function cliqueForaModal(event){
    if(event.target === this){
      document.querySelector('.cadastrarMusicaModel').classList.remove('show')
      handleLimpar()
    }
  }

  function handleLimpar(){
    setAudioState('')
    setData(false)
    setErro(false)
    setForm({title: '',song: '', id:''})
  }

  function handleClick({target}){
    let id = target.previousElementSibling.previousElementSibling.value;
    let title = target.parentElement.nextElementSibling.innerText;
    setAlbum({title, id})
    document.querySelector('.cadastrarMusicaModel').classList.add('show')
    document.querySelector('.cadastrarMusicaModel').addEventListener('click', cliqueForaModal)
  }

  if(songs)
  return (
    <section className="listagem">
      <div className="container">
        <div className="adicionarAlbum">
          <Link to="/cadastrar/album">Adicionar Álbum</Link>
        </div>
        <div className="listaAlbuns">
          <ul>
            {songs.map(item => (
              <li key={item._id}>
                <div onClick={handleClick} className="imgAlbum">
                  <input type="hidden" value={item._id}/>
                  <img src={item.img} alt={item.title}/>
                  <div className="naoSelecionavel">
                    Adicionar Música
                  </div>
                </div>
                <h3><Link to={"/album/" + item._id}>{item.title}</Link></h3>
              </li>
            ))}
          </ul>
        </div>
        <div className="cadastrarMusicaModel">
          <div>
            <h2>Cadastre músicas em <span>{album.title}</span></h2>
            <form className="formMusic" onSubmit={handleSubmit}>
              <input type="hidden" id="id" value={album.id}/>
              <input type="text" placeholder="Nome da Música" value={form.title} autoComplete="off" id="title" onChange={handleChange} />
              <div className="formFile">
                <div>
                  <label htmlFor="song"><span>{audioState ? audioState : 'Música'}</span></label>
                  <input type="file" id="song" name="song" onChange={handleImg}/>
                </div>
              </div>
              {data ? <p className="messageSuccess">Cadastrardo com Sucesso</p> : ''}
              {erro ? <p className="messageError">{erro}</p> : ''}
              <button>{loading ? 'Carregando..' : 'Cadastrar'}</button>
            </form>
          </div>     
        </div>
      </div>
    </section>
  )
  else return null
}

export default ListaAlbum
