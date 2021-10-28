const axios = require('axios').default

class SpecieService {
  getSpecieByURL (url) {
    return axios.get(url).then(({ data: specie }) => {
      return this.transformSpecie(specie)
    })
  }

  transformSpecie (specie) {
    return {
      name: specie.name,
      language: specie.language,
      average_height: specie.average_height
    }
  }
}

module.exports = SpecieService
