// This disables a issue in TypeScript 2.2+ that affects testing
// So this line is highly recommend to be added to all .spec.ts files
export = 0;

// Import our model file (This is what we are going to test)
import {TrackModel} from './track.model';

// We use Describe to describe what this test SET is going to be
// You can have multiple describes
describe('app/modules/shared/models/TrackModel', () => {

    // Define the trackModel variable
    let trackModel: TrackModel;

    // This runs before each "IT" function run, so we can
    // configure anything we need to for the actual test
    // There is an afterEach for running code after each test
    beforeEach( () => {
        trackModel = new TrackModel({id: 1,
            filepath: 'Somewhere',
            name: 'in Cyberspace',
            order: 10,
            volume: 5,
            mute: false,
            model: 'My Model'});
    });

    // Lets run the first test; make sure our model is allocated
    // the beforeEach ran before this test, meaning it is defined.
    // This is a good test to make sure everything is working
    it( "Model is defined", () => {
        expect(trackModel).toBeDefined();
    });

    // Make sure that the values we get OUT of the model actually
    // match what default values we put in to the model
    it ("Model to be configured correctly", () => {
        expect(trackModel.id).toBe(1);
        expect(trackModel.filepath).toBe('Somewhere' );
        expect(trackModel.name).toBe('in Cyberspace');
        expect(trackModel.order).toBe(10);
        expect(trackModel.model).toBe('My Model');
    });

    // Verify that the mute functionality actually works
    it ('Verify mute', () => {
        trackModel.mute = true;
        expect(trackModel.mute).toBe(true);
        expect(trackModel.volume).toBe(0);
        trackModel.mute = false;
        expect(trackModel.volume).toBe(5);
    });

    // Verify the volume functionality actually works
    it ('Verify Volume', () => {
        trackModel.mute = true;
        expect(trackModel.volume).toBe(0);
        trackModel.volume = 6;
        expect(trackModel.volume).toBe(6);
        expect(trackModel.mute).toBe(false);
    })

});