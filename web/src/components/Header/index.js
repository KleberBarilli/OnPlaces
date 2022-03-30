import './header.css';
import { useContext, useEffect } from 'react';
import { AuthContext}  from '../../contexts/auth';
import avatar from '../../assets/avatar.png';

import { Link } from 'react-router-dom';
import { FiSettings, FiHome } from 'react-icons/fi';
import { FaCity } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { MdLogout, MdTravelExplore } from "react-icons/md";


function Header() {

	const { user, signOut } = useContext(AuthContext);




  return(
	  <div className="sidebar">
		  <div>
		  	<img src={user.avatarUrl === null || undefined ? avatar : `${process.env.REACT_APP_S3_URL}${user.avatarUrl}` } 
			  alt="Foto avatar" />
			  
		  </div>
		  <Link to="/dashboard">
		  	<FiHome color="#FFF" size={24} />
		  		Home
		  </Link>

		  <Link to="/cities">
		  	<BiWorld color="#FFF" size={24} />
		  		Todas as cidades
		  </Link>

		  <Link to="/newcity">
		  	<FaCity color="#FFF" size={24} />
		  		Cadastrar uma cidade
		  </Link>

		  <Link to="/mycities">
		  	<MdTravelExplore color="#FFF" size={24} />
		  		Cidades Visitadas
		  </Link>

		  <Link to="/profile">
		  	<FiSettings color="#FFF" size={24} />
		  		Configurações da Conta
		  </Link>


		  <Link onClick={signOut}>
		  	<MdLogout color="#FFF" size={24} />
		  		Logout
		  </Link>


	  </div>

  )
}

export default Header;
