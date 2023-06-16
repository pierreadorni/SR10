// test/route.test.js file
//route.test.js file
const request = require("supertest");
const app = require("../app");
const sha256 = require("sha256");

describe("Test the root path", () => {
    test("GET /", (done) => {
        request(app)
            .get("/")
            .then((response) => {
                expect(response.statusCode).toBeLessThan(400);
                done();
            })
            .catch((error) => done(error));
    });
    test("POST /login", (done) => {
        request(app)
            .post("/login")
            .send({ email: "admin@example.com", password: "123456" })
            .then((response) => {
                expect(response.statusCode).toBeLessThan(400);
                expect(response.header.location).toBe("/");
                request(app).get("/")
                    .set('Cookie', response.header['set-cookie'])
                    .then((response) => {
                    expect(response.header.location).toBe("/admin/users");
                    done();
                });
            })
            .catch((error) => done(error));
    });
    test("POST /login with wrong password", (done) => {
        request(app)
            .post("/login")
            .send({ email: "admin@example.com", password: "cakeisalie" })
            .then((response) => {
                expect(response.statusCode).toBe(401);
                done();
            })
    });

    test("POST /login with wrong email", (done) => {
        request(app)
            .post("/login")
            .send({ email: "admin@example", password: "123456" })
            .then((response) => {
                expect(response.statusCode).toBe(401);
                done();
            })
    });

    test("POST /register", (done) => {
        const userData = {
            email: "test@example.com",
            password: ("123456"),
            lastname: "John",
            firstname: "Anon",
        };
        request(app)
    .post("/register")
    .send(userData)
    .then((response) => {
        expect(response.statusCode).toBeLessThan(400);
        done();
    })
    .catch((error) => done(error));
    });

    afterAll(() => {
        // Perform any necessary cleanup or closing operations here
        // For example, closing database connections or server instances

    });
});

