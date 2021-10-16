import { useState, useEffect, createContext } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});


function AuthProvider({children}){
	const [user, setUser] = useState(null);
	const [loadingAuth, setLoadingAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(()=>{

		function loadStorage(){
			const storageUser = localStorage.getItem('SistemaUser')

			if(storageUser){
				setUser(JSON.parse(storageUser));
				setLoading(false);
			}
			setLoading(false);
		}
		loadStorage();

	}, [])
	const config = {
		headers :{
		  "Content-Type": "application/json",
		 }
	  }

	async function signUp(name, email, password){
		alert(email, password)

		await api.post('/users', {name:name, email:email, password:password},
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
		)
			.then((res) => {
				console.log(res.data)

				let data = {
					id: res.data.id,
					name: res.data.name,
					email: res.data.email
				};
				setUser(data)
				storageUser(data);
				setLoadingAuth(false);
			})
			.catch((err) => {
				console.log(err);
				setLoadingAuth(false);
			})
	}

	function storageUser(data){
		localStorage.setItem('SistemaUser', JSON.stringify(data))
	}

	return(
		<AuthContext.Provider value={{ signed:!!user, user, loading, signUp }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;
