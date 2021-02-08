import React from 'react'
import './LoginForm.css'
import { GlobalContext} from '../GlobalContext'
import {Link} from 'react-router-dom'

const LoginForm = () => {
  const [form, setForm] = React.useState({email: '',password: ''})
  const {userLogin, loading} = React.useContext(GlobalContext);

  async function handleSubmit(event){
    event.preventDefault();
    userLogin(form.email, form.password);
  }

  function handleChange({target}){
    const {id, value} = target;
    setForm({...form, [id]: value})
  }

  return (
    <div className="login">
      <div>
        <form onSubmit={handleSubmit}>
          <legend>Entrar</legend>
          <div className="inputForm">
            <input type="email" autoComplete="off" placeholder="Email" id="email" onChange={handleChange}/>
            <input type="password" placeholder="Senha" id="password" onChange={handleChange}/>
          </div>
          <div className="esqueceuSenha">
            <p>Esqueceu sua senha?</p>
          </div>
          <button>{loading ? "Carregando.." : "Entrar"}</button>
          <p>Ainda não é cadastrado? <Link to="create">Cadastre-se</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
