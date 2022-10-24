<p align="center">
   Frontend Repo > https://github.com/KleberBarilli/OnPlacesWeb
</p>


## <p align="center">Paused⚠
	
## <p align="center">This sistem will integrate users with a map of all cities in the world, where you can contribute information about any city, adding descriptions, tourist places and images
	
	
![alt text](https://api-cities.s3.amazonaws.com/site/home.png)
Main Features of the app
   <li>Select City
       <ul>
           <li> Where you've lived</li>
		   <li> Where you've visited</li>
		   <li> Where you want a visit</li>
       </ul>
   </li>
   <li>Add City (contribute to filling in the city information)</li>
</ul>





### Useful Back-End Commands
<br>

Check the database settings in **ormconfig.js**, i recommend you use postgres with docker <img align="center" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg">
<img align="center" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original.svg">

```bash
docker run --name places_db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres

docker exec -it idcontainer bash
root@05b3a3471f6f:/# psql -U postgres
postgres-# CREATE DATABASE places_db;
```

## Run App
```bash
npm install
```

```bash
npm run typeorm migration:run
```

```bash
npm run dev
```

## Run Unit Tests
```bash
npm run test
```

## To run the front-end code
```bash
cd web/
yarn install or npm install
yarn start or npm start
```
<br>

🇧🇷Aprenda como configurar o eslint e o prettier em seus projetos nodejs: https://medium.com/@kleber.barilli73/como-instalar-e-configurar-o-eslint-e-o-prettier-c8f270416ffb
