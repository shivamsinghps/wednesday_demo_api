const request = require("supertest");
const app = require("../app");

describe("GET /api", () => {
	test("It responds with valid status", async () => {
		const response = await request(app)
			.get("/api");
		expect(response.statusCode)
			.toBe(200);
	});
});
