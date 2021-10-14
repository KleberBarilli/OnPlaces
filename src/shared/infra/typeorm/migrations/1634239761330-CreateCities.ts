import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCities1634239761330 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'cities',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'description',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'state',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'country',
						type: 'varchar',
					},
					{
						name: 'population',
						type: 'int',
					},
					{
						name: 'latitude',
						type: 'int',
					},
					{
						name: 'longitude',
						type: 'int',
					},
					{
						name: 'image',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'created_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('cities');
	}
}
