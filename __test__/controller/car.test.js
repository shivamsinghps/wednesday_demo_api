const request = require("supertest");
const app = require("../../app");

let token

beforeAll(async () => {
	let authresponse = await request(app)
		.post('/api/login')
		.send({
			email: process.env.SAMPLE_BOOK_EMAIL,
			password: process.env.SAMPLE_BOOK_PASS,
		})
	token = authresponse.body.token
})

afterAll(() => {
	token = {}
});


describe("GET /api/nearbycars", () => {
	test("Retreving available list of cars", async () => {
		const response = await request(app)
			.get("/api/nearbycars/?lng=53.088415&lat=15.904740&maxDistance=1000000")
			.set('Authorization', `Bearer ${token}`)
		expect(response.statusCode)
			.toBe(200);
		expect(response.body.length)
			.toBe(6);
	});
});
