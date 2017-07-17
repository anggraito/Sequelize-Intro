module.exports = function score(value) {
  let letter = [];
  value.forEach(  data_subjectstudent => {
  if (data_subjectstudent.Score > 85) {letter.push('A');}
  if (data_subjectstudent.Score > 70 && data_subjectstudent.Score <= 85) {letter.push('B');}
  if (data_subjectstudent.Score > 55 && data_subjectstudent.Score <= 70) {letter.push('C');}
  if (data_subjectstudent.Score <= 55 && data_subjectstudent.Score > 0) {letter.push('E');}
  if (data_subjectstudent.Score == null) {letter.push('empty');}
  })
  return letter;
}
