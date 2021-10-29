import * as React from 'react';
import { useState, useEffect } from 'react';
import MapGL, {
	Popup,
	NavigationControl,
	FullscreenControl,
	ScaleControl,
	GeolocateControl,
	FlyToInterpolator
} from 'react-map-gl';
import './map.css';
import { easeCubic } from 'd3-ease';




const TOKEN =
	'pk.eyJ1Ijoia2xlYmVyYmFyaWxsaSIsImEiOiJja3VxZ21jdHkyejl6MnhteDR3cG1mYjZrIn0.Z6c4fw4TNyZ8rpG4Z5wxsQ'; // Set your mapbox token here

const geolocateStyle = {
	top: 0,
	left: 0,
	padding: '10px',
};

const fullscreenControlStyle = {
	top: 36,
	left: 0,
	padding: '10px',
};

const navStyle = {
	top: 72,
	left: 0,
	padding: '10px',
};

const scaleControlStyle = {
	bottom: 36,
	left: 0,
	padding: '10px',
};

export default function CityMap(props) {
	const { city, width}  = props;

	const [viewport, setViewport] = useState({
		latitude: city.latitude,
		longitude: city.longitude,
		zoom: 10,
		bearing: 0,
		pitch: 0,
		width: width,
		height: 300,

	});

	const goToNYC = () => {
		setViewport({
		  ...viewport,
		  longitude: -74.1,
		  latitude: 40.7,
		  zoom: 14,
		  transitionDuration: 15000,
		  transitionInterpolator: new FlyToInterpolator(),
		  transitionEasing:easeCubic
		});
	  };
	//const [popupInfo, setPopupInfo] = useState(null);

	//const [cities, setCities] = useState([{name:"New York",population:"8,175,133",image:"http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",state:"New York",latitude:40.6643,longitude:-73.9385 }]);

	useEffect(() => {

	}, []);
	//mapStyle
	//mapbox://styles/mapbox/dark-v9
	//   mapbox://styles/mapbox/streets-v11
	//   mapbox://styles/mapbox/outdoors-v11
	//   mapbox://styles/mapbox/light-v10
	//   mapbox://styles/mapbox/dark-v10
	//   mapbox://styles/mapbox/satellite-v9
	//   mapbox://styles/mapbox/satellite-streets-v11
	//   mapbox://styles/mapbox/navigation-day-v1
	//   mapbox://styles/mapbox/navigation-night-v1

	return (
		<div>

	<MapGL
			className="city-map"
			{...viewport}
			mapStyle="mapbox://styles/mapbox/navigation-night-v1"
			onViewportChange={setViewport}
			mapboxApiAccessToken={TOKEN}
		>
			<GeolocateControl style={geolocateStyle} />
			<FullscreenControl style={fullscreenControlStyle} />
			<NavigationControl style={navStyle} />
			<ScaleControl style={scaleControlStyle} />
		</MapGL>

		</div>)

}
