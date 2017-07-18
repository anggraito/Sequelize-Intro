module.exports = function score(value) {
  let enrol = [];
  value.forEach(  data_subjectstudent => {
  if (data_subjectstudent.Score > 85) {enrol.push('A');}
  if (data_subjectstudent.Score > 70 && data_subjectstudent.Score <= 85) {enrol.push('B');}
  if (data_subjectstudent.Score > 55 && data_subjectstudent.Score <= 70) {enrol.push('C');}
  if (data_subjectstudent.Score <= 55 && data_subjectstudent.Score > 0) {enrol.push('E');}
  if (data_subjectstudent.Score == null) {enrol.push('empty');}
  })
  return enrol;
}
