const request = require("supertest");
const app = require("../../app");




describe("GET /api/users", () => {
	test("Retreving the list of users", async () => {
		const response = await request(app)
			.get("/api/users");
		expect(response.statusCode)
			.toBe(200);
		expect(response.body.length)
			.toBe(13);
	});
});

describe("POST /api/signup", () => {
	test("Checking sign up with existing user", async () => {
		const response = await request(app)
			.post("/api/signup")
			.
		send({
			email: 'pneames1@merriam-webster.com',
			password: 'Rwehwl',
			user_name: 'Phineas Neames',
			contact_no: 1221809464,
		});
		expect(response.statusCode)
			.toBe(409);
		expect(response.body.message)
			.toBe('User Exists');
	});
});

describe("POST /api/signup", () => {
	test("Checking sign up with new user", async () => {
		const response = await request(app)
			.post("/api/signup")
			.
		send({
			email: 'bul2672x@googlr.com',
			password: 'bbul22x',
			user_name: 'Phineas Neames',
			contact_no: 9991809464,
		});
		expect(response.statusCode)
			.toBe(201);
		expect(response.body.message)
			.toBe('User created');
		// checking the user added to db
		const dbresponse = await request(app)
			.get("/api/users");
		expect(dbresponse.statusCode)
			.toBe(200);
		expect(dbresponse.body.length)
			.toBe(14);
	});
});


describe("POST /api/login", () => {
	test("Checking authentication with valid email and pass", async () => {
		const response = await request(app)
			.post("/api/login")
			.
		send({
			email: 'rcrimmins0@cnn.com',
			password: 'NpAwQjd0o',
		});
		expect(response.statusCode)
			.toBe(200);
		expect(response.body.message)
			.toBe('Auth successful');
	});
});


describe("POST /api/login", () => {
	test("Checking authentication with invalid email", async () => {
		const inv_response = await request(app)
			.post("/api/login")
			.
		send({
			email: 'rcrimmins0@cn.com',
			password: 'NpAwQjd0o',
		});
		expect(inv_response.statusCode)
			.toBe(401);
		expect(inv_response.body.message)
			.toBe('Check your Email');
	});
});


describe("POST /api/login", () => {
	test("Checking authentication with invalid password", async () => {
		const inv_pass_response = await request(app)
			.post("/api/login")
			.
		send({
			email: 'rcrimmins0@cnn.com',
			password: 'NpAwQjd0',
		});
		expect(inv_pass_response.statusCode)
			.toBe(401);
		expect(inv_pass_response.body.message)
			.toBe('Check password');
	});
});
