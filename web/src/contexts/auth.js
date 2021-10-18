import { useState, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

export const AuthContext = createContext({});


function AuthProvider({children}){
	const [user, setUser] = useState({});
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

	async function signIn(email, password){
        setLoadingAuth(true);


        if(email === '' || password === ''){
            setLoadingAuth(false);
            return;
        };

        await api.post('/sessions', {email: email, password: password})
        .then( (res) => {

            let data = {
                token: res.data.token,
                id: res.data.user.id,
                name: res.data.user.name,
                email: res.data.user.email,
                avatarUrl: res.data.user.avatar
            };

            setUser(data);
            storageUser(data);
			toast.success('Bem vindo de volta :)')
            setLoadingAuth(false);
        })
        .catch( (err) => {
            setLoadingAuth(false);
			toast.error('Ops, algo deu errado :(')
            console.log(err);
        })
    };

	async function signUp(name, email, password){

		await api.post('/users', {name:name, email:email, password:password},

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
				toast.success('Bem vindo a plataforma')
				setLoadingAuth(false);

			})
			.catch((err) => {
				console.log(err);
				toast.error('Ops, algo deu errado :(')
				setLoadingAuth(false);

			})
	}

	function storageUser(data){
		localStorage.setItem('SistemaUser', JSON.stringify(data))
	}

	function signOut(){
		localStorage.removeItem('SistemaUser');
        setUser(null);
	}


	return(
		<AuthContext.Provider value={{ signed:!!user, user, loading, signUp, signOut, signIn, loadingAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;
