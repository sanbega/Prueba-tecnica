const express = require('express')
const PeopleService = require('./src/services/PeopleServices')
const PlanetService = require('./src/services/PlanetServices')
const StarshipService = require('./src/services/StarshipsService')
const SpecieService = require('./src/services/SpecieService')
const FilmService = require('./src/services/FilmService')

const app = express()
const specieService = new SpecieService()
const planetService = new PlanetService()
const peopleService = new PeopleService(planetService, specieService) // instanciar un oobjeto
const starshipService = new StarshipService()
const filmService = new FilmService(
  planetService,
  peopleService,
  starshipService
)

app.get('/films', async function (req, res) {
  const films = await filmService.getAllFilms()

  res.json({
    films
  })
})

app.get('/', function (req, res) {
  res.send('Welcome to the star wars API project')
})

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
