const dist = require("../../src/util_functions/distance_cal");


test("It gives correct distance between two points having lat and long", async () => {
	const result = dist({
		latitude: 25.604945,
		longitude: 82.694487
	}, {
		latitude: 25.612918,
		longitude: 82.764954
	})
	expect(result)
		.toBeCloseTo(7.13, 1);
});
