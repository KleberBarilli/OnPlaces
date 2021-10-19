import './dashboard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FaCity, FaPlus, FaSearch, FaEdit } from 'react-icons/fa'

function Dashboard() {
	const [cities, setCities] = useState([1]);

	return (
		<div>
			<Header />

			<div className="content">
				<Title name="Cidades">
					<FaCity size={25} />
				</Title>

				{cities.length === 0 ? (
					<div className="container dashboard">
					<span>Nenhuma cidade registrada...</span>
					<Link className="new" to="/new">
						<FaPlus size={25} color="#FFF"/>
						Nova cidade
					</Link>
				</div>
				): (
					<>
						<Link className="new" to="/newcity">
							<FaPlus size={25} color="#FFF"/>
						Nova cidade
					</Link>

					<table>
						<thead>
							<tr>
								<th scope="col">Cidade</th>
								<th scope="col">Estado</th>
								<th scope="col">País</th>
								<th scope="col">População</th>
								<th scope="col">Cadastrado em</th>
								<th scope="col">#</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td data-label="Cidade">Muliterno</td>
								<td data-label="Estado">RS</td>
								<td data-label="País">Brasil</td>
								<td data-label="População">1.897</td>
								<td data-label="Cadastrado">18/10/2021</td>
								<td data-label="#">
									<button className="action" style={{backgroundColor:'#3583f6'}}>
										<FaSearch color="FFF" size={17} />
									</button>
									<button className="action" style={{backgroundColor:'#f6a935'}}>
										<FaEdit color="FFF" size={17} />
									</button>
								</td>
							</tr>
						</tbody>
					</table>

					</>
				)}


			</div>
		</div>
	);
}

export default Dashboard;
