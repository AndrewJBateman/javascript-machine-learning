const outputs = [];
const predictionPoint = 300;
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const [testSet, trainingSet] = splitDataSet(outputs, 10);

  for (let i=0; i < testSet.length; i++) {
    const bucket = knn(trainingSet, testSet[i][0]);
  }
}

function knn(data, point) {
  return _.chain(outputs)
    .map(row => [distance(row[0], point), row[3]])
    .sortBy(row => row[0])
    .slice(0, k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()
    .valueOf()
}

function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function splitDataSet(data, testCount) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}