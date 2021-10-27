import React, { useState, useMemo, useEffect, useContext } from 'react';
import './newcity.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FaPlusCircle } from 'react-icons/fa';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import TagsInput from 'react-tagsinput';
import { FiUpload } from 'react-icons/fi';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom';

function NewCity() {

	const history = useHistory();
	const { id } = useParams();

	const [valueCountry, setValueCountry] = useState('');
	const options = useMemo(() => countryList().getData(), []);
	const { user } = useContext(AuthContext);
	const [isEdit, setIsEdit] = useState(false);

	const [name, setName] = useState();
	const [state, setState] = useState();
	const [country, setCountry] = useState();
	const [population, setPopulation] = useState();
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [description, setDescription] = useState();
	const [tags, setTags] = useState([]);
	const [imageCityUrl, setImageCityUrl] = useState();
	const [imageCity, setImageCity] = useState();
	const [imageCityName, setImageCityName] = useState();


	useEffect(() => {
		//console.log(localStorage.getItem('SistemaUser'))

		if (id) {
			setIsEdit(true);
			console.log(id)
			loadId()
		}
		//console.log(user.id)
	}, []);

	function handleSubmit(e) {
		e.preventDefault();

		if (name && valueCountry && population && latitude && longitude && imageCity) {
			if (isEdit) {
				handleUpdate()
			} else {
				handleAddCity()
			}

		} else {
			toast.error("Preencha todos os campos obrigatórios")
		}

	}
	async function loadId() {
		await api.get(`/city/${id}`,
			{
				headers: {
					'Authorization': `Bearer ${user.token}`,
					'Content-Type': 'application/json'
				}
			}).then((res) => {
				setName(res.data.name)
				setState(res.data.state)
				setValueCountry(res.data.valueCountry)
				setPopulation(res.data.population)
				setLatitude(res.data.latitude)
				setLongitude(res.data.longitude)
				setDescription(res.data.description)
				toast.success(res)
			}).catch((err) => {
				toast.error(err)
			})
	}

	async function uploadHandler (cityId)  {
		const formData = new FormData()
		formData.append(
		  'image',
		  imageCity,
		  imageCity.name
		)
		api.patch(`/city/${cityId}`, formData, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		}).then((res)=>{
			history.push('/')
		}).catch((err)=>{
			console.log(err)
		})
	  }


	async function handleAddCity() {
		await api.post(`/city`, {
			name: name,
			state: state,
			country: valueCountry.label,
			population: population,
			latitude: latitude,
			longitude: longitude,
			description: description,
			tourist_places: tags.toString(),
			author: user.id
		}, {
			headers: {
				'Authorization': `Bearer ${user.token}`,
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			toast.success('Cadastrado com sucesso')
			uploadHandler(res.data.id)

			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}
	async function handleUpdate() {
		await api.put(`/city/${id}`, {
			name: name,
			state: state,
			country: valueCountry.label,
			population: population,
			latitude: latitude,
			longitude: longitude,
			description: description,
			tourist_places: tags.toString(),
			author: user.id
		}, {
			headers: {
				'Authorization': `Bearer ${user.token}`,
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			toast.success('Editado com sucesso')
			uploadHandler(id);

			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}

	function handleFile(e) {
		setImageCityName(e.target.files[0].name)
		console.log(e.target.files[0]);
		if (e.target.files[0]) {
			const image = e.target.files[0];

			if (image.type === 'image/jpeg' || image.type === 'image/png') {
				setImageCity(image);
				setImageCityUrl(URL.createObjectURL(e.target.files[0]));
			} else {
				alert('Envie uma imagem do tipo PNG OU JPEG');
				setImageCity(null);
				return null;
			}
		}
	}

	const handleChange = tags => {
		setTags(tags);
	};

	const changeHandler = value => {
		setValueCountry(value);
	};


	return (
		<div >
			<Header />
			<div className="content">
				<Title name="Nova Cidade">
					<FaPlusCircle size={25} />
				</Title>
				<div className="container">
					<form className="form-profile" onSubmit={handleSubmit}>
						<label>Nome da cidade</label>
						<input
							type="text"
							value={name}
							onChange={event => setName(event.target.value)}
						/>
						<label>Estado</label>
						<input
							type="text"
							value={state}
							name="state"
							onChange={event => setState(event.target.value)}
						/>
						<label>País</label>
						<Select
							className="select"
							options={options}
							value={valueCountry}
							onChange={changeHandler}
						/>

						<label>População</label>
						<input
							type="number"
							value={population}
							name="population"
							onChange={event => setPopulation(event.target.value)}
						/>
						<label>Latitude</label>
						<input
							type="number"
							value={latitude}
							name="latitude"
							onChange={event => setLatitude(event.target.value)}
						/>
						<label>Longitude</label>
						<input
							type="number"
							value={longitude}
							name="longitude"
							onChange={event => setLongitude(event.target.value)}
						/>

						<label>Descrição da cidade</label>
						<span className="mini-texto">
							Fale um pouco sobre a cidade
						</span>
						<textarea
							type="text"
							placeholder="Opcional"
							value={description}
							name="description"
							onChange={event => setDescription(event.target.value)}
						>

						</textarea>
						<label style={{ marginTop: 15 }}>
							Pontos Turísticos - Adicione abaixo, os principais
							lugares da cidade
						</label>
						<TagsInput value={tags} onChange={handleChange} />

						<label style={{ marginTop: 15 }}>
							Adicione uma foto para representar a cidade - Opcional
						</label>

						<label
							className="foto-cidade
						"
						>
							<span>
								<FiUpload color="#4287f5" size={50} />
							</span>
							<input

								type="file"
								accept="image/*"
								onChange={handleFile}
							/>
							<span className="city-name">{imageCityName}</span>
							<br />

						</label>


						<button className="btn-save-city" type="submit">
							Salvar
						</button>

					</form>

				</div>
			</div>
		</div>
	);
}

export default NewCity;
