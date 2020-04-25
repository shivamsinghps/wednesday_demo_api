// Calculating the distance btw 2 points using the Haversine formula
module.exports = (start, end, decimals = 2) => {
  const earthRadius = 6371;
  let lat1 = parseFloat(start.latitude);
  let lat2 = parseFloat(end.latitude);
  const lon1 = parseFloat(start.longitude);
  const lon2 = parseFloat(end.longitude);

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  lat1 *= (Math.PI / 180);
  lat2 *= (Math.PI / 180);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2)
		* Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c;
  return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
