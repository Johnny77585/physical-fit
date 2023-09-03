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
          photo: 'static/image/cable-crossover.jpg',
          bodypart_id: bodyparts[0].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '槓鈴臥推',
          photo: 'static/image/bench-press.jpg',
          bodypart_id: bodyparts[0].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '啞鈴上斜臥推',
          photo: 'static/image/incline-bench-press.jpg',
          bodypart_id: bodyparts[0].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '滑輪下拉',
          photo: 'static/image/lat-pulldown.jpg',
          bodypart_id: bodyparts[1].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '坐姿划船',
          photo: 'static/image/seated-row.jpg',
          bodypart_id: bodyparts[1].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '站姿啞鈴肩推',
          photo: 'static/image/overhead-press.jpg',
          bodypart_id: bodyparts[2].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '槓鈴深蹲',
          photo: 'static/image/squat.jpg',
          bodypart_id: bodyparts[3].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '坐姿腿推',
          photo: 'static/image/seated-leg-press.jpg',
          bodypart_id: bodyparts[3].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '二頭彎舉',
          photo: 'static/image/bicep-curl.jpg',
          bodypart_id: bodyparts[4].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '繩索站姿三頭屈伸',
          photo: 'static/image/cable-triceps-extension.jpg',
          bodypart_id: bodyparts[4].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '平衡槓曲膝上舉',
          photo: 'static/image/knee-raise.jpg',
          bodypart_id: bodyparts[5].id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '跑步',
          photo: 'static/image/running.jpg',
          bodypart_id: bodyparts[6].id,
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
