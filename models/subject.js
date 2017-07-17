'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });

  Subject.associate = (models) => {
    Subject.hasOne(models.Teacher);
    Subject.belongsToMany(models.Students, {through: 'StudentSubject' });
  }

  return Subject;
};
