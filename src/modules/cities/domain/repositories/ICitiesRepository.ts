import { ICreateCity } from '../models/ICreateCity';
import { IPaginateCity } from '../models/IPaginateCity';
import { ICity } from '../models/ICity';

export interface ICitiesRepository {
	findAll(): Promise<ICity[]>;
	findAll_User_Cities(author_id: string): Promise<ICity[]>;
	findAllPaginate(): Promise<IPaginateCity>;
	findById(id: string): Promise<ICity | undefined>;
	create(data: ICreateCity): Promise<ICity>;
	save(City: ICity): Promise<ICity>;
	remove(City: ICity): Promise<void>;
}
