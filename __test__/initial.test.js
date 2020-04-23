const request = require("supertest");
const app = require("../app");


test("Handling Invalid routes", async () => {
	let get_response = await request(app)
		.get("/");
	expect(get_response.text)
		.toBe("Request Not Found");
	expect(get_response.statusCode)
		.toBe(404);
	let post_response = await request(app)
		.post("/");
	expect(post_response.text)
		.toBe("Request Not Found");
	expect(post_response.statusCode)
		.toBe(404);
});
