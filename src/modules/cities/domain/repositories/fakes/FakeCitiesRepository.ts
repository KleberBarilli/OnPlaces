import { ICreateCity } from '@modules/cities/domain/models/ICreateCity';
import { ICitiesRepository } from '@modules/cities/domain/repositories/ICitiesRepository';
import { v4 as uuidv4 } from 'uuid';
import City from '@modules/cities/infra/typeorm/entities/City';
import { ICity } from '../../models/ICity';
import { IPaginateCity } from '../../models/IPaginateCity';

export default class FakeCitiesRepository implements ICitiesRepository {
	private cities: City[] = [];

	public async create({
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
	}: ICreateCity): Promise<City> {
		const city = new City();

		city.id = uuidv4();
		city.name = name;
		city.state = state;
		city.country = country;
		city.population = population;
		city.latitude = latitude;
		city.longitude = longitude;
		city.image = image;
		city.description = description;
		city.tourist_places = tourist_places;
		city.author = author;

		this.cities.push(city);

		return city;
	}

	public async save(city: City): Promise<City> {
		const findIndex = this.cities.findIndex(
			findCity => findCity.id === city.id,
		);

		this.cities[findIndex] = city;

		return city;
	}

	public async findByName(name: string): Promise<City[] | undefined> {
		const city = [];

		this.cities.forEach(element => {
			if (element.name === name) {
				city.push(element);
				this.cities.push(element);
			}
		});

		return this.cities;
	}

	public async findById(id: string): Promise<City | undefined> {
		const city = this.cities.find(city => city.id === id);
		return city;
	}

	public async findAll(): Promise<ICity[]> {
		return this.cities;
	}

	public async findAllByUserId(id: string): Promise<IPaginateCity> {
		const citiesPaginate = {
			from: 1,
			to: 1,
			per_page: 1,
			total: 1,
			current_page: 1,
			prev_page: null,
			next_page: null,
			data: this.cities,
		};
		const city = citiesPaginate.data.find(city => city.author === id);

		return city as any;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async remove(city: City): Promise<void> {}

	public async findAllPaginate(): Promise<IPaginateCity> {
		const citiesPaginate = {
			from: 1,
			to: 1,
			per_page: 1,
			total: 1,
			current_page: 1,
			prev_page: null,
			next_page: null,
			data: this.cities,
		};

		return citiesPaginate;
	}
}
