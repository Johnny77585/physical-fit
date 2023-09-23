'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Lists', [{ // 一次新增三筆資料
      name: '胸部菜單',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '腿部菜單',
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '手部菜單',
      user_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lists', null, {})
  }
}
