/**
 * @param {string[]} idArray - Id array new id belongs to
 */
export function idIncrement(idArray) {
  let newId;
  const idArrayInt = idArray.map(id => Number.parseInt(id, 10));

  newId = String(idArrayInt[idArray.length - 1] + 1);
  if (!idArray.includes(newId)) {
    return newId.toString();
  }

  newId = String(Math.max(...idArrayInt) + 1);
  if (!idArray.includes(newId)) {
    return newId;
  }
}
