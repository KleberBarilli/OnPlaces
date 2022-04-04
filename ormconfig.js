let ext = process.env.NODE_ENV === 'development' ? "ts" : "js";
let path = process.env.NODE_ENV === 'development' ? "src" : "dist";

module.exports = {
	"type": "postgres",
	"url":`${process.env.DATABASE_URL}`,
	"ssl": {rejectUnauthorized: false }, // desativar no local.
	"synchronize": false,
	"migrationsRun": false,
	"logging": false,
	"entities": [`./${path}/modules/**/typeorm/entities/*.${ext}`],
	"migrations": [
		`./${path}/shared/infra/typeorm/migrations/*.${ext}`
	],
	"cli": {
		"migrationsDir": "./src/shared/infra/typeorm/migrations"
	}
 }
