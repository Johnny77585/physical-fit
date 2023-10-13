'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Lists', [
      {
        name: '胸部菜單',
        user_id: 1,
        isCopied: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '腿部菜單',
        user_id: 1,
        isCopied: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '手部菜單',
        user_id: 3,
        isCopied: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])

    // 新增三筆isCopied: true
    await queryInterface.bulkInsert('Lists', [
      {
        name: '胸部菜單',
        user_id: 1,
        isCopied: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '腿部菜單',
        user_id: 1,
        isCopied: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '手部菜單',
        user_id: 3,
        isCopied: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lists', null, {})
  }
}
