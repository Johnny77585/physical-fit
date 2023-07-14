const axios = require('axios')

async function getExercises (req, res) {
  try {
    const bearerToken = req.cookies.token
    const response = await axios.get('http://localhost:3000/api/exercises', {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    })
    const exercises = response.data
    res.render('exercises', { exercises })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to get exercises' })
  }
}

module.exports = { getExercises }
