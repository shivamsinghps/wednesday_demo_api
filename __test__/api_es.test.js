const request = require("supertest");
const app = require("../app");

describe("GET /api", () => {
	test("It responds with invalid status", async () => {
		const response = await request(app)
			.get("/api");
		expect(response.statusCode)
			.toBe(404);
		expect(response.body.message)
			.toBe('Request Not Found');
	});
});
