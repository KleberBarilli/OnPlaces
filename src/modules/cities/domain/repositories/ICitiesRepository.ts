import { ICreateCity } from '../models/ICreateCity';
import { IPaginateCity } from '../models/IPaginateCity';
import { ICity } from '../models/ICity';

export interface ICitiesRepository {
	findAll(): Promise<ICity[]>;
	findAllPaginate(search: string, sortField: string): Promise<IPaginateCity>;
	findAllByUserId(id: string): Promise<IPaginateCity>;
	findById(id: string): Promise<ICity | undefined>;
	create(data: ICreateCity): Promise<ICity>;
	save(City: ICity): Promise<ICity>;
	remove(City: ICity): Promise<void>;
}
