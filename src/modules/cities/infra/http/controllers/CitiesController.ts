import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowCityService from '@modules/cities/services/ShowCityService';
import ListAllCitiesService from '@modules/cities/services/ListAllCitiesService';
import Createcitieservice from '@modules/cities/services/CreateCityService';
import Updatecitieservice from '@modules/cities/services/UpdateCityService';
import DeleteCityService from '@modules/cities/services/DeleteCityService';
import { classToClass } from 'class-transformer';
import ListUserCity from '@modules/cities/services/ListUserCity';

export default class CitiesController {
	public async index(req: Request, res: Response): Promise<Response> {
		let search = '';
		const sortField = String(req.query.sortField);

		if (req.query.search) {
			search = String(req.query.search);
		}

		const listCities = container.resolve(ListAllCitiesService);

		const cities = await listCities.execute(search, sortField);

		return res.json(classToClass(cities));
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const showCity = container.resolve(ShowCityService);

		const city = await showCity.execute({ id });

		return res.json(city);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const {
			name,
			state,
			country,
			population,
			latitude,
			longitude,
			image,
			description,
			tourist_places,
			author,
		} = req.body;

		const createCity = container.resolve(Createcitieservice);

		const city = await createCity.execute({
			name,
			state,
			country,
			population,
			latitude,
			longitude,
			image,
			description,
			tourist_places,
			author,
		});

		return res.json(city);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const {
			name,
			state,
			country,
			population,
			latitude,
			longitude,
			image,
			description,
			tourist_places,
			author,
		} = req.body;

		const { id } = req.params;

		const updateCity = container.resolve(Updatecitieservice);

		const city = await updateCity.execute({
			id,
			name,
			state,
			country,
			population,
			latitude,
			longitude,
			image,
			description,
			tourist_places,
			author,
		});

		return res.json(city);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deleteCity = container.resolve(DeleteCityService);

		await deleteCity.execute({ id });

		return res.json([]);
	}

	public async userIndex(req: Request, res: Response): Promise<Response> {
		const list = container.resolve(ListUserCity);
		const { id } = req.params;

		const cities = await list.execute(id);

		return res.json(cities);
	}
}
