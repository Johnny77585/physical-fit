'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const bodyparts = await queryInterface.sequelize.query(
      'SELECT id FROM Bodyparts;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert(
      'Exercises',
      [
        {
          name: '中胸繩索飛鳥夾胸',
          photo: "<iframe src='//gifs.com/embed/v-WLKW0J' frameborder='0' scrolling='no' width='640px' height='360px' style='-webkit-backface-visibility: hidden;-webkit-transform: scale(1);'></iframe>",
          bodypart_id: bodyparts[0].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '槓鈴臥推',
          photo: "<iframe src='//gifs.com/embed/g-3QrYxM' frameborder='0' scrolling='no' width='640px' height='360px' style='-webkit-backface-visibility: hidden;-webkit-transform: scale(1);' ></iframe>",
          bodypart_id: bodyparts[0].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '啞鈴上斜臥推',
          photo: "<iframe src='//gifs.com/embed/c-vlxmrX' frameborder='0' scrolling='no' width='640px' height='360px' style='-webkit-backface-visibility: hidden;-webkit-transform: scale(1);' ></iframe>",
          bodypart_id: bodyparts[0].id,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exercises', {})
  }
}
