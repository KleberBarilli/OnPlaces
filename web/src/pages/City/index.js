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
				setImageCity(res.data.image);
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
				<div className="flag-title">
					<Title
						name={`${city.name} ${city.state ? city.state : ''} - ${
							city.country
						}`}
					>
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
				</div>
				<div className="description">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</div>
				<div className="container">
					<img
						className="city-image"
						alt="img-city"
						src={`${process.env.REACT_APP_S3_URL}${imageCity}`}
					></img>
				</div>

				<div className="description"> {city.description}</div>
				{touristPlaces && (
					<div className="places description">
						<h1>Confira alguns pontos turísticos</h1>
						{touristPlaces.map((item, index) => {
							return (
								<>
									<ul className="rounded-list" key={index}>
										<li>
											<span className="a">{item}</span>
										</li>
									</ul>
								</>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default City;
