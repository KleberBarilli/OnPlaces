import React, { useState, useMemo } from 'react';
import './newcity.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FaPlusCircle } from 'react-icons/fa';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import TagsInput from 'react-tagsinput'
import Wizard from '../../components/Wizard';
import { FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';

function NewCity() {
	const [value, setValue] = useState('');
	const options = useMemo(() => countryList().getData(), []);

	const [tags, setTags] = useState([]);
	const [imageCityUrl, setImageCityUrl]= useState();
	const [imageCity, setImageCity] = useState();

	function handleFile(e){
		console.log(e.target.files[0]);
		if(e.target.files[0]){
			const image = e.target.files[0];

			if(image.type === 'image/jpeg' || image.type === 'image/png'){
				setImageCity(image);
				setImageCityUrl(URL.createObjectURL(e.target.files[0]))
			}else {
				alert("Envie uma imagem do tipo PNG OU JPEG")
				setImageCity(null);
				return null;
			}
		}
	}

	const handleChange =(tags) => {
		setTags(tags)
	  }


	const changeHandler = value => {
		setValue(value);
	};



	const Page1 = () => (
		<div className="container">
			<form className="form-profile">
				<label>Nome da cidade</label>
				<input type="text" name="city" />
				<label>Estado</label>
				<input type="text" name="state" />
				<label>País</label>
				<Select
					className="select"
					options={options}
					value={value}
					onChange={changeHandler}
				/>
			</form>
		</div>
	);

	const Page2 = () => (
		<div className="container">
			<form className="form-profile">
				<label>População</label>
				<input type="number" name="population" />
				<label>Latitude</label>
				<input type="number" name="latitude" />
				<label>Longitude</label>
				<input type="number" name="longitude" />
			</form>
		</div>
	);
	const Page3 =()=> (

		<div className="container">

			<form className="form-profile">
				<label>Descrição da cidade</label>
				<span className="mini-texto">Fale um pouco sobre a cidade</span>
				<textarea
					rows="5"
					cols="60"
					placeholder="Fique a vontade para digitar sobre qualquer coisa legal"
					name="population"
				>
					{' '}
				</textarea>
				<label style={{marginTop:15}}>Pontos Turísticos - Adicione abaixo, os principais lugares da cidade</label>
				<TagsInput value={tags} onChange={handleChange} />

				<label style={{marginTop:15}}>Adicione uma foto para representar a cidade</label>

				<label className="foto-cidade
						">
							<span>
								<FiUpload color="red" size={75} />
							</span>
							<input type="file" accept="image/*" onChange={handleFile} />
							<br />
							{imageCityUrl === null || undefined  ? <img src={avatar} width="250" alt="Foto da cidade"/> :
							<img src={imageCityUrl} width="250" alt=""/>}
						</label>
						<button className="btn-save-city"  type="submit">Salvar</button>

			</form>
		</div>
	)
	return (
		<div>
			<Header />

			<div className="content">
				<Title name="Nova Cidade">
					<FaPlusCircle size={25} />
				</Title>

				<Wizard>
					<Page1 />
					<Page2 />
					<Page3 />
				</Wizard>
			</div>
		</div>
	);
}

export default NewCity;
