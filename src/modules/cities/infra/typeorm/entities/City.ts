import User from '../../../../users/infra/typeorm/entities/User';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	JoinColumn,
	ManyToOne,
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

	@Column()
	latitude: number;

	@Column()
	longitude: number;

	@Column()
	image: string;

	@Column()
	description: string;

	@Column()
	tourist_places: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'author' })
	author: User;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Expose({ name: 'image_url' })
	getImageUrl(): string | null {
		if (!this.image) {
			return null;
		}

		return `${process.env.BASE_AVATAR_URL}/${this.image}`;
	}
}
