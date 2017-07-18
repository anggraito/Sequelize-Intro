'use strict';
module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define('Students', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:
      { isEmail: {msg: "Must in email format"},
      isUnique: (value, next) => {
        Students.findAndCountAll({
          where: {
            email:value
          }
        })
        .then( email => {
          if (email.count > 0) return next('Email used');
          return next();
        })
        .catch(err => next(err));
      }}
    },
    jurusan: DataTypes.STRING});

  Students.associate = (models) => {
    Students.belongsToMany(models.Subject, {through: 'StudentSubject'});
  };
  return Students;
};
