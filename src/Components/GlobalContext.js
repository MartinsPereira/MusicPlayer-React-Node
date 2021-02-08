import React from 'react'
import api from '../Services/Api'
import { useNavigate  } from 'react-router-dom'

export const GlobalContext = React.createContext();

export const GlobalStorage = ({children}) => {
  const [dataPlayList, setDataPlayList] = React.useState()
  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [play, setPlay] = React.useState(false)
  const [library, setLibrary] = React.useState()
  const [song, setSong] = React.useState({location: '', songs: []})
  let [indice, setIndice] = React.useState(0)
  const navigate = useNavigate();

  React.useEffect(() => {
    async function autoLogin(){
      const token = window.localStorage.getItem('token');
      if(token){
        try{
          setLoading(true)
          const response = await api.get('/users', {headers: {Authorization: 'Bearer ' + token,}});
          if(response.statusText !== "OK") throw new Error('Token Invalid')
          setUser(response.data[0])
          setLogin(true);
        }catch(erro){
          logout()
        }finally{
          setLoading(false)
        }
      }else{
        setLogin(false)
      }
    }
    autoLogin()
    let listMusic = JSON.parse(window.localStorage.getItem('lastMusic'))
    if(listMusic){
      setIndice(listMusic.indice)
      setSong({location: listMusic.location, songs: listMusic.songs});
    } 
    searchAllPlayList()
    searchLibrary()
  },[])
  
  const logout = React.useCallback(
    async function logout(){
      setUser(null);
      setLogin(false);
      setLoading(false)
      window.localStorage.removeItem('token');
      navigate('/login')
    },
    [navigate]
  );

  async function searchAllPlayList(){
    const response = await api.get('/list/playlist',{headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token'),}})
    setDataPlayList(response.data)
  }
  
  async function searchLibrary(){
    const response = await api.get('/procurar/library',{headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token'),}})
    setLibrary(response.data)
  }

  async function getUser(token){
    const response = await api.get('/users', {headers: {Authorization: 'Bearer ' + token, }});
    setUser(response.data[0]);
    setLogin(true);
  }

  async function userLogin(email, password){
    try{
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email)
      formData.append('password', password)
      const response = await api.post('/authenticate', formData);
      if(response.statusText !== "OK") throw new Error('Token Invalid')
      window.localStorage.setItem('token', response.data.token)
      await getUser(response.data.token);
      navigate('/')
    }catch(err){
      setLogin(false)
    }finally{
      setLoading(false)
    }
  }


  return <GlobalContext.Provider value={{dataPlayList,searchAllPlayList, user, userLogin,logout, login, loading, play, setPlay, song , setSong, indice,setIndice, searchLibrary, library}}>{children}</GlobalContext.Provider>
}