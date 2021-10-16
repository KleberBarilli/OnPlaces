import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signin.css';
import logo from '../../assets/logo2.png'

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(e){
		e.preventDefault();
		alert('clicou');
	}

	return (
	  <div className="container-center">
		<div className="login">
		<h3>City Travel App</h3>
			<div className="login-area">
				<img src={logo} alt="Logo" />
			</div>
			<form onSubmit={handleSubmit}>
				<h1>Entrar</h1>
				<input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) } />
				<input type="password" placeholder="*******" value={password} onChange={ (e) => setPassword(e.target.value) }/>
				<button type="submit">Acessar</button>
			</form>
			<Link to="/register">Criar uma Conta</Link>
		</div>
	  </div>
	);
  }

  export default SignIn;
