import { useState, useContext } from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUpload, FiUser } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';

function Profile() {
	const { user, signOut } = useContext(AuthContext);

	const [name, setName] = useState(user && user.name);
	const [email, setEmail] = useState(user && user.email);

	const [avatarUrl, setAvatarUrl]= useState(user && user.avatarUrl);


	return (
		<div>
			<Header />

			<div className="content">
				<Title name="Meu Perfil">
					<FiUser size={25} />
				</Title>

				<div className="container">
					<form className="form-profile">
						<label className="label-avatar
						">
							<span>
								<FiUpload color="#FFF" size={25} />
							</span>
							<input type="file" accept="image/*" />
							<br />
							{avatarUrl === null || undefined  ? <img src={avatar} width="250" alt="Foto de perfil"/> :
							<img src={avatarUrl} width="250" alt="Foto de perfil"/>}
						</label>

						<label>Nome</label>
						<input type="text" value={name} onChange={ (e) => setName(e.target.value) } />

						<label>Email</label>
						<input type="text" value={email} disabled="true" />

						<button type="submit">Salvar</button>
					</form>
				</div>
				<div className="container">
					<button className="logout-btn" onClick={ () => signOut()}>sair</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;
