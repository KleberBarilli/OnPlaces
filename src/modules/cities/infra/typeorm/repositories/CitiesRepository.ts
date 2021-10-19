import { getRepository, Repository, Like } from 'typeorm';
import { IPaginateCity } from '@modules/cities/domain/models/IPaginateCity';
import { ICitiesRepository } from '@modules/cities/domain/repositories/ICitiesRepository';
import { ICreateCity } from '@modules/cities/domain/models/ICreateCity';
import City from '../entities/City';

export default class CitiesRepository implements ICitiesRepository {
	private ormRepository: Repository<City>;

	constructor() {
		this.ormRepository = getRepository(City);
	}

	public async findById(id: string): Promise<City | undefined> {
		const city = this.ormRepository.findOne({
			where: {
				id,
			},
		});
		return city;
	}

	public async findAllPaginate(
		search: string,
		sortField: string,
	): Promise<IPaginateCity> {
		if (search) {
			return (await this.ormRepository
				.createQueryBuilder()
				.where([{ name: Like(`%${search}%`) }])
				.orderBy(`City.name`, 'ASC')
				.paginate()) as IPaginateCity;
		}

		return (await this.ormRepository
			.createQueryBuilder()
			.orderBy('City.name', 'ASC')
			.paginate()) as IPaginateCity;
	}

	public async findAll(): Promise<City[]> {
		const cities = await this.ormRepository.find({});

		return cities;
	}

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
		const city = this.ormRepository.create({
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

		await this.ormRepository.save(city);

		return city;
	}

	public async save(city: City): Promise<City> {
		await this.ormRepository.save(city);

		return city;
	}

	public async remove(city: City): Promise<void> {
		await this.ormRepository.remove(city);
	}

	public async findAllByUserId(id: string): Promise<IPaginateCity> {
		const city = await this.ormRepository
			.createQueryBuilder()
			.where({
				author: id,
			})
			.orderBy({
				name: 'DESC',
			})
			.paginate();

		return city as IPaginateCity;
	}
}
