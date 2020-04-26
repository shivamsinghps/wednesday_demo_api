const request = require("supertest");
const app = require("../../app");

describe("GET /api/nearbycars", () => {
	test("Retreving available list of cars", async () => {
		const response = await request(app)
			.get("/api/nearbycars/?lng=53.088415&lat=15.904740&maxDistance=100000");
		expect(response.statusCode)
			.toBe(200);
		expect(response.body.length)
			.toBe(2);
	});
});

describe("GET /api/nearbycars", () => {
	test("Retreving available list of cars", async () => {
		const response = await request(app)
			.get("/api/nearbycars/?lng=53.088415&lat=15.904740&maxDistance=1000000");
		expect(response.statusCode)
			.toBe(200);
		expect(response.body.length)
			.toBe(6);
	});
});
