import React from 'react'
import './PlayerFooter.css'
import imgPrev from '../Assets/svg/Prev.svg'
import imgPlay from '../Assets/svg/Play.svg'
import imgNext from '../Assets/svg/Next.svg'
import imgPause from '../Assets/svg/Pause.svg'
import imgAleatorio from '../Assets/svg/ordenar.svg'
import imgordenado from '../Assets/svg/aleatorio.svg'
import imgLinear from '../Assets/svg/linear.svg'
import imgRepeticao from '../Assets/svg/repetição.svg'
import imgIconSound from '../Assets/svg/SoundIcon.svg'
import { GlobalContext} from './GlobalContext'

const PlayerFooter = () => {
  let {play, setPlay, login, song, indice, setIndice} = React.useContext(GlobalContext)
  const [input, setInput] = React.useState(0)
  const [inputSound, setInputSound] = React.useState(JSON.parse(window.localStorage.getItem('lastMusic')).sound === 0 ? 0 : JSON.parse(window.localStorage.getItem('lastMusic')).sound || 0.8) 
  const [aleatorio, setAleatorio] = React.useState(false)
  const [repeticao, setRepeticao] = React.useState(false)
  let audio = React.useRef()
  let [range,setRange] = React.useState();
  let lastMusic = JSON.parse(window.localStorage.getItem('lastMusic'));

  function playMusic(){
    if(audio.current !== undefined){
      if(!play){
        audio.current.play();
        audio.current.volume = inputSound;
        setPlay(true);
      }else{
        audio.current.pause();
        clearInterval(range);
        setPlay(false);
      }
    }
  }

  function changeRange({target}){
    if(play) audio.current.play();
    setInput(target.value)
    audio.current.currentTime = target.value;
  }

  function moveToNext({target}){
    if(aleatorio){
      let numberRandom = Math.round(Math.random() * (song.songs.length - 1));
      do{
        numberRandom = Math.round(Math.random() * (song.songs.length - 1))
      }while(numberRandom === indice)
      setIndice(numberRandom)
    }else{
      target.id === 'next' ? 
      setIndice(indice < song.songs.length - 1 ? indice + 1 : indice = 0) :
      setIndice(indice === 0 ? indice = song.songs.length - 1 : indice - 1)
    }
  }

  function moveRange(){
    let musica = audio.current;
    setRange(setInterval((event) => {
      setInput(Math.floor(musica.currentTime));
      musica.onended = function (){
        clearInterval(event)
        if(repeticao){
          musica.currentTime = 0;
          setInput(Math.floor(musica.currentTime));
          musica.play();
        }else{
          setIndice(indice < song.songs.length - 1 ? indice + 1 : indice = 0);
          musica.play();
        }
      }
    },1000))
  }

  function handleChangeSound({target}) {
    setInputSound(target.value)
    audio.current.volume = target.value;
    lastMusic.sound = +target.value;
    window.localStorage.setItem('lastMusic',JSON.stringify(lastMusic))
  }

  React.useEffect(() => {
    if(play) {
        audio.current.play()
        moveRange()
    }else{
      if(audio.current){
        audio.current.pause()
      }
    }
  },[play,indice,song])

  /*
  if(song[0].album === undefined) return null
  */

  if(!login) return null
  if(song.songs === undefined) return null
  if(song.songs) 
  return (
    <section className="playerFooter">
        <div className="playerFooter_left">
          <div>
            <img src={song.songs[indice].album.img} alt=""/>
          </div>
          <div>
            <h4>{song.songs[indice].title}</h4>
            <span>{song.songs[indice].author.name}</span>
          </div>
        </div>
        <audio ref={audio} className="audioSong" src={song.songs[indice].song}></audio>
        <div className="playerFooter_middle">
          <div>
            <img onClick={() => setAleatorio((d) => !d)} src={aleatorio ? imgAleatorio : imgordenado} className="ordem" alt=""/>
            <button className="buttonsPrevNext" onClick={moveToNext}><img id="prev" src={imgPrev} alt="Prev"/></button>

            <button className="buttonPlay" onClick={playMusic}>{play ? <img src={imgPause} alt="Pause"/> : <img src={imgPlay} alt="Play"/>}</button>

            <button className="buttonsPrevNext" onClick={moveToNext}><img id="next" src={imgNext} alt="Next"/></button>
            <img onClick={() => setRepeticao((d) => !d)} src={repeticao ? imgRepeticao : imgLinear} className="ordem" alt=""/>
          </div>
          <div>
            <input type="range" value={input} onChange={changeRange} min="0" max={audio.current && !!+audio.current.duration && typeof audio.current.duration !== 'boolean' ? audio.current.duration : '100'}/>
          </div>
        </div>
        <div className="controleSom">
          <div>
            <img src={imgIconSound} alt="Som"/>
            <input onChange={handleChangeSound} step="0.1" value={inputSound} type="range" defaultValue="0" min="0" max="1"/>
          </div>
        </div>
    </section>
  )
  else return null
}

export default PlayerFooter
