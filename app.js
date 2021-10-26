const axios = require('axios').default
const express = require('express')
const app = express()

const baseURL = 'https://swapi.dev/api/'

app.get('/films', async function (req, res) {
  const { data } = await axios.get(baseURL + '/films')

  const films = await Promise.all(
    data.results.map(async (film) => {
      // Load characters
      const people = await Promise.all(
        film.people.map((peopleURL) =>
          axios.get(peopleURL).then(({ data }) => {
            return {
              name: data.name,
              gender: data.gender,
              hair_color: data.hair_color,
              skin_color: data.skin_color,
              eye_color: data.eye_color,
              height: data.height,
              homeworld: data.homeworld,
              name: data.name,
              language: data.language,
              average_height: data.average_height
            }
          })
        )
      )

      // Load the planets
      const planets = await Promise.all(
        film.planets.map((planetURL) =>
          axios.get(planetURL).then(({ data }) => {
            return {
              name: data.name,
              terrain: data.terrain,
              gravity: data.gravity,
              diameter: data.diameter,
              population: data.population
            }
          })
        )
      )

      // Load the starships
      const starships = await Promise.all(
        film.starships.map((startShipURL) =>
          axios.get(startShipURL).then(({ data }) => {
            return {
              name: data.name,
              model: data.model,
              manufacturer: data.manufacturer,
              passengers: data.passengers
            }
          })
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

  res.json({
    films
  })
})

app.get('/', function (req, res) {
  res.send('Welcome to the star wars API project')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
