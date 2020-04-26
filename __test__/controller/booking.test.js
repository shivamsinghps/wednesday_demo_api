const request = require("supertest");
const app = require("../../app");

describe("POST /api/book", () => {
	test("Creating a booking", async () => {
		const response = await request(app)
			.post("/api/book/?maxDistance=10000000000")
			.send({
				userId: 6,
				initial_loc: [53.088415, 15.904740],
				final_loc: [53.088415, 16.004740],
				booking_amt: 123
			})
		expect(response.statusCode)
			.toBe(201);
		expect(response.body.message)
			.toBe('Booking created');
	});
});


describe("GET /api/bookings", () => {
	test("Retreving bookings of a user", async () => {
		let user = 5
		const response = await request(app)
			.get(`/api/bookings/?userId=${user}`);
		expect(response.statusCode)
			.toBe(200);
		expect(response.body.length)
			.toBe(3);
	});
});

describe("PATCH /api/booking_update", () => {
	test("Updating booking status", async () => {
		const response = await request(app)
			.patch("/api/booking_update")
			.send({
				userId: 5,
				status_up: "completed"
			})
		expect(response.statusCode)
			.toBe(200);
		expect(response.body.length)
			.toBe(1);
	});
});
