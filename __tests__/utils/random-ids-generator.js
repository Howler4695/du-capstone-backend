/**
 * @param {number} minIds - Lowest amount of Ids in query
 * @param {number} maxIds - Highest amount of Ids in query
 * @param {string[]} idArray - Queryable Ids
 */
const randomIdsGenerator = (minIds, maxIds, idArray) => {
  maxIds += 1;
  const lowestId = Math.min.apply(Math, idArray);
  const highestId = Math.max.apply(Math, idArray);
  const randomQueryLength = Math.floor(
    Math.random() * (maxIds - minIds) + minIds
  );
  let queryIds = [];
  for (let i = 0; i < randomQueryLength; i++) {
    const idToPush = Math.floor(
      Math.random() * (highestId + 1 - lowestId) + lowestId
    ).toString();
    if (!idArray.includes(idToPush)) {
      i--;
      continue;
    }
    queryIds.push(idToPush);
  }
  return queryIds;
};

export default randomIdsGenerator;
