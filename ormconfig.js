module.exports = {
	"type": "postgres",
	"host": "localhost",
	"port": 5432,
	"username": "postgres",
	"password": "docker",
	"database": "cities_db",
	"synchronize": false,
	"migrationsRun": false,
	"logging": false,
	"entities": ["./src/modules/**/typeorm/entities/*.ts"],
	"migrations": [
		"./src/shared/infra/typeorm/migrations/*.ts"
	],
	"cli": {
		"migrationsDir": "./src/shared/infra/typeorm/migrations"
	}
 }
