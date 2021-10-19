import { ICreateCity } from '../models/ICreateCity';
import { IPaginateCity } from '../models/IPaginateCity';
import { ICity } from '../models/ICity';

export interface ICitysRepository {
	findAll(): Promise<ICity[]>;
	findAll_User(id: string): Promise<ICity[]>;
	findAllPaginate(id: string): Promise<IPaginateCity>;
	findById(id: string): Promise<ICity | undefined>;
	create(data: ICreateCity): Promise<ICity>;
	save(City: ICity): Promise<ICity>;
	remove(City: ICity): Promise<void>;
}
