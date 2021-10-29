import * as React from 'react';
import {useState, useEffect} from 'react';
import MapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import { Link } from 'react-router-dom'
import { FaCity } from 'react-icons/fa';
import { GoDiffAdded } from 'react-icons/go';

import './dashboard.css'
import Pins from '../../components/City/Pins';
import CityInfo from '../../components/City/Info';
import Header from '../..//components/Header';
import Title from '../../components/Title';
import api from '../../services/api';


const TOKEN = 'pk.eyJ1Ijoia2xlYmVyYmFyaWxsaSIsImEiOiJja3VxZ21jdHkyejl6MnhteDR3cG1mYjZrIn0.Z6c4fw4TNyZ8rpG4Z5wxsQ'; // Set your mapbox token here

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px'
};

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default function Dashboard() {
	const [viewport, setViewport] = useState({
		latitude: 41.25,
		longitude: -95.93,
		zoom: 6,
		bearing: 0,
		pitch: 0,
		width: window.innerWidth,
		height:window.innerHeight
	  });
	  const [popupInfo, setPopupInfo] = useState(null);

	  const [cities, setCities] = useState([{name:"New York",population:"8,175,133",image:"http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",state:"New York",latitude:40.6643,longitude:-73.9385 }]);

	  useEffect(()=>{

		api.get(`http://localhost:3333/city/all`)
		.then((res)=>{
		  setCities(res.data)
		  console.log(res.data)
		})

	  }, [])
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
			<Header />

			<div className="content">
				<Title name="Map">
					<FaCity size={25} />
				</Title>
				<Link className="new" to="/newcity">

							Cadastrar nova cidade&nbsp;
							<GoDiffAdded size={25} color="#fff" />
						</Link>
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}
      >
        <Pins data={cities} onClick={setPopupInfo} />


        {popupInfo && (

          <Popup
			className="fuck"
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
			onClick={()=> window.open(`/city/${popupInfo.id}`) }
          >
            <CityInfo info={popupInfo} />
          </Popup>

        )}


        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>

   </div>
   </div>
  );
}


