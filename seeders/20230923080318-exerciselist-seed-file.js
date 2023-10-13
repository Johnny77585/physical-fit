'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('exerciseLists', [
      {
        list_id: 1,
        exercise_id: 1,
        sets_details: JSON.stringify([
          { weight: 100, weight_unit: '公斤', repetitions: 10 },
          { weight: 120, weight_unit: '公斤', repetitions: 12 },
          { weight: 140, weight_unit: '公斤', repetitions: 12 }
        ]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        list_id: 1,
        exercise_id: 2,
        sets_details: JSON.stringify([
          { weight: 80, weight_unit: '磅', repetitions: 8 },
          { weight: 80, weight_unit: '公斤', repetitions: 12 }
        ]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        list_id: 3,
        exercise_id: 1,
        sets_details: JSON.stringify([
          { weight: 120, weight_unit: '公斤', repetitions: 12 },
          { weight: 80, weight_unit: '公斤', repetitions: 12 }
        ]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        list_id: 4,
        exercise_id: 1,
        sets_details: JSON.stringify([
          { weight: 100, weight_unit: '公斤', repetitions: 10 },
          { weight: 120, weight_unit: '公斤', repetitions: 12 },
          { weight: 140, weight_unit: '公斤', repetitions: 12 }
        ]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        list_id: 5,
        exercise_id: 2,
        sets_details: JSON.stringify([
          { weight: 80, weight_unit: '磅', repetitions: 8 },
          { weight: 80, weight_unit: '公斤', repetitions: 12 }
        ]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        list_id: 6,
        exercise_id: 1,
        sets_details: JSON.stringify([
          { weight: 120, weight_unit: '公斤', repetitions: 12 },
          { weight: 80, weight_unit: '公斤', repetitions: 12 }
        ]),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('exerciseLists', null, {})
  }
}
