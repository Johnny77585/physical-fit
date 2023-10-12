const { List, Date } = require('../../models')
const jwt = require('jsonwebtoken')

const listDateController = {
  getLists: async (req, res) => {
    const token = req.cookies.token
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.id
        List.findAll({
          where: { userId },
          include: [
            {
              model: Date,
              as: 'ListedDates'
            }
          ]
        })
          .then(lists => {
            res.json(lists)
          })
          .catch(error => {
            console.error(error)
            res.status(500).json({ message: 'Internal Server Error' })
          })
      } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
module.exports = listDateController
