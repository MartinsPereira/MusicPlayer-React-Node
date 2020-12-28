import './Home.css'
import React from 'react'
import Song from './Song'
import api from '../Services/Api'
import { GlobalContext} from './GlobalContext'

function Home() {
  const [songs, setSongs] = React.useState();
  const {menu, setMenu} = React.useContext(GlobalContext);

  setMenu(false);

  React.useEffect(() => {
    async function searchAll(){
      const {data} =  await api.get('/procurar')
      console.log(data)
      setSongs(data)
    }
    searchAll();
  },[])

  if(songs)
  return (
    <div className="backHome">
      <Song data={songs} />
    </div>
  );
  else return null
}

export default Home;
