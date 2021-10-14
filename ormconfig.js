module.exports = {
	"type": "postgre",
	"host": "localhost",
	"port": 5432,
	"username": "postgre",
	"password": "docker",
	"database": "cities",
	"synchronize": true,
	"logging": false,
	"entities": ["./src/modules/**/typeorm/entities/*.ts"],
	"migrations": [
		"./src/shared/infra/typeorm/migrations/*.ts"
	],
	"cli": {
		"migrationsDir": "./src/shared/infra/typeorm/migrations"
	}
 }
