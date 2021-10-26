import { useState, useEffect } from 'react';
import './cities.css';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FaCity, FaPlus, FaSearchPlus, FaEdit } from 'react-icons/fa';
import api from '../../services/api';
import { PageActions } from '../../components/Pageaction';

function Cities() {
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState();

	const [cities, setCities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [isEmpty, setIsEmpty] = useState(false);


	useEffect(() => {
		loadCities();
	}, [page]);

	async function loadCities() {
		await api
			.get(`/city?page=${page}`, {
				params: {
					per_page: 5,
				},
			})
			.then(res => {
				let a = Object.values(res.data.data);
				updateState(a);
			})
			.catch(err => {
				console.log(err);
				setLoadingMore(false);
			});
		setLoading(false);
	}

	function handlePage(action) {
		setPage(action === 'back' ? page - 1 : page + 1);
	}

	async function updateState(res) {
		const isDataEmpty = res.size === 0;

		if (!isDataEmpty) {
			let list = [];

			res.forEach(data => {
				list.push({
					id: data.id,
					name: data.name,
					state: data.state,
					country: data.country,
					population: data.population,
					created_at: data.created_at,
					updated_at: data.updated_at,
				});
			});

			setCities(cities => [...cities, ...list]);
		} else {
			setIsEmpty(true);
		}

		setLoadingMore(false);
	}

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
							<FaPlus size={25} color="#FFF" />
							Nova cidade
						</Link>
					</div>
				) : (
					<>
						<Link className="new" to="/newcity">
							<FaPlus size={25} color="#FFF" />
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
								{cities.map((item, index) => {
									return (
										<tr key={index}>
											<td data-label="Cidade">
												{item.name}
											</td>
											<td data-label="Estado">
												{item.state}
											</td>
											<td data-label="País">
												{item.country}
											</td>
											<td data-label="População">
												{item.population}
											</td>
											<td data-label="Cadastrado">
												{item.created_at}
											</td>
											<td data-label="#">
												<button
													className="action"
													style={{
														backgroundColor:
															'#3583f6',
													}}
												>
													<FaSearchPlus
														color="#000"
														size={17}
													/>
												</button>
												<Link
													to={`/newcity/${item.id}`}
													className="action"
													style={{
														backgroundColor:
															'#f7902f',
													}}
												>
													<FaEdit
														color="#000"
														size={17}
													/>
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<PageActions>
							<button
								type="button"
								onClick={() => handlePage('next')}
								style={{display:'flex', justifyContent:'center', alignItems:'center'}}
							>
								Mostrar mais
							</button>
						</PageActions>
					</>
				)}
			</div>
		</div>
	);
}

export default Cities;
