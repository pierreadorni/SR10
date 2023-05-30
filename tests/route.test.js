// test/route.test.js file
//route.test.js file
const request = require("supertest");
const app = require("../app");


describe("Test the root path", () => {
    test("get /", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBeLessThan(400);
                done();
            });
    });
    test("login", done => {
        // follow redirects
        request(app)
            .post("/login",
                {email : "admin@example.com", password :"123456"}
                )
            .then(response => {
                console.log(response.statusCode);
                expect(response.statusCode).toBeLessThan(400);
                done();
            });
    });
    afterAll(() => {
        app.close();
    });
});
