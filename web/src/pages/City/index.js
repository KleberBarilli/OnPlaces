import React, { useState, useMemo, useEffect, useContext } from 'react';
import './city.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FaInfoCircle } from 'react-icons/fa';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import ReactCountryFlag from 'react-country-flag';
import lookup from 'country-code-lookup';

function City() {
	const { id } = useParams();
	const { user } = useContext(AuthContext);

	const [city, setCity] = useState([]);
	const [places, setPlaces] = useState('');
	const [touristPlaces, setTouristPlaces] = useState([]);
	const [countryCode, setCountryCode] = useState('');
	const [imageCity, setImageCity] = useState('');

	useEffect(() => {

		loadCity();
	}, [places]);

	async function loadCity() {
		await api
			.get(`city/${id}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json',
				},
			})
			.then(res => {
				setCity(res.data);
				setPlaces(res.data.tourist_places);
				setImageCity(res.data.image)
				handlePlaces();
			})
			.catch(err => {
				console.log(err);
			});
	}

	function handlePlaces() {
		let placesArray = places.split(',');
		setTouristPlaces(placesArray);

		try {
			setCountryCode(lookup.byCountry(`${city.country}`).iso2);
		} catch (err) {
			return;
		}
	}

	return (
		<div>
			<Header />
			<div className="content">
				<div></div>
				<Title name={`${city.name} - ${city.country}`}>
					<ReactCountryFlag
						className="emojiFlag"
						countryCode={countryCode}
						style={{
							fontSize: '2em',
							lineHeight: '2em',
						}}
						aria-label={city.country}
					/>
				</Title>
				<div className="container">
					<ul className="infos">
						<li>
							<FaInfoCircle />
							{city.state}
						</li>
						<li>
							<MdOutlinePeopleAlt />
							{city.population}
						</li>
						<li>
							<BsFillGeoAltFill />
							{city.latitude}
						</li>
						<li>
							<BsFillGeoAltFill />
							{city.longitude}
						</li>
					</ul>
					<img
						className="city-image"
						src={`${process.env.REACT_APP_S3_URL}${imageCity}`}
					></img>
				</div>

				<div className="description">
					{' '}
					{city.description}
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book. It has survived not only five centuries,
					but also the leap into electronic typesetting, remaining
					essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum
					passages, and more recently with desktop publishing software
					like Aldus PageMaker including versions of Lorem Ipsum.
				</div>

				<div className="places description">
					<h1>Confira alguns pontos turísticos</h1>
					{touristPlaces.map((item, index) => {
						return (
							<>
								<ul className="rounded-list" key={index}>
									<li><span className="a">{item}</span></li>


								</ul>
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default City;
