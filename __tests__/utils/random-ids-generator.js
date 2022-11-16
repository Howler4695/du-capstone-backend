/**
 * @param {number} minIds - Lowest amount of Ids in query
 * @param {number} maxIds - Highest amount of Ids in query
 * @param {string[]} idArray - Queryable Ids
 */
const randomIdsGenerator = (minIds, maxIds, idArray) => {
  maxIds += 1;
  const randomQueryLength = Math.floor(
    Math.random() * (maxIds - minIds) + minIds
  );
  let queryIds = [];
  for (let i = 0; i < randomQueryLength; i++) {
    const idIndexToPush = Math.floor(Math.random() * idArray.length);
    queryIds.push(idArray[idIndexToPush]);
  }
  return queryIds;
};

export default randomIdsGenerator;
