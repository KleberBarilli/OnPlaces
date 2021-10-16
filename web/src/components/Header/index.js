import './header.css';
import { useContext } from 'react';
import { AuthContext}  from '../../contexts/auth';
import avatar from '../../assets/avatar.png';

import { Link } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { BiWorld } from 'react-icons/bi';


function Header() {

	const { user } = useContext(AuthContext);

  return(
	  <div className="sidebar">
		  <div>
		  	<img src={user.avatarUrl === undefined ? avatar : user.avatarUrl } alt="Foto avatar" />
		  </div>

		  <Link to="/dashboard">
		  	<BiWorld color="#FFF" size={24} />
		  		Cidades Visitadas
		  </Link>

		  <Link to="/dashboard">
		  	<FiSettings color="#FFF" size={24} />
		  		Configurações da Conta
		  </Link>


	  </div>

  )
}

export default Header;
