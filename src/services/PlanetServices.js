const axios = require('axios').default

class PlanetService {
  getPlanetByURL (url) {
    return axios.get(url).then(({ data }) => {
      return this.transformPlanet(data)
    })
  }

  transformPlanet (planet) {
    return {
      name: planet.name,
      terrain: planet.terrain,
      gravity: planet.gravity,
      diameter: planet.diameter,
      population: planet.population
    }
  }
}
module.exports = PlanetService
