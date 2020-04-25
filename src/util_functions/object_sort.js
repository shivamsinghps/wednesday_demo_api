// sorts an objects array based on distance

module.exports = (x) => x.sort((a, b) => ((a.distance > b.distance) ? 1 : -1));
