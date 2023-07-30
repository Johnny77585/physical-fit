const axios = require('axios')

async function getBodyparts (req, res) {
  try {
    const bearerToken = req.cookies.token
    const response = await axios.get('http://localhost:3000/api/bodyparts', {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    })
    const bodyparts = response.data
    res.render('exercises', { bodyparts })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to get exercises' })
  }
}

module.exports = { getBodyparts }
