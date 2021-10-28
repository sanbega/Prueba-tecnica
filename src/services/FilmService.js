const axios = require('axios').default
const baseURL = 'https://swapi.dev/api/'

class FilmService {
  constructor (planetService, peopleService, starshipService) {
    this.planetService = planetService
    this.peopleService = peopleService
    this.starshipService = starshipService
  }

  async getAllFilms () {
    const { data } = await axios.get(baseURL + '/films')

    return Promise.all(
      data.results.map(async (film) => {
        // Load characters
        const people = await Promise.all(
          film.characters.map((peopleURL) =>
            this.peopleService.getPeopleByURL(peopleURL)
          )
        )
        // Load the planets
        const planets = await Promise.all(
          film.planets.map((planetURL) =>
            this.planetService.getPlanetByURL(planetURL)
          )
        )

        // Load the starships
        const starships = await Promise.all(
          film.starships.map((startShipURL) =>
            this.starshipService.getStarshipByURL(startShipURL)
          )
        )

        return {
          name: film.title,
          planets,
          people,
          starships
        }
      })
    )
  }
}

module.exports = FilmService
