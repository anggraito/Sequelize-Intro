'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    TeachersId: DataTypes.INTEGER
  });

  Subject.associate = (models) => {
    Subject.hasOne(models.Teacher);
  }

  return Subject;
};
