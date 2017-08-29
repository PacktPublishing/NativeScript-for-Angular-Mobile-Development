// Import the reflect-metadata because angular needs it, even if we don't.
// We could import the entire angular library; but for unit-testing; smaller is better.
import 'reflect-metadata';

// Import our DatabaseService, we need something to test...  ;-)
import { DatabaseService } from "../modules/core/services/database.service";

// We do the exact same thing as we discussed earlier; we Describe what test group we are testing.
describe("database.service.test", function() {

    // So that we can easily change the Testing key in case we find out later in our app
    // we need "TestingKey" for some obscure reason.
    const TestingKey = "TestingKey";

    // As before, we define a "it" function to define a test group
    it("Test Database service class", function() {

        // We are just going to create the DatabaseService class here, no need for a beforeEach.
        const dbService = new DatabaseService();

        // Lets attempt to write some data.
        dbService.setItem(TestingKey, {key: "alpha", beta: "cygnus", delta: true});

        // Lets get that data back out...
        let valueOut = dbService.getItem(TestingKey);

        // Does it match?
        expect(valueOut).toBeDefined();
        expect(valueOut.key).toBe("alpha");
        expect(valueOut.beta).toBe("cygnus");
        expect(valueOut.delta).toBe(true);

        // Lets write some new data over the same key
        dbService.setItem(TestingKey, {key: "beta", beta: true});

        // Lets get the new data
        valueOut = dbService.getItem(TestingKey);

        // Does it match?
        expect(valueOut).toBeDefined();
        expect(valueOut.key).toBe("beta");
        expect(valueOut.beta).toBe(true);
        expect(Object.keys(valueOut).length).toBe(2);

        // Lets remove the key
        dbService.removeItem(TestingKey);

        // Lets make sure the key is gone
        valueOut = dbService.getItem(TestingKey);
        expect(valueOut).toBeFalsy();
    });
});