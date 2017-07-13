'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Students', [{
      first_name : 'Hadijah',
      last_name : 'Ulfa',
      email : 'hadilfa@murid.id',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      first_name : 'Syamma',
      last_name : 'Barajja',
      email : 'syamma.barajja@murid.id',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      first_name : 'Hilman',
      last_name : 'Maulana',
      email : 'hell_man@murid.id',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      first_name : 'Stevian',
      last_name : 'Anggara',
      email : 'stev@murid.id',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Students', null, {});
  }
};
