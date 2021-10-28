const axios = require('axios').default

class PeopleService {
  constructor (planetService, specieService) {
    this.planetService = planetService
    this.specieService = specieService
  }

  getPeopleByURL (url) {
    return axios.get(url).then(async ({ data }) => {
      const planet = await this.planetService.getPlanetByURL(data.homeworld)
      const species = await Promise.all(
        data.species.map((specieURL) =>
          this.specieService.getSpecieByURL(specieURL)
        )
      )
      return this.transformPeople(data, species, planet)
    })
  }

  transformPeople (people, species, planet) {
    return {
      name: people.name,
      gender: people.gender,
      hair_color: people.hair_color,
      skin_color: people.skin_color,
      eye_color: people.eye_color,
      height: people.height,
      homeworld: planet.name,
      language: people.language,
      average_height: people.average_height,
      species
    }
  }
}

module.exports = PeopleService
