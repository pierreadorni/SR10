const DB = require("../database.js");
const user = require('../models/utilisateur.js');

describe("User Tests", () => {

    let createdUserId = null;

    afterAll((done) => {
        DB.end(err => {
            if (err) done(err)
            else done();
        });
    });

    test('create user', async () => {
        return user.create({
            typeUtilisateur: "candidat",
            email: "test-jest@mytest.com",
            nom: "Jest",
            prenom: "Test",
            mdpHash: "test",
            dateCreation: new Date(),
            statutCompte: "inactif",
        }).then((result) => {
            expect(result.affectedRows).toEqual(1)
            createdUserId = result.insertId;

        }).catch((err) => {
            // crash the test
            expect(err).toEqual("error");
        })
    });

    test("read user", async () => {
        return user.readfromMail("test-jest@mytest.com").then((user) => {
            expect(user.nom).toEqual("Jest")
        }).catch(err => {
            expect(err).toBeNull();
        })
    });

    test("update user last name", async () => {
        return user.update({nom: "Jest2"}, createdUserId).then((result) => {
            expect(result.affectedRows).toEqual(1)
        }).catch((err) => {
            // crash the test
            expect(err).toEqual("error");
        })
    })

    test("delete user", async () => {
        return user.remove(createdUserId).then((result) => {
            expect(result.affectedRows).toEqual(1)
        }).catch((err) => {
            // crash the test
            expect(err).toEqual("error");
        })
    })
})

