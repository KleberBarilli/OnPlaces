import User from '../../../../users/infra/typeorm/entities/User';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	JoinColumn,
	ManyToOne,
	Generated,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('cities')
export default class City {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	state: string;

	@Column()
	country: string;

	@Column()
	population: number;

	@Column({ precision: 10, scale: 8 })
	latitude: number;

	@Column({ precision: 11, scale: 8 })
	longitude: number;

	@Column()
	image: string;

	@Column()
	description: string;

	@Column()
	tourist_places: string;

	@Column()
	@Generated('uuid')
	author: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'author' })
	user: User;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Expose({ name: 'image_url' })
	getImageUrl(): string | null {
		if (!this.image) {
			return null;
		}
		//console.log(process.env.BASE_AVATAR_URL);

		return `${process.env.CITY_AVATAR_URL}/${this.image}`;
	}
}
