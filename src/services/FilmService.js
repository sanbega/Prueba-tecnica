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
        const peoplePromises = film.characters.map((peopleURL) =>
          this.peopleService.getPeopleByURL(peopleURL)
        )

        // Load the planets
        const planetsPromises = film.planets.map((planetURL) =>
          this.planetService.getPlanetByURL(planetURL)
        )

        // Load the starships
        const starshipsPromises = film.starships.map((startShipURL) =>
          this.starshipService.getStarshipByURL(startShipURL)
        )

        const response = await Promise.all([
          ...planetsPromises,
          ...starshipsPromises,
          ...peoplePromises
        ]) // destructur
        const planets = response.slice(0, planetsPromises.length)
        const starships = response.slice(
          planetsPromises.length,
          starshipsPromises.length + planetsPromises.length
        )
        const people = response.slice(
          starshipsPromises.length + planetsPromises.length,
          response.length
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
