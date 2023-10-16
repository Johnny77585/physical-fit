const { List, Date, ListDate } = require('../../models')
const jwt = require('jsonwebtoken')

const listDateController = {
  getListDate: (req, res) => {
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
  },
  postListDate: (req, res) => {
    const { date, listId } = req.body
    const token = req.cookies.token
    if (token) {
      try {
        // 創建新的日期紀錄
        Date.create({
          date
        })
          .then(newDate => {
            // 複製原本list，isCopied屬性為True
            List.findByPk(listId)
              .then(originalList => {
                const clonedList = originalList.toJSON()
                delete clonedList.id // 删除複製的列表的 ID
                clonedList.isCopied = true
                List.create(clonedList)
                  .then(newList => {
                    ListDate.create({
                      dateId: newDate.id, // 使用新日期的 ID
                      listId: newList.id // 使用新列表的 ID
                    })
                      .then(newListDate => {
                        res.json({ message: 'ListDate added successfully', listDate: newListDate, newList })
                      })
                      .catch(error => {
                        console.error(error)
                        res.status(500).json({ message: 'Internal Server Error' })
                      })
                  })
                  .catch(error => {
                    console.error(error)
                    res.status(500).json({ message: 'Internal Server Error' })
                  })
              })
              .catch(error => {
                console.error(error)
                res.status(500).json({ message: 'Internal Server Error' })
              })
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
