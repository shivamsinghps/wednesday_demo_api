const request = require("supertest");
const app = require("../../app");

describe("Invaid Routes", () => {
	test("Handling Invalid routes", async () => {
		let get_response = await request(app)
			.get("/hytf");
		console.log(get_response.body.message);
		expect(get_response.body.message)
			.toBe("Request Not Found");
		expect(get_response.statusCode)
			.toBe(404);
		let post_response = await request(app)
			.post("/hytf");
		expect(post_response.body.message)
			.toBe("Request Not Found");
		expect(post_response.statusCode)
			.toBe(404);
	});
})
