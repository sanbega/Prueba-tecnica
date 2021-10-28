const axios = require('axios').default

class StarshipService {
  getStarshipByURL (url) {
    return axios.get(url).then(({ data }) => {
      return this.transformStarship(data)
    })
  }

  transformStarship (starship) {
    return {
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      passengers: starship.passengers
    }
  }
}

module.exports = StarshipService
